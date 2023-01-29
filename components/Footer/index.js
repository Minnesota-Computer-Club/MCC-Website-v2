// This footer was created by modifying a Tailwind UI Footer component.
// https://tailwindui.com/components/marketing/elements/footers

// Import required dependencies.
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { navigationItems } from '/components/utils';

export default function Footer(props) {

  // Will be used to track whether our page has mounted or not.
  const [mounted, setMounted] = useState(false);

  // Upon first page mount, set mounted to be true.
  useEffect(() => {
    setMounted(true);
  }, []);

  // We are using `next-themes` to grab the current theme information from the user.
  const { systemTheme, theme, setTheme } = useTheme();

  // Function that will return our dark/light mode button toggle.
  const renderThemeChanger = () => {

    // Ensure's that the page has mounted before we try and set theme toggle.
    if (!mounted) {
      return null;
    }

    // Determine what the current theme setting is.
    const currentTheme = theme === 'system' ? systemTheme : theme;

    // Return the appropriate dark/light icon based on the user's current theme so they can manually switch themes if they would like to.
    if (currentTheme === 'dark') {
      return (
        <SunIcon className='w-6 h-6 hover:text-gray-500 mx-auto sm:mx-0' role='button' onClick={() => setTheme('light')}></SunIcon>
      );
    } else {
      return (
        <MoonIcon className='w-6 h-6 hover:text-gray-500 mx-auto sm:mx-0' role='button' onClick={() => setTheme('dark')}></MoonIcon>
      );
    }
  }

  return (
    <footer className={`${props.className}`}>
      <div className="mx-auto max-w-7xl overflow-hidden py-8 px-6 sm:py-8 lg:px-8">
        <nav className="-mb-6 justify-center text-center sm:flex sm:space-x-12" aria-label="Footer">

          {/* Navigation Items */}
          {(navigationItems.filter(navItem => navItem.includeInFooter)).map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 hover:text-gray-500 hover:cursor-pointer">
                {item.name}
              </Link>
            </div>
          ))}

          {/* Dark/Light Theme Toggle */}
          {renderThemeChanger()}

        </nav>
        <p className="mt-10 text-center text-xs leading-5">
          &copy; 2022 - {`${(new Date()).getUTCFullYear()}`} <a className="font-bold underline decoration-darkpurple decoration-2" href="mailto:info@mncomputerclub.com">Minnesota Computer Club</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}