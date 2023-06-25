// Import required dependencies.
import Head from 'next/head';
import Badge from '/components/Badge';
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
        <Badge msg={`Returning in December ${(new Date()).getUTCFullYear()}`}></Badge>
        <PageTitle title={"Winter Coding Challenge (WCC)"}></PageTitle>
      </div>

      <div className="pt-4">
        <p>
          Every December the Rochester Computer Club hosts a programming competition for middle and high school students. There are 25 puzzles for students to solve. These puzzles are from the well-known <a href="https://adventofcode.com" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">Advent of Code</a>. A puzzle is released at midnight EST/UTC-5 (11:00:00 PM CST/UTC-6) once per day starting on December 1st and continuing through December 25th.
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

      <div className="pt-4">
        <p>
          Our Winter Coding Competition (WCC) starts with the first puzzle release at 11:00:00 PM CST/UTC-6 on December 1st and ends at 12:00:01 AM CST/UTC-6 on January 1st. This allows for some extra time to complete as many puzzles as possible. After our competition ends the leaderboard will be frozen, but you can continue to work on the Advent of Code puzzles! Our competition is only based on the number of problems completed (stars acquired), unless there is a tie that needs to be broken.
        </p>
      </div>

      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">
          Rules and Guidelines
        </h2>
        <p>Below are the few rules that we have for our competition.</p>

        <div>
          <ul className="list-disc mt-2 ml-10">
            <li>Students may enter this competition as individuals, or as a team, but not both. It is up to the honor of the individual students not to cheat in this regard.</li>
            <li>Teams can be up to three people only. No exceptions, not even for besties.</li>
            <li>You can use any programming language you like. This competition is set up to be language-agnostic.</li>
            <li>You may not share your solutions with anyone outside of your group. Again, it is up to the honor of the individual to maintain the integrity of the tournament.</li>
            <li>Ties in the number of stars will be settled with AOC score (shortest time to complete puzzle).</li>
          </ul>
        </div>
      </div>

      <div className="pt-4">
        <h2 className="pt-4 text-2xl font-medium">
          Prizes
        </h2>
        <p>All students and teams with at least one star will also be entered for random prizes.</p>

        <div className="pt-4">
          <p>Top three competitors in <span className="font-bold italic">each</span> of the following categories (with at least 10 stars) will earn a prize.</p>
          <ul className="list-disc mt-2 ml-10">
            <li>High School Students</li>
            <li>Middle School Students</li>
            <li>High School with the Most Cumulative Stars (Sum of all Individuals & Teams for that school.)</li>
          </ul>
        </div>

        <div className="pt-4">
          <p>There will be additional prizes for high school competitors.</p>
          <ul className="list-disc mt-2 ml-10">
            <li><span className="font-bold">1<sup>st</sup> Place Individual:</span> $100 Cash</li>
            <li><span className="font-bold">2<sup>nd</sup> Place Individual:</span> $75 Cash</li>
            <li><span className="font-bold">3<sup>rd</sup> Place Individual:</span> $50 Cash</li>
            <li><span className="font-bold">1<sup>st</sup> Place Team:</span> $50 Cash (Split Between the Team Members)</li>
            <li><span className="font-bold">1<sup>st</sup> Place School:</span> An engraving on a perpetual trophy to be displayed at their school.</li>
          </ul>
        </div>
      </div>

      <div className="pt-4">
        <h2 id="register" className="pt-4 text-2xl font-medium">
          Register
        </h2>
        <p>Registration for the 2023 competition will open in November. Registration closes when our competition ends January 1st at 12:00:01 AM CST/UTC-6<sup>st</sup>.</p>
      </div>

      <div className="pt-4">
        <h2 id="sponsors" className="pt-4 text-2xl font-medium">
          Sponsors
        </h2>
        <p>This competition would not be possible without our generous sponsors! If your business would like to donate a prize and be listed as a sponsor of this competition below, please email <a href="mailto:info@mncomputerclub.com?subject=WCC Sponsorship" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">info@mncomputerclub.com</a>.</p>
      </div>
      
    </>
  );
}
