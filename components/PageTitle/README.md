# Page Title Component

The Page Title can be used to display the page name in the fancy purple gradient with `Minnesota Computer Club` displayed underneath it.

## Usage

The example below would display `About Us` in the fancy, large purple gradient text with `Minnesota Computer Club` displayed underneath it.

```jsx
import PageTitle from '/components/PageTitle';

export default function Example(props) {
  return (
    <div className="text-center mb-4">
      <PageTitle title={"About Us"}></PageTitle>
    </div>
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default   | Description                                                                        |
| ---------------------- | ----------| --------- | ---------------------------------------------------------------------------------- |
| `title`*               | `string`  | ``        | The name of the page or the post that the Page Title component is being placed on.      


### Additional Usage Information

N/A

### General Guidelines & Recommendations

- The value of the `title` prop should match the title of the page name. This will help keep things consistent and provide consistent metadata to search engines.

## Related Components

N/A