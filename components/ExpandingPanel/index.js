// This expanding panel was created using the example provided by HeadlessUI.
// https://headlessui.com/react/disclosure

// Import required dependencies.
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function ExpandingPanel(props) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl p-2">
      {props.title ? <h2 className="pb-4 text-2xl font-medium">{props.title}</h2> : null}

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-darkpurple hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>{props.label || ""}</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-medpurple`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700 dark:text-white">
              {props.children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}