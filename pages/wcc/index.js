// Import required dependencies.
import Head from 'next/head';
import InfoBar from '/components/InformationBar';
import PageTitle from '/components/PageTitle';

export default function WinterCodingChallenge() {

  const sponsors = [];

  return (
    <>
      <Head>
        <title>WCC - Minnesota Computer Club</title>
        <meta name="title" property="og:title" content="WCC - Minnesota Computer Club" />
        <meta name="description" property="og:description" content="Learn more about the annual Winter Coding Challenge (WCC)." />
        
        <meta property="og:url" content="https://mncomputerclub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mncomputerclub.com/mcc-logo-transparent-300x300.png" />

        <meta name="twitter:card" content="summary"></meta>
      </Head>

      <div className="text-center mb-4">
        <PageTitle title={"Winter Coding Challenge (WCC)"}></PageTitle>
      </div>

      <div className="pt-4">
        <p>
          Our Winter Coding Challenge (WCC) starts with the first puzzle release at 11:00:00 PM CST/UTC-6 on December 1st and ends at 12:00:01 AM CST/UTC-6 on January 1st. This allows for some extra time to complete as many puzzles as possible. After our competition ends the leaderboard will be frozen, but you can continue to work on the Advent of Code puzzles! Our competition is only based on the number of problems completed (stars acquired), unless there is a tie that needs to be broken.
        </p>
      </div>

      <div className="pt-4">
        <h2 id="register" className="pt-4 text-2xl font-medium">
          Register
        </h2>
        <p>The 2024 Winter Coding Challenge has officially started! This year there is no team or individual competition. We will only be running a competition between schools. Getting your school involved in the competition only takes a few minutes. Here's how you can do it:</p>
        <ol className="list-decimal mt-2 ml-10">
          <li>Visit <a href="https://adventofcode.com" target='_blank' className='font-bold underline decoration-darkpurple decoration-2'>https://adventofcode.com</a> and login.</li>
          <li>Click [Leaderboard] at the top of the site.</li>
          <li>Click [Private Leaderboard] near the top of the page.</li>
          <li>Under the "--- Your Private Leaderboard ---" section on the page, click [Create It].</li>
          <li>You will then see a message that says something like: "Your private leaderboard has been created. Others can join it with the code xxxxxxx-yyyyyyyy."</li>
          <li>The "xxxxxxx-yyyyyyyy" code is unique to your private leaderboard and it is how people can join your leaderboard. Keep it private!</li>
          <li>Share your "xxxxxxx-yyyyyyyy" code with the students from your school that want to compete in the competition.</li>
        </ol>
        <p className="mt-2">To have your school displayed on the site, please email your private leaderboard code to <a href="mailto:info@mncomputerclub.com?subject=WCC 2024 Registration" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">info@mncomputerclub.com</a> or visit our Discord server (linked above) to share your school's private leaderboard code. We will join your leaderboard as user "Minnesota Computer Club Bot" to gather data.</p>
        </div>

      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">
          Rules and Guidelines
        </h2>
        <p>Below are the few rules that we have for our competition.</p>

        <div>
          <ul className="list-disc mt-2 ml-10">
            <li>Each school will create their own private Advent of Code Leaderboard.</li>
            <li>The private leaderboard code will be submitted to the Minnesota Computer Club.</li>
            <li>The Minnesota Computer Club has a bot that will join the leaderboard to track stars earned for that school.</li>
            <li>Competitors may not use AI to solve problems for them.</li>
              <ul className="list-disc mt-2 ml-10">
                <li>The official Advent of Code (AoC) competition has a rule this year about not using AI to get on the global leaderboard. You can read more about this new rule <a href="https://adventofcode.com/about#faq_ai_leaderboard" target='_blank' className='font-bold underline decoration-darkpurple decoration-2'>here</a>.</li>
                <li>Our Winter Coding Challenge also has this rule. We cannot stop you from using AI to help you understand components of a puzzle, but we ask that you do not use it to solve the puzzle for you. It is up to the honor of the individual students not to cheat in this regard. This challenge is all about learning and becoming a better programer with other students - using AI to solve puzzles for you doesn't achieve that.</li>
              </ul>
            <li>The representative/organizer for each school is responsible for ensuring the students representing their school are following the rules outlined above.</li>
          </ul>
        </div>
      </div>

      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">
          Prizes
        </h2>
        <p>🏆 The school with the most stars earned during this competition will receive the annual Winter Coding Competition trophy and bragging rights for the next 12 months!</p>
      </div>

      <div className="pt-4">
        <h2 id="sponsors" className="pt-4 text-2xl font-medium">
          Sponsors
        </h2>
        <p>This competition would not be possible without our generous sponsors! If your business would like to support this competition, please email <a href="mailto:info@mncomputerclub.com?subject=WCC Sponsorship" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">info@mncomputerclub.com</a>.</p>
      </div>

      <div className="pt-4">
        <h2 id="sponsors" className="pt-4 text-2xl font-medium">
          Advent of Code Disclaimer
        </h2>

        <p>
          Every December the Minnesota Computer Club hosts a programming competition for middle and high school students. There are 25 puzzles for students to solve. These puzzles are from the well-known <a href="https://adventofcode.com" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">Advent of Code</a>. A puzzle is released at midnight EST/UTC-5 (11:00:00 PM CST/UTC-6) once per day starting on December 1st and continuing through December 25th.
        </p>

        <div className="pt-4">
          <InfoBar
            msg="Minnesota Computer Club is not associated with Advent of Code. All puzzles are property of Advent of Code."
            href="https://adventofcode.com"
            linkLabel="View Advent of Code"
          >
          </InfoBar>
        </div>
      </div>
    </>
  );
}
