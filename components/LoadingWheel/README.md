# Loading Wheel Component

The Loading Wheel is a spinning loading icon that should be used to inform the user the content is being loaded.

## Usage

The LoadingWheel will be most commonly used when data processing or fetching of an external API is required before data is displayed to the user. You will most likely use this component with a conditional render (as shown below).

```jsx
import LoadingWheel from "/components/LoadingWheel";
import * as React from 'react';

export default function Example(props) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
      // Do some sort of data manipulation.

      // When all data manipulation is done, update isLoading to hide the spinner.
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    {isLoading ?
      <LoadingWheel></LoadingWheel>
      :
      <div>
        No longer loading!
      </div>
    }
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default                       | Description                                                                        |
| ---------------------- | ----------| ----------------------------- | ---------------------------------------------------------------------------------- |


### Additional Usage Information

- It is most likely that you will want to conditionally render this component. This means that you will only want to show the <LoadingWheel> component until some condition is met, and then display your page content. The example usage above demonstrates a rudimentary example of this.

### General Guidelines & Recommendations

N/A

## Related Components

N/A