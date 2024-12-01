// Import required packages.
const fs = require('fs');
require('dotenv').config();

let leaderboardData = fs.readFileSync(`../generatedData/generatedAocLeaderboard${String(process.env.AOC_YEAR)}.json`, { encoding: 'utf-8' });
let formData = fs.readFileSync(`../generatedData/generatedGoogleFormSubmissions${String(process.env.AOC_YEAR)}.json`, { encoding: 'utf-8' });

leaderboardData = JSON.parse(leaderboardData);
formData = JSON.parse(formData);

let mergedData = {
  "props": {
    "AOC": {
      "members": {
        ...leaderboardData['members']
      }
    },
    "form": {
      "competitors": {
        ...formData['competitors']
      }
    }
  }
};

console.log("====BEGIN REVIEWING AOC STARS====");

// Iterate through each user in the private AOC leaderboard.
for (contestant of Object.keys(mergedData['props']['AOC']['members'])) {
  // Iterate through each contestant's completed stars and ensure that they were earned AFTER Sunday, January 1, 2024 12:00:01 AM GMT-06:00.
  for (day of Object.keys(mergedData['props']['AOC']['members'][contestant]['completion_day_level'])) {
    // Iterate through each completed star for each day that contestant completed.
    for (star of Object.keys(mergedData['props']['AOC']['members'][contestant]['completion_day_level'][day])) {
      // If the user completed a star, check that it was completed before the deadline of our WCC competition.
      // If the star was completed after, print the contestant's name, AOC Puzzle Number, star from that day, and the timestamp the star was completed.
      if (mergedData['props']['AOC']['members'][contestant]['completion_day_level'][day][star]['get_star_ts'] > 1704088801) {
        console.log("[AoC Id]:", mergedData['props']['AOC']['members'][contestant]['id'], "[AoC Name]:", mergedData['props']['AOC']['members'][contestant]['name'], "[Puzzle #]:", day, "[Star #]:", star, "[Unix Timestamp]:", mergedData['members'][contestant]['completion_day_level'][day][star]['get_star_ts']);
      }
    }
  }
}

console.log("====FINISHED REVIEWING AOC STARS====");

console.log();

console.log("====BEGIN REVIEWING REGISTRATIONS====");

// Iterate through each registrant that filled out the Google Form.
for (registrant of Object.keys(mergedData['props']['form']['competitors'])) {

  // Grab the submission date for the registrant's form.
  let submissionDate = Date.parse(mergedData['props']['form']['competitors'][registrant]['Timestamp']);

  // If the submission date is past our deadline, then we need to print out the name and time so we can manually clean up the data.
  if (submissionDate / 1000 > 1704088801) {
    console.log("[Registrant Name]:", mergedData['props']['form']['competitors'][registrant]["Your First and Last Name"], "[Form Submission Date/Time]:", new Date(submissionDate).toLocaleString());
  }
}

console.log("====FINISHED REVIEWING REGISTRATIONS====");

// Write the merged data out to a frozen leaderboard file.
fs.writeFile(`../generatedData/frozenLeaderboard${String(process.env.AOC_YEAR)}.json`, JSON.stringify(mergedData), function(error) {
    if (error) {
      console.log('Error Writing File', error);
    }
  }
);