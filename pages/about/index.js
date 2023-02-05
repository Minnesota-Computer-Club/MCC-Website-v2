// Import required dependencies.
import Head from 'next/head';
import PageTitle from '/components/PageTitle';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Minnesota Computer Club</title>
        <meta name="title" property="og:title" content=">About Us - Minnesota Computer Club" key="title" />
        <meta name="description" property="org:description" content="Learn more about the Minnesota Computer Club (MCC)." key="description" />
      </Head>

      <div className="text-center mb-4">
        <PageTitle title={"About Us"}></PageTitle>
      </div>

      <div className="pt-4">
        <div>
          <p style={{ paddingBottom: '16px' }}>
            The Minnesota Computer Club is a community of technology enthusiasts dedicated to promoting and advancing the use of technology in the state of Minnesota. Established in 2010, we have since become the largest and most active technology community in the region.
          </p>
          <p style={{ paddingBottom: '16px' }}>Our mission is to provide a platform for people to learn, connect, and collaborate with others who share a passion for technology. We host regular events and workshops, including technology demonstrations, speaker series, and hands-on training sessions. Our goal is to help individuals stay up-to-date with the latest technology trends and to foster a sense of community among like-minded individuals.</p>
          <p style={{ paddingBottom: '16px' }}>Our members are a diverse group of individuals, including students, professionals, hobbyists, and entrepreneurs. They range from beginners to experts and come from a variety of backgrounds, including computer science, engineering, and marketing. We welcome anyone who is interested in technology and would like to learn more about it.</p>
          <p style={{ paddingBottom: '16px' }}>The Minnesota Computer Club is run by a volunteer board of directors who are elected by the membership. We are proud to be a non-profit organization and are dedicated to promoting technology education and access for everyone.
          </p>
          <p style={{ paddingBottom: '16px' }}>Join us today and become part of the Minnesota Computer Club community! With a membership, you'll have access to exclusive events, resources, and discounts. Together, we can continue to drive innovation and advancements in technology.</p>
        </div>
        <div style={{display: 'flex'}}>
          <p style={{marginRight: '14px'}}>You can contact our administration by clicking the following link:
          </p>
          <Link href="mailto:info@mncomputerclub.com"  target="_blank"
            rel="noreferrer">
            <img
              className="h-16 w-auto sm:h-18"
              src="/mail-icon.jpeg"
              alt=""
              style={{width: '30px', height: '30px', borderRadius: '50%'}}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
