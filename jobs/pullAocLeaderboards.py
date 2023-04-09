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

PARSED_LEADERBOARDS = []

for leaderboard in LEADERBOARDS:
  data = leaderboard.split('|')
  PARSED_LEADERBOARDS.append(
    {
      'LEADERBOARD-ID': data[0].strip(),
      'SESSION-TOKEN': data[1].strip()
    }
  )

OUTPUT_FILE_NAME = 'generatedAocLeaderboard' + YEAR + '.json'
OUTPUT_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'generatedData', OUTPUT_FILE_NAME))

def main():
  dataToWrite = {}

  for leaderboard in PARSED_LEADERBOARDS:
    id = str(leaderboard['LEADERBOARD-ID'])

    response = requests.get(
      f'https://adventofcode.com/{YEAR}/leaderboard/private/view/{id}.json',
      headers={
        'User-Agent': 'https://github.com/Minnesota-Computer-Club/MCC-Website-v2 by Minnesota Computer Club'
      },
      cookies={
        'session': leaderboard['SESSION-TOKEN']
      }
    )

    if (response.status_code != 200):
      exit(1)

    dataToWrite["members"] = dataToWrite["members"] | response.json()['members'] if ('members' in dataToWrite) else response.json()['members'] 

  dataToWrite['lastUpdatedAt'] = int(time.time())

  with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as f:
    json.dump(dataToWrite, f, indent=2)

  exit(0)

if __name__ == '__main__':
  main()
