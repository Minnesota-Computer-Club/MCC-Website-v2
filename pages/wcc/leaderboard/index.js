// Import required dependencies.
import { fromUnixTime } from 'date-fns';
import Head from 'next/head';
import Link from "next/link";
import * as React from 'react';
import * as fs from 'fs';
import { createColumnHelper } from '@tanstack/react-table';

import Countdown from "/components/Countdown";
import ErrorBar from "/components/ErrorBar";
import Table from '/components/Table';
import { customFilterComponent, customFilterFunction } from "/components/Table/Filters";
import { getPuzzleDate} from "/components/Table/utils";
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

  // Will store various competition-wide statistics that we want to display.
  const [statisticTotalCompetitors, setStatisticTotalCompetitors] = React.useState(0);
  const [statisticTotalStars, setStatisticTotalStars] = React.useState(0);
  const [statisticAverageStars, setStatisticAverageStars] = React.useState(0);

  // Will store whether data is being loaded in and massaged.
  // This controls if the spinning loading wheel is displayed or not.
  const [isLoading, setIsLoading] = React.useState(true);

  // The column definitions for the school leaderboard table.
  const schoolCompetitionColumns = [
    columnHelper.accessor('name', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('city', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('stars', {
      cell: info => `${`${starIcon} ${Number(Number(info.getValue() || 0).toFixed(2))}`}`,
    }),
    columnHelper.accessor('participants', {
      cell: info => (Number(Number(info.getValue() || 0).toFixed(2))),
      header: "Total Participants"
    }),
    columnHelper.accessor('efficiency', {
      cell: info => Number(Number(info.getValue() || 0).toFixed(2)),
      header: "Efficiency"
    }),
  ];


  // This is where we will do ALL of our data massaging.
  // Data is passed into the page as props, and we can do our manipulations and then set data into their appropriate React state variables.
  React.useEffect(() => {
    // The page sets isLoading to true by default. We have to set it to false once we are done with our data manipulations.
    if (isLoading) {
      const schoolData = Object.values(props.AOC); // Grab all AoC schools returned from the AOC Leaderboards.

      const schools = {};

      // Variables that will be used to track competition-wide statistics.
      let totalNumberOfCompetitors = 0;
      let totalNumberOfStarsCompleted = 0;

      // Examine every AoC user from our private AoC leaderboards.
      for (const school of schoolData) {
 
        // Update competition-wide statistics.
        totalNumberOfCompetitors += school.participants;
        totalNumberOfStarsCompleted += school.stars;
        
        // Add school to the competition.
        // NOTE(mweiner): This makes an assumption that there is only 1 leaderboard PER school.
        schools[school.name] = school
      }

      // Set state for the school wide competition leaderboard data.
      setSchoolCompetitionData(Object.values(schools));

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
        <meta name="title" property="og:title" content="WCC Leaderboard - Minnesota Computer Club" />
        <meta name="description" property="og:description" content="View the leaderboard for the Winter Coding Challenge." />
        
        <meta property="og:url" content="https://mncomputerclub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mncomputerclub.com/mcc-logo-transparent-300x300.png" />

        <meta name="twitter:card" content="summary"></meta>
      </Head>

      <div className='flex bg-darkpurple -mt-8 -mx-8 mb-8 font-bold text-slate-50 space-x-2'>
        <p className='ml-8'>Previous Competitions: </p>
        <a href='/wcc/leaderboard/2023/' className='my-auto underline hover:no-underline'>2023</a>
        <a href='/wcc/leaderboard/2022/' className='my-auto underline hover:no-underline'>2022</a>
      </div>

      <div className="text-center mb-4">
        {/* <Badge color='green' msg={`Register Today for WCC 2024!`}></Badge> */}
        <PageTitle title="WCC Leaderboard"></PageTitle>
      </div>

      {/* Error Bar for Displaying Error Messages from Fetching External APIs */}
      {props.error.errorStatus ? <ErrorBar errorCode={props.error.errorCode} errorMsg={props.error.errorMsg}></ErrorBar> : null}

      {/* Statistics Panel */}
      <div className="flex flex-wrap justify-center align-middle">
        <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-sm p-4">
          <h2 className="pb-2 text-darkpurple dark:text-medpurple font-bold">2024 Statistics</h2>

          {isLoading ?
            <LoadingWheel></LoadingWheel>
            :
            <div>
              <div className="mb-4">
                <Countdown
                  prefix="Next AOC Puzzle Unlocks In"
                  repeatUntil={fromUnixTime(1735106401)}
                  endMessage="Advent of Code 2024 has ended."
                />

                <Countdown
                  prefix="WCC Ends In"
                  endDate={fromUnixTime(1735711201)}
                  endMessage="The 2024 WCC has ended."
                />
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
      <div className="pt-4" id="current">
        <h2 className="pt-4 text-2xl font-medium">2024 School Wide Competition</h2>
        {isLoading ?
          <LoadingWheel></LoadingWheel>
          :
          <Table columns={schoolCompetitionColumns} data={schoolCompetitionData} initialSortState={[{ "id": "stars", "desc": true, }, { "id": "efficiency", "desc": true, }]}></Table>
        }
      </div>

      {/* FAQ Dropdowns */}
      <div className="w-full px-4 pt-16">

        {/* FAQ for School Competition Scoring */}
        <ExpandingPanel title="FAQs" label="How is the school wide competition scored?">
          <p>Schools are ranked by their total number of stars. Tie breaks will be done using the efficiency of the school's competitors. This can be calculated by taking the total number of stars earned by students in that school and dividing it by the total number of participants for the school.</p>
        </ExpandingPanel>

        {/* FAQ for Previous Competition Data */}
        <ExpandingPanel label="How can I view leaderboards from previous competitions?">
          <p>The leaderboards from previous competitions have been saved. Links to archived leaderboards are listed below.</p>
          <ul className="list-disc mt-2 ml-10">
            <li key="2022-leaderboard"><Link href="/wcc/leaderboard/2023/" className="font-bold underline decoration-darkpurple decoration-2">2023 WCC Leaderboards</Link></li>
          </ul>
          <ul className="list-disc mt-2 ml-10">
            <li key="2022-leaderboard"><Link href="/wcc/leaderboard/2022/" className="font-bold underline decoration-darkpurple decoration-2">2022 WCC Leaderboards</Link></li>
          </ul>
        </ExpandingPanel>

      </div>
    </>
  );
}

// Store the cached response(s) from our most recent API calls.
const cached = { AOC: {}, error: {} };

// Store the timestamp (ms) of the last time that we pulled information from various external API endpoints.
let lastAPIPull;

// Store the path to the generated file storing data pulled from the private AoC Leaderboard files.
let generatedLeaderboardData = './generatedData/generatedAocLeaderboard2024.json';
// Store the path to the current year's frozen leaderboard file.
let frozenLeaderboardFileName = './generatedData/frozenLeaderboard2024.json';

// Store whether an error has occurred when making our API calls.
// Documentation: https://nextjs.org/docs/advanced-features/custom-error-page#500-page
let errorOccurred = { "errorStatus": false, "errorCode": 0, "errorMsg": "" };

// Used to cache (server-side) the API calls we make to pull AOC data and our form responses.
// Documentation: https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export async function getServerSideProps() {
  // Return our cached responses if our cached response has not expired. 
  if (lastAPIPull > Date.now()) {
    return { props: { AOC: cached.AOC, error: cached.error } };
  }

  // If our JSON file containing the frozen leaderboard data exists, then let's use that and "freeze" the leaderboard.
  if (fs.existsSync(frozenLeaderboardFileName)) {
    let frozenLeaderboard = "";

    try {
      // Grab the frozen leaderboard data and parse it into a JSON object.
      frozenLeaderboard = await fs.promises.readFile(frozenLeaderboardFileName, { encoding: 'utf-8' });
      frozenLeaderboard = JSON.parse(frozenLeaderboard);

    } catch (e) {
      errorOccurred = { "errorStatus": true, "errorMsg": `Unable to read frozen leaderboard file. ${e}.` };
    }

    // If no error occurred with reading the local file, then update our cached response.
    if (!errorOccurred.errorStatus) {
      cached.AOC = frozenLeaderboard.props.AOC.schools;
    }

    // Update our error status every time our cache is expired.
    cached.error = errorOccurred;

  } else {
    // Attempt to read data from the generated file containing our AoC leaderboard data.
    if (fs.existsSync(generatedLeaderboardData)) {
      let generatedLeaderboard = "";

      try {
        // Grab the leaderboard data and parse it into a JSON object.
        generatedLeaderboard = await fs.promises.readFile(generatedLeaderboardData, { encoding: 'utf-8' });
        generatedLeaderboard = JSON.parse(generatedLeaderboard);

      } catch (e) {
        errorOccurred = { "errorStatus": true, "errorMsg": `Unable to read leaderboard file. ${e}.` };
      }

      if (generatedLeaderboard.lastUpdatedAt <= Math.floor(Date.now() / 1000) - 3600) {
        errorOccurred = { "errorStatus": true, "errorMsg": `AoC data has not been updated since ${new Date(generatedLeaderboard.lastUpdatedAt * 1000)}.` };
      }

      // If no error occurred with reading the local file, then update our cached response.
      if (!errorOccurred.errorStatus) {
        cached.AOC = generatedLeaderboard.schools;
      }

      // Update our error status every time our cache is expired.
      cached.error = errorOccurred;
    }
  }

  // Update the time of our most recent API call.
  // Do this no matter the outcome of our API calls to prevent overwhelming external APIs.
  lastAPIPull = Date.now() + 15 * 60 * 1000;

  return { props: { AOC: cached.AOC, error: cached.error } };
}