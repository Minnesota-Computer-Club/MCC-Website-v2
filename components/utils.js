// The ★ icon that is used throughout the site.
export const starIcon = "★";

// A helper method that will be used to dynamically apply CSS classes to HTML elements.
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// All of the website's navigational elements.
// This is how we can add or remove items from the header and footer navigation menus.
export const navigationItems = [
  {
    name: 'Home',
    href: '/',
    subItems: [],
    includeInFooter: true,
    includeInHeader: true,
  }, 
  {
    name: 'About Us',
    href: '/about',
    subItems: [],
    includeInFooter: true,
    includeInHeader: true,
  },
  {
    name: 'Winter Coding Challenge (WCC)',
    href: '/wcc',
    subItems: [
      {
        name: 'Information',
        description: 'Learn more about what the Winter Coding Challenge (WCC) is and how to register.',
        href: '/wcc',
        includeInFooter: false,
      },
      { 
        name: 'Leaderboard', 
        description: 'Find out where you (and everyone else) rank in the current competition.', 
        href: '/wcc/leaderboard',
        includeInFooter: false,
      },
      {
        name: 'Register',
        description: 'Sign up to participate in the competition.',
        href: '/wcc#register',
        includeInFooter: false,
      },
      {
        name: 'Sponsors',
        description: 'This competition would not be possible without our generous sponsors.',
        href: '/wcc#sponsors',
        includeInFooter: false,
      },
    ],
    includeInFooter: true,
    includeInHeader: true,
  },
  {
    name: 'WCC Leaderboard',
    href: '/wcc/leaderboard',
    includeInFooter: true,
    includeInHeader: false,
  },
];