#!/bin/env python3
from dotenv import load_dotenv
import json
import os
import requests
import time
from pathlib import Path

# Load environment variables from .env.
load_dotenv()  

YEAR = str(os.getenv('AOC_YEAR'))
COMPETITION_FILE_PATH = os.getenv('COMPETITION_FILE')
SESSION_TOKEN = os.getenv('AOC_TOKEN')

OUTPUT_FILE_NAME = f"schoolScores{YEAR}.json"
OUTPUT_FILE_PATH = Path(os.path.dirname(os.path.dirname(__file__))) / 'generatedData' / OUTPUT_FILE_NAME
if (not OUTPUT_FILE_PATH.parent.is_dir()):
    os.mkdir(OUTPUT_FILE_PATH.parent)

def main():
    school_info = []
    
    competition_info = {}
    with open(COMPETITION_FILE, 'r') as cf:
        competition_info = json.load(cf)
        
    for school in competition_info["schools"]:
        lb_data = requests.get(
            f'https://adventofcode.com/{YEAR}/leaderboard/private/view/{school["leaderboard"]}.json',
            headers={
                'User-Agent': 'https://github.com/Minnesota-Computer-Club/MCC-Website-v2 by Minnesota Computer Club'
            },
            cookies={
                'session': SESSION_TOKEN
            }
        ).json()
        
        # Filter out members who have not earned any stars
        members = {k:m for k,m in lb_data["members"].items() if m["stars"] > 0}
        num_competitors = len(members)
        total_stars = sum(c["stars"] for c in members.values())        
        efficiency = total_stars/num_competitors
        
        school_info.append({k:school[k] for k in ["name", "city"]} | {
            "stars": total_stars,
            "participants": num_competitors,
            "efficiency": efficiency
        })
    
    dataToWrite = {
        "lastUpdatedAt": int(time.time()),
        "schools": school_info
    }
    
    with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(dataToWrite, f, indent=2)
    
    exit(0)

if __name__ == '__main__':
    main()
