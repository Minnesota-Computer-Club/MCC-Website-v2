// Import required dependencies.
import * as React from 'react';
import DebouncedInput from './debouncedInput';

// This is our default filter to use for simple text or number data filtering.
export default function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2 w-full">
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue)?.[0] ?? ''}
        onChange={value =>
          column.setFilterValue((old) => [value, old?.[1]])
        }
        placeholder={`Min`}
      />
      <DebouncedInput
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        value={(columnFilterValue)?.[1] ?? ''}
        onChange={value =>
          column.setFilterValue((old) => [old?.[0], value])
        }
        placeholder={`Max`}
      />
    </div>
  ) : (
    <>
      <DebouncedInput
        className="w-full"
        type="text"
        value={(columnFilterValue ?? '')}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
      />
    </>
  );
}