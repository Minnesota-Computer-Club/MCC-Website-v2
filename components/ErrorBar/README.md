# Error Bar Component

An error bar should be used when you want to display an error to the end user. This should be used to display errors that occurred that the user is not obviously aware of (i.e. backend processing of the leaderboard data failed and we couldn't update the leaderboard) while giving developers a hint as to what went wrong. This error bar is **not** dismissible by the user.

## Usage

The following example shows how you could conditionally display the Error Bar component based on passing a prop to the page or parent component. When the `error` object has a truthy value for its `errorStatus` property, the Error Bar is displayed to the user.

```jsx
import ErrorBar from "../../../components/ErrorBar";

export default function Example(props) {
  return (
    { props.error.errorStatus ? <ErrorBar errorCode={props.error.errorCode} errorMsg={props.error.errorMsg}></ErrorBar> : null }
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default                       | Description                                                                        |
| ---------------------- | ----------| ----------------------------- | ---------------------------------------------------------------------------------- |
| `error.errorStatus`    | `boolean` | `false`                       | A boolean flag tracking whether the Error Bar should be displayed.                 |
| `error.errorCode`      | `string`  | `""`                          | A string containing the error code for the error.                                  |
| `props.error.errorMsg` | `string`  | `""`                          | A string containing the error message that is desired.                             |


### Additional Usage Information

#### Minimum Error Bar
If you don't pass an `error.errorCode` or a `error.errorMsg`, then the Error Bar will display `Error: Please contact a website administrator in the MCC Discord server.`

#### `error` Prop
Note: This component assumes that you are passing the following prop:

```js
"error": {
  "errorStatus": false,
  "errorCode": 500,
  "errorMsg": "The server timed out."
}
```

This means that you could pass more information into this prop very easily and extend the Error Bar component to display more information.

### General Guidelines & Recommendations

- Remember, the user doesn't need to know every detail about an error. This component is mean to make end users aware and to give developers hints into what may hve gone wrong.

## Related Components

N/A