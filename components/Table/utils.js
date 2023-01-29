// Import required dependencies.
import moment from 'moment-timezone';

// A helper function to determine if a competitor from our AOC leaderboard(s) is valid.
export function isUserValid(form, aocUser) {
  // Attempt to grab the form submission to link the AOC account to the form submission.
  const formUser = form[aocUser.name];

  // If we can't find a form submission for the specified AOC username, the user is not valid.
  if (!formUser) {
    return false;
  }

  // As long as we can find a form submission for the user, they are valid in all other scenarios.
  return true;
}

// A helper method to get the date of the start time at which each AOC puzzle is released.
// Should be used in conjunction with the countdown component.
export function getPuzzleDate() {
  const date =
    moment()
      .tz('America/New_York') // Convert today (local time) to EST.
      .startOf('day') // Go to 12:00 AM EST for the CURRENT day.
      .add(1, 'day') // Go to 12:00 AM EST for the NEXT day.
      .add(1, 'second') // Add 1 second because AOC puzzles unlock at 12:01 AM EST.
      .toDate(); // Convert this back to a date.
  return date;
}

// The maximum number of stars that are attainable in an AOC competition. (25 Challenges * 2 Stars Per Challenge).
export const MAX_STARS = 50;