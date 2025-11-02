# Badge Component

Badges should be used to complement additional information or bring attention to important information. They are pill shaped with an accent indicator in the shape of a circle to bring attention to the information contained in the badge.

## Usage

```jsx
import Badge from "../../../components/Badge";

export default function Example() {
  return (
    <Badge msg={"Your message to display in the badge."}></Badge>
  );
}
```

### Props

**Required props are marked with `*`.**

| Name         | Type     | Default   | Description                                                                        |
| ------------ | -------- | --------- | ---------------------------------------------------------------------------------- |
| `color`      | `string` | `"yellow"`| The color of the badge and the text within the badge.                              |
| `msg`        | `string` | `""`      | The message that will be displayed in the badge.                                   |

### Additional Usage Information

#### Expanding `color` Prop
The `color` prop **does not** have an unlimited number of colors. Valid color choices can be found within the `colors` array that is defined within `/components/Badge/index.js`. The current possible options are `"green"`, `"red"`, or `"yellow"`.

As an example, if you wanted to add a purple color scheme to the badge component you would need to add the following object to the `colors` array that is defined within `/components/Badge/index.js`.

```js
"purple": {
	"background": "bg-purple-100",
	"text": "text-purple-800",
},
```

Any valid Tailwinds CSS Color [(https://tailwindcss.com/docs/customizing-colors)](https://tailwindcss.com/docs/customizing-colors) could be added as a color scheme for our badge component.

### General Guidelines & Recommendations

- The value passed into the `msg` prop to display within the badge should be short and to the point.

## Related Components

N/A