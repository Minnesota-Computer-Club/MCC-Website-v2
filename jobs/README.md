# Jobs
This directory stores various shell and Python scripts that the website needs to have up-to-date data via a cron job or is used manually to manually review and clean data.

## pullAocLeaderboards.py
**Used Via**: Cron Job (Every 15 Minutes `*/15 * * * *`)

**Required Python3 Libraries**: `pip3 install python-dotenv`

**Required Env. Vars within `.env`**: 
- `AOC_YEAR`
- `AOC_LEADERBOARDS`

This is a Python script that will be used to query all of the private MCC AoC leaderboards to grab the latest scoring data. This script outputs a JSON file at `../generatedData/generatedAocLeaderboard<year>.json`.

## pullGoogleFormSubmissions.py
**Used Via**: Cron Job (Every 15 Minutes `*/15 * * * *`)

**Required Python3 Libraries**: `pip3 install google-auth-oauthlib google-api-python-client python-dotenv`

**Required Env. Vars within `.env`**: 
- `AOC_YEAR`
- `PATH_TO_GOOGLE_TOKEN`

This is a Python script that will be used to query all of the entires in the Google Form storing our registered competitors. This script outputs a JSON file at `../generatedData/generatedGoogleFormSubmissions<year>.json`.

**Note**: For this script to function correctly, it needs the Google Service Account Token `JSON` file added to the correct *private* directory.