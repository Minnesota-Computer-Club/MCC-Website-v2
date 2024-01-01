// Credit to the following blog post for the inspiration for this functionality:
// https://www.99darshan.com/posts/1-markdown-blog-with-next-typescript-tailwind

// Import required dependencies.
import Head from 'next/head';
import PageTitle from '/components/PageTitle';

import { format, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';

export default function News(props) {
  return (
    <>
      <Head>
        <title>News - Minnesota Computer Club</title>
        <meta name="title" property="og:title" content="News - Minnesota Computer Club" />
        <meta name="description" property="og:description" content="Read the latest announcements and updates from the Minnesota Computer Club." />

        <meta property="og:url" content="https://mncomputerclub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mncomputerclub.com/mcc-logo-transparent-300x300.png" />

        <meta name="twitter:card" content="summary"></meta>
      </Head>

      <div className="text-center mb-4">
        <PageTitle title={"News"}></PageTitle>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="border-t border-gray-50 dark:border-gray-400 space-y-16 mt-4 sm:mt-6 pt-4 sm:pt-6">
            {props.posts.length == 0 ? <p>We currently don't have any news to share with you. But don't worry, we're always working on new and exciting things to share with our amazing community members.</p> : null}
            
            {props.posts.map((post) => (
              <article key={post.slug} className="flex flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.frontmatter.date} className="">
                    {post.frontmatter.date}
                  </time>
                  <p className="relative z-10 rounded-full bg-gray-100 text-darkpurple dark:text-gray-900 px-3 py-1.5 font-medium">{post.frontmatter.category}</p>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6">
                    <a href={`/news/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.frontmatter.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6">{post.frontmatter.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const postFiles = fs.readdirSync(`./pages/news/_posts/`, {withFileTypes: true});

  const filteredPostFile = postFiles.filter((entry) => entry.name.endsWith(".md"));

  if (filteredPostFile.length == 0) {
    return {
      props: {
        posts: []
      }
    }
  }

  const posts = filteredPostFile.map((post) => {
    const file = fs.readFileSync(`./pages/news/_posts/${post.name}`).toString();

    const { data, content } = matter(file);
    
    const frontmatter = { 
      title: data.title, 
      description: data.description, 
      category: data.category,
      datetime: data.updatedAt,
      date: format(parseISO(data.updatedAt), 'PPPP'),
      author: data.author
    };

    return {
      slug: post.name.replace('.md', ''),
      content: content,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}