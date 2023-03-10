// Import required dependencies.
import Head from 'next/head';
import Badge from '/components/Badge';
import InfoBar from '/components/InformationBar';
import PageTitle from '/components/PageTitle';

export default function WinterCodingChallenge() {

  const sponsors = [
    {
      "key": "IBM",
      "imageURL": "/ibm-logo.png",
      "linkURL": "https://www.ibm.com"
    },
    {
      "key": "Sargent's Garden Center",
      "imageURL": "/sargents-logo.png",
      "linkURL": "https://sargentsgardens.com"
    },
    {
      "key": "Winona State University",
      "imageURL": "/winona-state-logo.png",
      "linkURL": "https://www.winona.edu"
    },
    {
      "key": "Flapdoodles Ice Cream",
      "imageURL": "/flapdoodles-logo.png",
      "linkURL": "https://www.flapdoodlesicecream.com"
    },
    {
      "key": "Tyrol Ski and Sports",
      "imageURL": "/tyrol-logo.png",
      "linkURL": "https://www.tyrolskishop.com"
    },
    {
      "key": "Newt's",
      "imageURL": "/newts-logo.png",
      "linkURL": "https://creativecuisineco.com/newts/"
    },
    {
      "key": "Pi Wood Fired Pizza",
      "imageURL": "/pi-logo.png",
      "linkURL": "https://live4pi.com"
    },
    {
      "key": "Rochester Community and Technical College",
      "imageURL": "/rctc-logo.png",
      "linkURL": "https://www.rctc.edu"
    },
    {
      "key": "Mayo Clinic",
      "imageURL": "/mayo-logo.png",
      "linkURL": "https://www.mayoclinic.org"
    },
    {
      "key": "Cafe Aqui",
      "imageURL": "/aqui-logo.png",
      "linkURL": "https://aqui.coffeeaq"
    },
  ];

  return (
    <>
      <Head>
        <title>WCC - Minnesota Computer Club</title>
        <meta name="title" property="og:title" content=">WCC - Minnesota Computer Club" key="title" />
        <meta name="description" property="org:description" content="Learn more about the annual Winter Coding Challenge (WCC)." key="description" />
      </Head>

      <div className="text-center mb-4">
        <Badge msg={`Returning in December ${(new Date()).getUTCFullYear()}`}></Badge>
        <PageTitle title={"Winter Coding Challenge (WCC)"}></PageTitle>
      </div>

      <div className="pt-4">
        <p>
          Every December the Rochester Computer Club hosts a programming competition for middle and high school students. There are 25 puzzles for students to solve. These puzzles are from the well-known <a href="https://adventofcode.com" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">Advent of Code</a>. A puzzle is released at midnight EST/UTC-5 once per day starting on December 1st and continuing through December 25th.
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
          Our Winter Coding Competition (WCC) starts with the first puzzle release at midnight EST/UTC-5 and ends January 1st at 12:01 AM CST/UTC-6. This allows for some extra time to complete as many puzzles as possible. After our competition ends the leaderboard will be frozen, but you can continue to work on the Advent of Code puzzles! Our competition is only based on the number of problems completed (stars acquired), not the speed/score unless there is a tie that needs to be broken.
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
        <p>Registration for the 2023 competition will open in late November. Registration closes when our competition ends on January 1<sup>st</sup>.</p>
      </div>

      <div className="pt-4">
        <h2 id="sponsors" className="pt-4 text-2xl font-medium">
          Sponsors
        </h2>
        <p>Below are the generous sponsors of our competition. Thank you to each and every one of them! This competition would not be possible without them. If your business would like to donate a prize and be listed on our site and t-shirts, please email <a href="mailto:info@mncomputerclub.com?subject=WCC Sponsorship" target="_blank" className="font-bold underline decoration-darkpurple decoration-2">info@mncomputerclub.com</a>.</p>
      </div>

      {/* This logo cloud was created by modifying a Tailwind UI Logo Cloud component. */}
      {/* https://tailwindui.com/components/marketing/sections/logo-clouds */}
      <div className="mx-auto max-w-7xl py-10 px-6 lg:px-8">
        <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-50">
          Thank you to our generous sponsors!
        </p>

        {/* Sponsors */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
          {
            sponsors.sort((a, b) => a.key.localeCompare(b.key)).map((sponsor, indx) => {
              return (
                <div key={sponsor.key} className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
                  <a href={sponsor.linkURL} target="_blank"><img className="max-h-12" src={sponsor.imageURL} alt={sponsor.key + " Logo"} /></a>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}
