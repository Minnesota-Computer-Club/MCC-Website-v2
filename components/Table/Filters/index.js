// Import required dependencies.
import multiSelectDropdown from "./PageComponents/multiSelectDropdown";

// API Documentation: https://tanstack.com/table/v8/docs/api/features/filters#using-filter-functions
// Discussion on Custom Filters: https://github.com/TanStack/table/discussions/4133
function multiSelectFilterFn(row, columnId, filterValue, addMeta) {
  if (!filterValue || filterValue.length == 0) {
    return true;
  }
  if (filterValue == row.getValue(columnId) || filterValue.includes(row.getValue(columnId))) {
    return true;
  }
  if (!row.getValue(columnId) && (filterValue == "<Empty>" || filterValue.includes("<Empty>"))) {
    return true;
  }

  return false;
}

// This will store our mapping from filter types to the function that handles that filtering logic.
export const customFilterFunction = {
  "multiSelect": multiSelectFilterFn
}

// This will store our mapping from filter types to the function returns the JSX component for the front-end that the user interacts with to apply the filter.
export const customFilterComponent = {
  "multiSelect": multiSelectDropdown
}