# Jobs
This directory stores various scripts that the website needs to have up-to-date data via a cron job or is used manually to manually review and clean data.

## generateFrozenLeaderboard<YEAR>.js
**Used Via**: Manually

**Required node.js Libraries**: `fs dotenv`

**Required Env. Vars within `.env`**: 
- `AOC_YEAR`

This is a node.js script that will read both `../generatedData/generatedAocLeaderboard<year>.json` and `../generatedData/generatedGoogleFormSubmissions<year>.json` to generate `../generatedData/frozenLeaderboard<year>.json` file. 

During execution of the script, it will print out any AoC stars that were earned by competitors AFTER our competition ended and it will print out the names of anyone who submitted the registration Google Form AFTER the competition ended. This information then needs to be used to manually remove those stars and/or registrants from the `../generatedData/frozenLeaderboard<year>.json` file.

Once these changes have been made, the `../generatedData/frozenLeaderboard<year>.json` file needs to be placed into the `generatedData/` directory on the server via `scp`. Once this file is present, the leaderboard will be "frozen" with the next API call that will occur in the next 15 minutes.

## pullAocLeaderboards<year>.py
**Used Via**: Cron Job (Every 15 Minutes `*/15 * * * *`)

**Required Python3 Libraries**: `pip3 install python-dotenv`
**Required Command Line Tools**: `apt-get install jq`

**Required Env. Vars within `.env`**: 
- `AOC_YEAR`
- `AOC_LEADERBOARDS`

This is a Python script that will be used to query all of the private MCC AoC leaderboards to grab the latest scoring data across ALL of the private leaderboards. This script outputs a JSON file at `../generatedData/generatedAocLeaderboard<year>Unfiltered.json`.

## pullGoogleFormSubmissions<year>.py
**Used Via**: Cron Job (Every 15 Minutes `*/15 * * * *`)

**Required Python3 Libraries**: `pip3 install google-auth-oauthlib google-api-python-client python-dotenv`

**Required Env. Vars within `.env`**: 
- `AOC_YEAR`
- `PATH_TO_GOOGLE_TOKEN`

This is a Python script that will be used to query all of the entires in the Google Form storing our registered competitors. This script outputs a JSON file at `../generatedData/generatedGoogleFormSubmissions<year>.json`.

**Note**: For this script to function correctly, it needs the Google Service Account Token `JSON` file added to the correct *private* directory.

## Helpful Commands
- `crontab -e`
