# Countdown Component

Countdowns should be used when we want to display a countdown to a specific time for our users. We might want to countdown to a start time or the time that a puzzle unlocks. The Countdown component handles automatically determining if years, months, days, hours, minutes, and/or seconds should be displayed in the countdown based on how much time their is between your start and end time.

## Usage

The following example would display a continuous countdown from the current datetime to Friday, December 1, 2023 6:00:01 AM GMT-06:00. The countdown would display something like: `WCC 2023 Starts In: 12d, 6h, 3m, 2s`. After Friday, December 1, 2023 6:00:01 AM GMT-06:00, the countdown would display our `endMessage` of `"The 2023 WCC has begun."`, so the countdown component would display `WCC 2023 Starts In: The 2023 WCC has begun.`.

```jsx
import { fromUnixTime } from 'date-fns';
import Countdown from "/components/Countdown";

export default function Example() {
  return (
    <Countdown
      prefix="WCC 2023 Starts In"
      endDate={fromUnixTime(1701410401)}
      endMessage="The 2023 WCC has begun."
    />
  );
}
```

The following example would display a repetitive countdown from the current datetime to midnight the next day. (***Note***: `getPuzzleDate()` calculates and returns the Unix Epoch of 12:00:01 AM midnight EST of the next day since that is when the AoC puzzles release.) This countdown would repeat until Sunday, December 25, 2022 6:00:01 AM GMT-06:00 which is the equivalent of the Unix Epoch in the `repeatUntil` prop. After Sunday, December 25, 2022 6:00:01 AM GMT-06:00, the countdown would display our `endMessage` of `"Advent of Code 2022 has ended."`, so the countdown component would display `Next AOC Puzzle Unlocks In: Advent of Code 2022 has ended.`.

```jsx
import { fromUnixTime } from 'date-fns';
import Countdown from "/components/Countdown";
import { getPuzzleDate } from "/components/LeaderboardTable/utils";

export default function Example() {
  return (
    <Countdown
      prefix="Next AOC Puzzle Unlocks In"
      endDate={getPuzzleDate()}
      repeatUntil={fromUnixTime(1671948001)}
      endMessage="Advent of Code 2022 has ended."
    />
  );
}
```

### Props

**Required props are marked with `*`.**

| Name          | Type     | Default                       | Description                                                                        |
| ------------- | -------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `prefix`      | `string` | `"Countdown"`                 | The message displayed to the left of our countdown.                                |
| `divider`     | `string` | `": "`                        | The symbol that separates our `prefix` from the actual countdown element.          |
| `startDate`*  | `Date`   | `new Date()`                  | The start datetime of our countdown.                                               |
| `endDate`*    | `Date`   | `new Date()`                  | The end datetime of our countdown.                                                 |
| `repeatUntil` | `Date`   | ``                            | Repeats the countdown from the `startDate` to the `endDate` until `repeatUntil`.   |
| `endMessage`  | `string` | `"The countdown has ended."`  | The message displayed once the `repeatUntil` or `endDate` have passed.             |
| `dateOptions` | `Object` | `{}`                          | Can be used to pass metadata or additional options into our component.             |


### Additional Usage Information

#### Providing Dates to `startDate` and `endDate` Props
It is easiest to create dates using Unix Epochs when passing dates to `startDate` and `endDate` since the Unix Epoch is timezone agnostic and is just an integer. `date-fns` has a handy helper function (`fromUnixTime()` - [https://date-fns.org/v2.29.3/docs/fromUnixTime](https://date-fns.org/v2.29.3/docs/fromUnixTime)) to convert from Unix Epoch to a `Date` object.

The following website makes it trivial to find the exact Epoch of the date and time you want: [https://www.epochconverter.com](https://www.epochconverter.com)

#### Purpose of `dateOptions` Prop
Some of the `date-fns` functions (e.g. [https://date-fns.org/v2.29.3/docs/formatDistanceToNow](https://date-fns.org/v2.29.3/docs/formatDistanceToNow)) have an `options` parameter. This `dateOptions` was intended to be used to pass these options around if one of these `date-fns` functions were to ever be needed int he future. 

If other metadata needs to be fed into a function, this prop could be used to accomplish that.

More likely than not, you should never need to use this `dateOptions` parameter.

### General Guidelines & Recommendations

- It is easiest to create dates using Unix Epochs when passing dates to `startDate` and `endDate` since the Unix Epoch is timezone agnostic and is just an integer. `date-fns` has a handy helper function (`fromUnixTime()` - [https://date-fns.org/v2.29.3/docs/fromUnixTime](https://date-fns.org/v2.29.3/docs/fromUnixTime)) to convert from Unix Epoch to a `Date` object. (YES, THIS IS REPEATED. IT IS IMPORTANT.)

## Related Components

N/A