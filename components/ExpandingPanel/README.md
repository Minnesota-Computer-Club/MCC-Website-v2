# Expanding Panel Component

The Expanding Panel component works great to display information like frequently asked questions or any other information you want to place into an expandable dropdown.

## Usage

The following example would great a single Expanding Panel with the title of `FAQs` above the panel, the panel label would read `How is the school wide competition scored?` and the paragraph would be the content within the panel when it was opened by a user.

```jsx
import ExpandingPanel from "../../../components/ExpandingPanel";

export default function Example(props) {
  return (
    {/* FAQ for School Competition Scoring */}
    <ExpandingPanel title="FAQs" label="How is the school wide competition scored?">
      <p>Schools are ranked by their total number of stars. Tie breaks will be done using the efficiency of the school's competitors. This can be calculated by taking the total number of stars earned by students in that school and dividing it by the total number of participants for the school. All competitors count as 1 participant for their school and each competitor's stars count equally towards their school's start total.</p>
    </ExpandingPanel>
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default                       | Description                                                                        |
| ---------------------- | ----------| ----------------------------- | ---------------------------------------------------------------------------------- |
| `title`                | `string`  | `""`                          | The content of a H2 tag that is displayed above the panel. Great for separating sections of expanding panels.  |
| `label`*               | `string`  | `""`                          | The label that is displayed on the panel that a user can click on to open the panel. |


### Additional Usage Information

#### Content of Expanding Panel
Any content that you want to display when the user clicks and expands a dropdown panel should be placed ***between*** the component tags.

### General Guidelines & Recommendations

- This component was built using a Headless UI `Disclosure` component. More documentation on that component can be found here: [https://headlessui.com/react/disclosure](https://headlessui.com/react/disclosure)

## Related Components

N/A