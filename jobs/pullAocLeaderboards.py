from dotenv import load_dotenv
import json
import os
import requests
import time

# Load environment variables from .env.
load_dotenv()  

YEAR = str(os.getenv('AOC_YEAR'))

LEADERBOARDS = os.getenv('AOC_LEADERBOARDS')
LEADERBOARDS = LEADERBOARDS.split(',')

SESSION_TOKEN = os.getenv('AOC_TOKEN')

OUTPUT_FILE_NAME = 'generatedAocLeaderboard' + YEAR + 'Unfiltered.json'
OUTPUT_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'generatedData', OUTPUT_FILE_NAME))

def main():
  dataToWrite = {}

  # Pull down AoC data via AoC API for each of our private leaderboards
  for leaderboard in LEADERBOARDS:
    response = requests.get(
      f'https://adventofcode.com/{YEAR}/leaderboard/private/view/{leaderboard}.json',
      headers={
        'User-Agent': 'https://github.com/Minnesota-Computer-Club/MCC-Website-v2 by Minnesota Computer Club'
      },
      cookies={
        'session': SESSION_TOKEN
      }
    )

    if (response.status_code != 200):
      exit(1)

    dataToWrite["members"] = dataToWrite["members"] | response.json()['members'] if ('members' in dataToWrite) else response.json()['members'] 

  dataToWrite['lastUpdatedAt'] = int(time.time())

  # Generate the custom MCC `avg_rank` field
  member_ids = list(dataToWrite["members"].keys())
  def completion_time(id, day, part):
    return dataToWrite["members"][id]['completion_day_level'][day][part]['get_star_ts']

  part_ranks = {}
  for day in map(str, range(1, 25+1)):
    for part in ['1', '2']:
      partid = f"day{day}p{part}"
      part_ranks[partid] = [
        id for id in member_ids if day in dataToWrite["members"][id]['completion_day_level'] and part in dataToWrite["members"][id]['completion_day_level'][day]
      ]
      part_ranks[partid].sort(key=lambda id: completion_time(id, day, part))

    ranks = {id: [l.index(id)+1 for l in part_ranks.values() if id in l] for id in member_ids}
    avg_ranks = {id: sum(rankvals)/len(rankvals) if len(rankvals) != 0 else 0 for id, rankvals in ranks.items()}

  # Write the `avg_rank` field to each AoC user
  for id in avg_ranks:
    dataToWrite["members"][id]['avg_rank'] = avg_ranks[id]

  # Write the entire AoC data structure to the output file
  with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as f:
    json.dump(dataToWrite, f, indent=2)

  exit(0)

if __name__ == '__main__':
  main()
