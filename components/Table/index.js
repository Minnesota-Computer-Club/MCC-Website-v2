// Import required dependencies.
import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { customFilterComponent, customFilterFunction } from './Filters';
import Filter from './Filters/PageComponents/default';
import { starIcon } from '../utils';

const columnHelper = createColumnHelper();

export default function Table(props) {
  const [data, setData] = React.useState(props.data || []);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState(props.initialSortState || []);

  const defaultColumns = [
    columnHelper.accessor('name', {
      filterFn: customFilterFunction["multiSelect"],
      meta: {
        filterComponent: customFilterComponent["multiSelect"],
      },
    }),
    columnHelper.accessor('stars', {
      cell: info => `${`${starIcon} ${info.getValue()}`}`,
    }),
    columnHelper.accessor('last_star_ts', {
      cell: info => {
        if (info.getValue() > 0) {
          return (new Date(info.getValue() * 1000)).toISOString();
        } else {
          return "";
        }
      },
      header: 'Last Star',
      footer: info => info.column.id,
      enableColumnFilter: false,
    }),
  ];

  const columns = React.useMemo(() => props.columns || defaultColumns, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    enableMultiSort: true,
    enableGlobalFilter: false,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  return (
    <div className="p-2 relative">
      {/* Styling of the Table comes from: https://flowbite.com/docs/components/tables */}
      <p>{table.getRowModel().flatRows.length} of {table.getCoreRowModel().flatRows.length} Competitors</p>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th {
                  ...{
                    key: header.id,
                    className: "px-6 py-3 w-96",
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none w-[150px] lg:w-auto'
                        : 'w-[150px] lg:w-auto',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                  {header.column.getCanFilter() && !header.column.columnDef.meta?.filterComponent
                    ? <Filter column={header.column} table={table}></Filter>
                    : (header.column.getCanFilter() && header.column.columnDef.meta?.filterComponent)
                      ? (header.column.columnDef?.meta?.filterComponent(header.column, table, header.column.setFilterValue))
                      : null
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {footerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-3">
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
