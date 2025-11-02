# Table Component

The Table component should be used to display any content within a table. Namely, this is what we will use to display our WCC leaderboards.

**WARNING: This component is ***highly*** complex - especially if you've never looked at it before. This documentation won't be able to cover every little detail. As you find that you want a better explanation of something, please ask! We can work to continue to add to the documentation until it becomes complete enough to give new users a better picture of how this table works. As always, the best way to learn is to fire up a local development environment and begin using it. Try making a change to it to see if you understand what is happening!** 

## Usage

The following example would create an table with the default columns (Name, Stars, and Last Star) and no rows (since we provided an empty array to `data`).

```jsx
import Table from "../../../components/Table";

export default function Example(props) {
  return (
    <div className="pt-4">
      <h2 className="pt-4 text-2xl font-medium">Example Table</h2>
      <Table data={[]}></Table>
    </div>
  );
}
```

The following example would create an table with 3 columns (Name, Initial, and Age) with 2 rows of data. This example is explained in detail in the `Props` section below.

```jsx
import { createColumnHelper } from '@tanstack/react-table';
import Table from "../../../components/Table";

export default function Example(props) {
  const exampleColumns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('middle-initial', {
      cell: info => info.getValue(),
      header: "Initial",
    }),
    columnHelper.accessor('age', {
      cell: info => Number(info.getValue()),
    }),
  ];

  return (
    <div className="pt-4">
      <h2 className="pt-4 text-2xl font-medium">Example Table</h2>
      <Table
        columns={exampleColumns}
        data={
          [
            {
              "name": "John Doe",
              "middle-initial": "A",
              "age": 49,
            },
            {
              "name": "Jane Doe",
              "middle-initial": "Z",
              "age": 23,
            },
          ]
        }
        initialSortState={
          [
            { 
              "id": "name", 
              "desc": true, 
            }, 
            { 
              "id": "age", 
              "desc": false, 
            },
          ]
        }
      >
      </Table>
    </div>
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                | Type       | Default                       | Description                 |
| ------------------- | ---------- | ----------------------------- | --------------------------- |
| `columns`           | `object`   | See explanations below.       | See explanations below.     |
| `data`*             | `object`   | See explanations below.       | See explanations below.     |
| `initialSortState`  | `object`   | See explanations below.       | See explanations below.     |

#### `columns`

There are two critical pieces of information that are needed to build our table. (1) What columns the table needs to display. (2) The data that should be displayed in the body of the table. The `columns` prop is the former of these two.

**You need to pass an array of objects (each object representing a column in the table) into the `columns` prop. If no value is passed into `columns`, then a default set of columns will be displayed in the table. These default columns are listed in `defaultColumns` which defined in `/components/Table/index.js`.**

An example value for `columns` could be:

```jsx

import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const exampleColumns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('middle-initial', {
    cell: info => info.getValue(),
    header: "Initial",
  }),
  columnHelper.accessor('age', {
    cell: info => Number(info.getValue()),
  }),
];
```

Passing `exampleColumns` into the `columns` prop would result in a table with three columns (one for `name`, one for `middle-initial`, and one for `age`).

Each column definition (each object in the `exampleColumns` array) is used to customize that particular column in the table. This API is very well defined here: [https://tanstack.com/table/v8/docs/guide/column-defs](https://tanstack.com/table/v8/docs/guide/column-defs). **A critical part of understanding how these column definitions work is to know that each row in the table is actually just a JSON object (more on this below in the section below).***

Each column definition ***must have*** an `accessor` property. This tells the column what property to grab in the underlying JSON object for that row. For example, the accessor `name` in our `exampleColumns` tells that column to look for the `name` property in the JSON object when it is rendering that specific row. 

The `cell` property allows us to modify how we display that underlying information. For example, the `age` property is a number, so instead of simply returning the underling String data (`info.getValue()`) we can pass that JSON data into the `Number` constructor to parse our string value back into a number. This comes in handy when your underling data is a Date, and you want to display an actual Date String. 

The `header` property allows us to modify the name of the header for that column. For example, the accessor for the column that displays the middle initial is `middle-initial`. That would look pretty weird as our column name, so by supplying `header: "Initial",`, the column name will be displayed as `"Initial"`. 

There are **many** additional properties for these column definitions. We can apply custom filters, filtering functions, etc. There are some examples of this in `/pages/wcc/leaderboard/index.js`. If you are looking for something specific, the documentation for these column definitions is found here: [https://tanstack.com/table/v8/docs/guide/column-defs](https://tanstack.com/table/v8/docs/guide/column-defs).

#### `data`

There are two critical pieces of information that are needed to build our table. (1) What columns the table needs to display. (2) The data that should be displayed in the body of the table. The `data` prop is the latter of these two.

**You need to pass an array of objects (each object representing a row in the table) into the `data` prop. These objects should have the same properties but with different values. If no value is passed into `data`, then a default value of `[]` will be set of `data` and there will be no rows of data displayed in the table.***

An example value for `data` could be:

```jsx
const exampleData = [
  {
    "name": "John Doe",
    "middle-initial": "A",
    "age": 49,
  },
  {
    "name": "Jane Doe",
    "middle-initial": "Z",
    "age": 23,
  },
];
```

Passing `exampleData` into the `data` prop would create a table with 2 rows. As you can see, each object has the same number of properties, with the same name, and each property name matches with a corresponding column's `accessor` name in the column definition (shown in the above section).

#### `initialSortState`

The `Table` component supports sorting columns. If you want to have your table have column(s) sorted by default, you can do that. 

This is done by passing an array of objects into the `initialSortState`. Each object in the array is to represent the column that you want to sort by, and the order in which you order those objects will determine in which order the columns are sorted. 

An an example value for `initialSortState`:

```jsx
const exampleInitialSortState = [
  { 
    "id": "name", 
    "desc": true, 
  }, 
  { 
    "id": "age", 
    "desc": false, 
  },
];
```

Each object has a `id` property which corresponds to the column that you want to sort on. Each object also has a `desc` property which can be `true` or `false`. This will determining if that particular column should be sorted in descending order or not. Based on this `exampleInitialSortState`, our data would first be sorted by the `name` column in descending order, and if any two rows has the same value of the `name` column they would then be sorted by `age` in ascending order.

### General Guidelines & Recommendations

- This `Table` component was built with the `@tanstack/react-table` library. [https://tanstack.com/table/v8](https://tanstack.com/table/v8). 
  - Documentation for this library can be found here: [https://tanstack.com/table/v8/docs/guide/introduction](https://tanstack.com/table/v8/docs/guide/introduction)

## Related Components

N/A