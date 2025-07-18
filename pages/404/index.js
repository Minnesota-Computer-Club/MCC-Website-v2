// This page was created by modifying a Tailwind UI 404 component.
// https://tailwindui.com/components/marketing/feedback/404-pages

// Import required dependencies.
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Minnesota Computer Club</title>

        <meta name="title" property="og:title" content="404 - Minnesota Computer Club" />
        <meta name="description" property="og:description" content="Unable to find the Minnesota Computer Club (MCC) content that you were looking for." />
        
        <meta property="og:url" content="https://mncomputerclub.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mncomputerclub.com/mcc-logo-transparent-300x300.png" />

        <meta name="twitter:card" content="summary"></meta>
      </Head>

      <div className="flex min-h-full flex-col pt-16 pb-12">
        <div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-base font-semibold text-darkpurple">404</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Uh, oh. Page not found.</h1>
              <p className="mt-2 text-base text-gray-500 dark:text-slate-200">This is awkward. We're sorry, but we couldn’t find the page you’re looking for.</p>
              <div className="mt-6">
                <Link href="/" className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-darkpurple to-medpurple hover:underline decoration-medpurple">
                  Go back home
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
