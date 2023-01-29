// Import required dependencies.
import * as React from 'react';

// All filter inputs will be wrapped in this debounced component to reduce the number of reloads.
export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="w-full">
      <div className="mt-1">
        <input {...props} value={value} className="block p-1 w-full sm:text-sm dark:bg-slate-900" onChange={e => setValue(e.target.value)} />
      </div>
    </div>
  );
}