// This header was created by modifying a Tailwind UI Header component.
// https://tailwindui.com/components/marketing/elements/headers

// Import required dependencies.
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment } from 'react';

import { classNames, navigationItems } from '/components/utils';

export default function Header(props) {
  return (
    <Popover className={` relative border-b-2 border-gray-200 bg-gray-100 dark:border-slate-600 dark:bg-slate-800 ${props.className}`}>
      <div className="flex items-center justify-between p-4 md:justify-start md:space-x-10">

        {/* Logo Wrapper */}
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <span className="sr-only">Minnesota Computer Club</span>
            <img
              className="h-16 w-auto sm:h-18"
              src="/mcc-logo-transparent-300x300.png"
              alt=""
            />
          </Link>
        </div>

        {/* Mobile Menu Hamburger Icon Wrapper */}
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-darkpurple hover:bg-gray-100 hover:text-gray-500 focus:outline-hidden">
            <span className="sr-only">Open Menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>

        {/* Menu Content Wrapper */}
        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
          {(navigationItems.filter(navItem => navItem.includeInHeader)).map((navItem) => (
            // Determine whether to display menu item as a dropdown or as a standard menu item.
            navItem.subItems.length == 0 ?
              <Link
                key={navItem.name}
                href={navItem.href}
                className="text-base font-medium hover:text-darkpurple"
              >
                {navItem.name}
              </Link>

              :

              <Popover className="relative" key={navItem.name + "-dropdown"}>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-darkpurple' : 'text-black dark:text-white', 'group inline-flex items-center rounded-md text-base font-medium hover:text-darkpurple focus:outline-hidden'
                      )}
                    >
                      <span className="hover:text-darkpurple">Winter Coding Challenge</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-darkpurple' : 'text-black dark:text-white', 'ml-2 h-5 w-5 group-hover:text-darkpurple'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    {/* Transition to open dropdown WCC menu. */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      {/* Dropdown WCC Wrapper */}
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5">
                          <div className="relative grid gap-6 bg-white dark:bg-slate-900 px-5 py-6 sm:gap-8 sm:p-8">
                            {(navItem.subItems).map((resource) => (
                              // The following Github Issue explains (very thoroughly) why we need Popover.Button components here.
                              // https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-916925396
                              <Popover.Button as={Link} key={resource.name} href={resource.href} className="-m-3 block rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-hidden">
                                <p className="text-base font-medium">{resource.name}</p>
                                <p className="mt-1 text-sm">{resource.description}</p>
                              </Popover.Button>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
          ))}
        </Popover.Group>

        {/* CTA Wrapper */}
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server" target="_blank">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-1.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-linear-to-br from-darkpurple to-medpurple group-hover:from-darkpurple group-hover:to-medpurple hover:text-white dark:text-white">
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-slate-900 rounded-md group-hover:bg-opacity-0">
                Join Discord Server
              </span>
            </button>
          </a>
        </div>
      </div>

      {/* Transition to open mobile WCC menu. */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {/* Mobile Menu Wrapper */}
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5">

            {/* Mobile Menu Items */}
            <div className="py-6 px-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <img
                    className="h-16 w-auto"
                    src="/mcc-logo-transparent-300x300.png"
                    alt="Minnesota Computer Club"
                  />
                </div>

                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-hidden">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {navigationItems.map((navItem) => (
                  // The following Github Issue explains (very thoroughly) why we need Popover.Button components here.
                  // https://github.com/tailwindlabs/headlessui/issues/427#issuecomment-916925396
                  <Popover.Button as={Link} key={navItem.name} href={navItem.href} className="text-base font-medium hover:text-darkpurple focus:outline-hidden">
                    <p className="text-base font-medium">{navItem.name}</p>
                  </Popover.Button>
                ))}
              </div>

              {/* Mobile CTA Wrapper */}
              <div className="mt-6">
                <a href="mailto:info@mncomputerclub.com?subject=Requesting an Invite to MCC Discord Server" target="_blank" className="w-full">
                  <button className="relative inline-flex items-center justify-center w-full p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-linear-to-br from-darkpurple to-medpurple group-hover:from-darkpurple group-hover:to-medpurple hover:text-white dark:text-white">
                    <span className="relative w-full px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-slate-900 rounded-md group-hover:bg-opacity-0">
                      Join Discord Server
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
