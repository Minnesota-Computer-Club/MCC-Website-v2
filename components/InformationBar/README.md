# Information Bar Component

The Information Bar component should be used when you want to explicitly call attention to a piece of information within the page's content. The information bar is blue, with a blue information icon, your message, and includes a link on the right-hand side of the bar.

## Usage

The following example would create an information bar that reads `Minnesota Computer Club is not associated with Advent of Code. All puzzles are property of Advent of Code.` with a link to the right that says `View Advent of Code` that would link to `https://adventofcode.com`.

```jsx
import InfoBar from '/components/InformationBar';

export default function Example(props) {
  return (
    <InfoBar
      msg="Minnesota Computer Club is not associated with Advent of Code. All puzzles are property of Advent of Code."
      href="https://adventofcode.com"
      linkLabel="View Advent of Code"
    >
    </InfoBar>
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default                       | Description                                                                        |
| ---------------------- | ----------| ----------------------------- | ---------------------------------------------------------------------------------- |
| `msg`*                 | `string`  | ``                            | The message content to display in the information bar.                             |
| `linkLabel`*           | `string`  | ``                            | The label for your link that is displayed on the right-hand side of the bar.       |
| `href`*                | `string`  | ``                            | The URL that you link will take users too.                                         |


### Additional Usage Information

N/A

### General Guidelines & Recommendations

- The style of the Information Bar is blue to bring attention to it. A color choice of red or yellow would be a poor choice because we aren't trying to warn the user. We simply want to bring dedicated attention to a piece of information. 
- Keep your `msg` short and to the point.
- All links will be opened in a new tab.

## Related Components

N/A