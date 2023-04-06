// Import required dependencies.
import axios from "axios";
import { fromUnixTime } from 'date-fns';
// import { readFile } from 'fs/promises';
import Head from 'next/head';
import Link from "next/link";
import * as React from 'react';
import * as fs from 'fs';
import { createColumnHelper } from '@tanstack/react-table';

import Countdown from "/components/Countdown";
import ErrorBar from "/components/ErrorBar";
import Table from '/components/Table';
import { customFilterComponent, customFilterFunction } from "/components/Table/Filters";
import { getPuzzleDate, isUserValid, MAX_STARS } from "/components/Table/utils";
import PageTitle from "/components/PageTitle";
import { starIcon } from "/components/utils";
import Badge from "/components/Badge";
import ExpandingPanel from "/components/ExpandingPanel";
import LoadingWheel from "/components/LoadingWheel";

// Used for column definitions for each table.
const columnHelper = createColumnHelper();

export default function WCCLeaderboard(props) {
  // Will store the array of rows that need to be displayed in each table.
  const [schoolCompetitionData, setSchoolCompetitionData] = React.useState([]);
  const [teamCompetitionData, setTeamCompetitionData] = React.useState([]);
  const [individualCompetitionData, setIndividualCompetitionData] = React.useState([]);

  // Will store the AoC usernames that don't have a form submission.
  const [competitorsMissingFormSubmission, setCompetitorsMissingFormSubmission] = React.useState(new Set());

  // Will store various statistics that we want to display.
  const [statisticTotalCompetitors, setStatisticTotalCompetitors] = React.useState(0);
  const [statisticTotalStars, setStatisticTotalStars] = React.useState(0);
  const [statisticAverageStars, setStatisticAverageStars] = React.useState(0);

  // Will store whether data is being loaded in and massaged.
  // This controls if the spinning loading wheel is displayed or not.
  const [isLoading, setIsLoading] = React.useState(true);

  // The column definitions for the school leaderboard table.
  const schoolCompetitionColumns = [
    columnHelper.accessor('school', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('stars', {
      cell: info => `${`${starIcon} ${info.getValue()}`}`,
    }),
    columnHelper.accessor('participants', {
      cell: info => Math.floor(Number(info.getValue() || 0)),
      header: "Total Participants"
    }),
    columnHelper.accessor('efficiency', {
      cell: info => Number(info.getValue() || 0).toFixed(2),
      header: "Efficiency"
    }),
  ];

  // The column definitions for the team leaderboard table.
  const teamCompetitorColumns = [
    columnHelper.accessor('team', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('percentageOfStarsEarned', {
      cell: info => `${`${info.getValue()}%`}`,
      header: '% of Stars Earned'
    }),
    columnHelper.accessor('stars', {
      cell: info => `${`${starIcon} ${info.getValue()}`}`,
      header: 'Total Star Count'
    }),
    columnHelper.accessor('teamMembers', {
      cell: info => {
        return (
          <div>
            {info.getValue().map((member, indx) => { return <p key={indx}>{member}</p> })}
          </div>
        );
      },
      header: 'Team',
      enableColumnFilter: false,
      enableSorting: false,
    }),
    columnHelper.accessor('last_star_ts', {
      cell: info => {
        if (info.getValue() > 0) {
          return (new Date(info.getValue() * 1000)).toISOString();
        } else {
          return "";
        }
      },
      header: 'Last Star',
      footer: info => info.column.id,
      enableColumnFilter: false,
    }),
  ];

  // The column definitions for the individual leaderboard table.
  const individualCompetitorColumns = [
    columnHelper.accessor('name', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('stars', {
      cell: info => `${`${starIcon} ${info.getValue()}`}`,
    }),
    columnHelper.accessor('school', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('last_star_ts', {
      cell: info => {
        if (info.getValue() > 0) {
          return (new Date(info.getValue() * 1000)).toISOString();
        } else {
          return "";
        }
      },
      header: 'Last Star',
      footer: info => info.column.id,
      enableColumnFilter: false,
    }),
  ];

  // Create school data from underlying AOC and form data.
  // This is where we will do ALL of our data massaging.
  // Data is passed into the page as props, and we can do our manipulations and then set data into their appropriate React state variables.
  React.useEffect(() => {
    // The page sets isLoading to true by default. We have to set it to false once we are done with our data manipulations.
    if (isLoading) {
      // Grab all Advent of Code users returned from the AOC Leaderboards.
      const aocUsers = Object.values(props.AOC);

      // Create object that will have a key for every unique school found in our form submissions.
      // schoolName: { ... }
      const schools = {};

      // Create object that will have a key for every unique team found in our form submissions.
      // teamName : [ { teamMember1 }, {teamMember2}, {teamMember3} ]
      const teams = {};

      // Create an array that will store an object for every unique individual found in our form submissions.
      const individualCompetitors = [];

      // Variables that will be used to track certain statistics.
      let totalNumberOfCompetitors = 0;
      let totalNumberOfStarsCompleted = 0;

      // Examine every Advent of Code user from our leaderboards.
      for (const aocUser of aocUsers) {

        // Ensure that we can find a form submission for this Advent of Code competitor.
        if (!isUserValid(props.form, aocUser)) {
          competitorsMissingFormSubmission.add(aocUser.name);
          continue;
        }

        // Grab the form submission for this Advent of Code competitor.
        const formDataForAocUser = props.form[aocUser.name];

        // Deconstruct applicable information from the user's form submission.
        const {
          ['What is your first and last name?']: name,
          ['Which school do you attend?']: school,
          ['Are you participating as part of a team or as an individual?']: team,
          ['What is your team name? (Make sure all your team members use the same team name!)']: teamName,
        } = formDataForAocUser;

        // Deconstruct applicable information from the user's Advent of Code account.
        const { stars, last_star_ts } = aocUser;

        // Update statistics for valid users ONLY.
        totalNumberOfCompetitors += 1;
        totalNumberOfStarsCompleted += stars;

        // *************
        // Compile School Competition Information

        // Initialize a new property for the school if it has not previously been seen.
        if (!schools[school]) {
          schools[school] = { school: school, stars: 0, participants: 0 }
        }

        // Add this Advent of Code competitors stars to the school's count, bump the participant count for the school, and update the school's efficiency.
        schools[school].stars += stars;
        schools[school].participants += 1;
        schools[school].efficiency = (schools[school].stars) / (schools[school].participants);
        // *************

        // *************
        // Compile Team Competition Information

        // If the competitor listed a team in their form submission, we will treat them as competing in a team.
        if (team == "Team") {

          // If we haven't seen this team before, lets initialize it.
          if (!teams[teamName]) {
            teams[teamName] = {
              teamMembers: [],
              stars: 0,
              percentageOfStarsEarned: 0,
              last_star_ts: 0,
              team: teamName,
            };
          }

          // Only add this person to the team if they are not already added.
          if (!teams[teamName].teamMembers.some(teamMember => teamMember === name)) {
            teams[teamName].teamMembers.push(name);

            teams[teamName].stars += stars;

            // We want to store the most recent last_star_ts between all of the teammates.
            if (last_star_ts > teams[teamName].last_star_ts) {
              teams[teamName].last_star_ts = last_star_ts;
            }

            teams[teamName].percentageOfStarsEarned = parseFloat((teams[teamName].stars / (MAX_STARS * teams[teamName].teamMembers.length) * 100).toFixed(3));
          }
        }
        // *************

        // *************
        // Compile Individual Competition Information

        // If the competitor didn't list a team in their form submission, they are an individual competitor.
        if (team != "Team") {

          // Initialize an object for a new individual.
          const individual = {
            "name": name,
            "stars": stars,
            "school": school,
            "last_star_ts": last_star_ts,
          }

          // Add the individual to our array of individual competitors.
          individualCompetitors.push(individual);

        }
        // *************
      }

      // Set state for the school wide competition leaderboard data.
      setSchoolCompetitionData(Object.values(schools));

      // Set state for the individual competition leaderboard data.
      setIndividualCompetitionData(individualCompetitors);

      // Set state for the team competition leaderboard data.
      setTeamCompetitionData(Object.values(teams));

      // Set state for the statistics we are tracking.
      setStatisticTotalCompetitors(totalNumberOfCompetitors);
      setStatisticTotalStars(totalNumberOfStarsCompleted);
      setStatisticAverageStars(totalNumberOfStarsCompleted / totalNumberOfCompetitors);

      // Update isLoading to be false.
      // Do this ONLY once. This will hide our spinning loading wheels and our components will pick up the data they need from the state variables that we just set.
      setIsLoading(false);
    }
  }, [isLoading]);


  return (
    <>
      <Head>
        <title>WCC Leaderboard - Minnesota Computer Club</title>
        <meta name="title" property="og:title" content=">WCC Leaderboard - Minnesota Computer Club" key="title" />
        <meta name="description" property="org:description" content="View the leaderboard for the Winter Coding Challenege." key="description" />
      </Head>

      <div className="text-center mb-4">
        <Badge msg={`Returning in December ${(new Date()).getUTCFullYear()}`}></Badge>
        <PageTitle title="WCC Leaderboard"></PageTitle>
      </div>

      {/* Error Bar for Displaying Error Messages from Fetching External APIs */}
      {props.error.errorStatus ? <ErrorBar errorCode={props.error.errorCode} errorMsg={props.error.errorMsg}></ErrorBar> : null}

      {/* Statistics Panel */}
      <div className="flex flex-wrap justify-center align-middle">
        <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white rounded p-4">
          <h2 className="pb-2 text-darkpurple dark:text-medpurple font-bold">2023 Statistics</h2>

          {isLoading ?
            <LoadingWheel></LoadingWheel>
            :
            <div>
              <div className="mb-4">
                <Countdown
                  prefix="WCC Starts In"
                  endDate={fromUnixTime(1701493201)}
                  endMessage="The 2023 WCC has begun!"
                />

                {/* <Countdown
                  prefix="Next AOC Puzzle Unlocks In"
                  endDate={getPuzzleDate()}
                  repeatUntil={fromUnixTime(1671948001)}
                  endMessage="Advent of Code 2023 has ended."
                />

                <Countdown
                  prefix="WCC Ends In"
                  endDate={fromUnixTime(1672552801)}
                  endMessage="The 2023 WCC has ended."
                /> */}
              </div>
              <div>
                <p><span className="font-bold">Total Stars Earned</span>: {statisticTotalStars ? starIcon + " " + statisticTotalStars : "---"}</p>
                <p><span className="font-bold">Total Competitors</span>: {statisticTotalCompetitors ? statisticTotalCompetitors : "---"}</p>
                <p><span className="font-bold">Average Stars Earned</span>: {statisticAverageStars ? starIcon + " " + statisticAverageStars.toFixed(2) : "---"}</p>
              </div>
            </div>
          }

        </div>
      </div>

      {/* School Wide Competition Leaderboard */}
      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">2023 School Wide Competition</h2>
        {isLoading ?
          <LoadingWheel></LoadingWheel>
          :
          <Table columns={schoolCompetitionColumns} data={schoolCompetitionData} initialSortState={[{ "id": "stars", "desc": true, }, { "id": "efficiency", "desc": false, }]}></Table>
        }
      </div>

      {/* Team Competition Leaderboard */}
      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">2023 Team Competition</h2>
        {isLoading ?
          <LoadingWheel></LoadingWheel>
          :
          <Table columns={teamCompetitorColumns} data={teamCompetitionData} initialSortState={[{ "id": "percentageOfStarsEarned", "desc": true, }, { "id": "last_star_ts", "desc": false, }]}></Table>
        }
      </div>

      {/* Individual Competition Leaderboard */}
      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">2023 Individual Competition</h2>
        {isLoading ?
          <LoadingWheel></LoadingWheel>
          :
          <Table columns={individualCompetitorColumns} data={individualCompetitionData} initialSortState={[{ "id": "stars", "desc": true, }, { "id": "last_star_ts", "desc": false, }]}></Table>
        }
      </div>

      {/* FAQ Dropdowns */}
      <div className="w-full px-4 pt-16">

        {/* FAQ for School Competition Scoring */}
        <ExpandingPanel title="FAQs" label="How is the school wide competition scored?">
          <p>Schools are ranked by their total number of stars. Tie breaks will be done using the efficiency of the school's competitors. This can be calculated by taking the total number of stars earned by students in that school and dividing it by the total number of participants for the school. All competitors count as 1 participant for their school and each competitor's stars count equally towards their school's start total.</p>
        </ExpandingPanel>

        {/* FAQ for Team Competition Scoring */}
        <ExpandingPanel label="How is the team competition scored?">
          <p>Teams are ranked by the total percentage of the possible stars the team has earned. This metric can be calculated by totaling the number of stars that each team member has earned and dividing that sum by (50 * the size of the team). Tie breaks will use the timestamp for the team's most recently earned star (i.e. the team who earned their star first will win the tie break). Each member of the team counts as 1 team member, and each person's stars count towards the team's total equally.</p>
        </ExpandingPanel>

        {/* FAQ for Individual Competition Scoring */}
        <ExpandingPanel label="How is the individual competition scored?">
          <p>Individuals are ranked by the number of stars that they earn. Tie breaks will use the timestamp for the individual's most recently earned star (i.e. the person who earned their star first will win the tie break).</p>
        </ExpandingPanel>

        {/* FAQ for Individual & Team */}
        <ExpandingPanel label="Can I complete both individually and on a team?">
          <p>No. You can either complete as a part of a team or individually. Not both.</p>
        </ExpandingPanel>

        {/* FAQ for Team Size */}
        <ExpandingPanel label="How many people can be on a team?">
          <p>Teams can be 1, 2, or 3 people in size. No exceptions.</p>
        </ExpandingPanel>

        {/* FAQ for Not Appearing on the Leaderboard */}
        <ExpandingPanel label="Why don't I see myself on the leaderboard?">
          <p className="mb-4">There could be several reasons that you don't see yourself appearing on the leaderboard.</p>

          <p className="mb-4">The leaderboard updates every 15 minutes. So, please be patient and check back in about 15 minutes to see if your are listed on the leaderboard.</p>

          <p className="mb-4">If after 15 minutes you still don't see yourself on the leaderboard, please review the registration instructions <Link href="/wcc#register" className="font-bold underline decoration-darkpurple decoration-2">here</Link>. If you want to be displayed on the leaderboard you must join one of our private Advent of Code (AoC) leaderboards <span className="font-bold">and</span> fill out the simple Google Form to verify who you are. The registration instructions explain this process.</p>

          <p className="mb-4">If you have done all of the above, then you may have misspelled your AoC username on your Google Form. Below are a list of AoC usernames that we were unable to find a Google Form submission for. If you name is listed below, please edit your Google Form submission and correct your AoC username.</p>

          {isLoading ?
            <LoadingWheel></LoadingWheel>
            :
            <div>
              <p>Advent of Code users that are missing a Google Form submission:</p>
              <ul className="list-disc mt-2 ml-10">
                {Array.from(competitorsMissingFormSubmission).map((aocUsername, indx) => { return (<li key={indx}>{aocUsername}</li>); })}
              </ul>
            </div>
          }
        </ExpandingPanel>

        {/* FAQ for Previous Competition Data */}
        <ExpandingPanel label="How can I view leaderboards from previous competitions?">
          <p>The leaderboards from previous competitions, starting with the 2022 WCC, have been saved. Links to archived leaderboards are listed below.</p>
          <ul className="list-disc mt-2 ml-10">
            <li key="2022-leaderboard"><Link href="/wcc/leaderboard/2022/" className="font-bold underline decoration-darkpurple decoration-2">2022 WCC Leaderboards</Link></li>
          </ul>
        </ExpandingPanel>

      </div>
    </>
  );
}

// Store the cached response(s) from our most recent API calls.
const cached = { AOC: {}, form: {}, error: {} };

// Store the timestamp (ms) of the last time that we pulled information from various external API endpoints.
let lastAPIPull;

// Store the path to the current year's frozen leaderboard.
let frozenLeaderboardFileName = './generatedData/frozenLeaderboard2023.json';

// Store whether an error has occurred when making our API calls.
// Documentation: https://nextjs.org/docs/advanced-features/custom-error-page#500-page
let errorOccurred = { "errorStatus": false, "errorCode": 0, "errorMsg": "" };

// Used to cache (server-side) the API calls we make to pull AOC data and our form responses.
// Documentation: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export async function getServerSideProps() {
  // Return our cached responses if our cached response has not expired. 
  if (lastAPIPull > Date.now()) {
    return { props: { AOC: cached.AOC, form: cached.form, error: cached.error } };
  }

  // If the current Unix Epoch is past  January 1, 2024 12:00:01 AM GMT-06:00 (1704088801), then our competition has ended.
  if (Date.now() / 1000 > 1704088801) {
    // Variable that will store the file contents of our frozen leaderboard.
    let frozenLeaderboard = ""

    // If our JSON file containing the frozen leaderboard data exists, then let's use that.
    if (fs.existsSync(frozenLeaderboardFileName)) {

      try {
        // Grab the frozen leaderboard data and parse it into a JSON object.
        frozenLeaderboard = await fs.promises.readFile(frozenLeaderboardFileName, { encoding: 'utf-8' });
        frozenLeaderboard = JSON.parse(frozenLeaderboard);

      } catch (e) {
        errorOccurred = { "errorStatus": true, "errorMsg": `Unable to read frozen leaderboard file. ${e}.` };
      }

      // If no error occurred with reading the local file, then update our cached response.
      if (!errorOccurred.errorStatus) {
        cached.AOC = frozenLeaderboard.props.AOC;
        cached.form = frozenLeaderboard.props.form;
      }

      // Update our error status every time our cache is expired.
      cached.error = errorOccurred;

    } else {
      // TO DO:
      // Call APIs to get most recent AOC data & form submissions. 
      // Clean AOC data to remove any stars completed after the deadline.
      // Update cached variable with this new, clean data.
      // Write data to ./generatedData/frozenLeaderboard2023.json in the necessary format.
    }

  } else {
    // TO DO:
    // Call APIs to get most recent AOC data & form submissions. 
    // Update cached variable with this data from the APIs.
  }

  // Update the time of our most recent API call.
  // Do this no matter the outcome of our API calls to prevent overwhelming external APIs.
  lastAPIPull = Date.now() + 15 * 60 * 1000;

  return { props: { AOC: cached.AOC, form: cached.form, error: cached.error } };
}