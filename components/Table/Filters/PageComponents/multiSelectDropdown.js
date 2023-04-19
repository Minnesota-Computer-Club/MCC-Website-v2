// Import required dependencies.
import * as React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function multiSelectDropdown(column, table) {
  const [selected, setSelected] = React.useState(column.getFilterValue() || []);

  const options = React.useMemo(() => {
    // 2D Array of the Format: [['Value1', 1], ... , ['Value2', 49]]
    let uniqueValuesWithCounts = [...column.getFacetedUniqueValues()].sort(function (a, b) {
      return a[0].localeCompare(b[0]);
    });

    // Array that will store just our unique values from our data for the particular column the filter is being applied to.
    let uniqueValuesOnly = [];

    // Will track if we need to include our special <Empty> filter option in the dropdown.
    let containsUndefined = false;

    for (const value of uniqueValuesWithCounts) {
      if (value[0] == undefined || String(value[0]).trim() == "") {
        containsUndefined = true;
      } else {
        uniqueValuesOnly.push(value[0]);
      }
    }

    if (containsUndefined) {
      return ["<Empty>", ...uniqueValuesOnly];
    } else {
      return uniqueValuesOnly;
    }

  }, [column.id, table.getPreFilteredRowModel()]);

  React.useEffect(() => {
    column.setFilterValue(selected);
  }, [selected]);

  React.useEffect(() => {
    if (!column.getFilterValue()) {
      setSelected([])
    }
  }, [column.getFilterValue()]);

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected} multiple>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer bg-white dark:bg-slate-900 py-1 pl-3 pr-10 text-left focus:outline-none focus-visible:lightpurple focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-lightpurple sm:text-sm">
            {
              selected.length == 0 ?
                <span className="block truncate text-gray-400">Select</span>
                : selected.length == 1 ?
                  <span className="block truncate">{selected}</span>
                  : <span className="block truncate">({selected.length})</span>
            }
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-auto md:w-full overflow-auto bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 normal-case ${active ? 'bg-lightpurple text-darkpurple' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block w-full ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-darkpurple">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}