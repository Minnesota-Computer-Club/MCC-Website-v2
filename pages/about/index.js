// Import required dependencies.
import Head from 'next/head';
import PageTitle from '/components/PageTitle';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Minnesota Computer Club</title>
        <meta name="title" property="og:title" content="About Us - Minnesota Computer Club" key="title" />
        <meta name="description" property="org:description" content="Learn more about the Minnesota Computer Club (MCC)." key="description" />
      </Head>

      <div className="text-center mb-4">
        <PageTitle title={"About Us"}></PageTitle>
      </div>

      <div className="pt-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </>
  );
}
