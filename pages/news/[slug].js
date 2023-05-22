// Credit to the following blog post for the inspiration for this functionality:
// https://www.99darshan.com/posts/1-markdown-blog-with-next-typescript-tailwind

// Import required dependencies.
import Head from 'next/head';
import PageTitle from '/components/PageTitle';

import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function Post(props) {
  return (
    <>
      <Head>
        <title>{props.frontmatter.title + " - Minnesota Computer Club"}</title>
        <meta name="title" property="og:title" content={props.frontmatter.title + " - Minnesota Computer Club"} />
        <meta name="description" property="og:description" content={props.frontmatter.description || "Read the latest announcements and updates from the Minnesota Computer Club."} />
        
        <meta property="og:url" content="https://mncomputerclub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mncomputerclub.com/mcc-logo-transparent-300x300.png" />

        <meta name="twitter:card" content="summary"></meta>
      </Head>

      <div className="text-center mb-4">
        <PageTitle title={props.frontmatter.title}></PageTitle>
      </div>

      <div className='mx-auto max-w-2xl'>
        <article className="prose dark:prose-invert">
          <ReactMarkdown>{props.content}</ReactMarkdown>
        </article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(`./pages/news/_posts/`, {withFileTypes: true});

  const filteredPostFiles = files.filter((entry) => entry.name.endsWith(".md"));

  const paths = filteredPostFiles.map((file) => {
    return {
      params: {
        slug: file.name.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params: {slug}}) {
  const file = fs.readFileSync(`./pages/news/_posts/${slug}.md`).toString();
  const { data, content } = matter(file);

  return {
    props: {
      slug,
      content,
      frontmatter: { title: data.title, description: data.description },
    },
  };
}