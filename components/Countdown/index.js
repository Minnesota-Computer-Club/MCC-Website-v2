// Import required dependencies.
import { intervalToDuration, isWithinInterval, startOfTomorrow } from 'date-fns';
import * as React from 'react';

// An object that will be used to store the remaining time between our start and end dates.
const defaultRemainingTime = {
  years: -1,
  months: -1,
  days: -1,
  hours: -1,
  minutes: -1,
  seconds: -1,
};

// An object that stores our mappings of abbreviations for our countdown components.
const suffixesForCountdown = {
  years: 'Y',
  months: 'M',
  days: 'D',
  hours: 'H',
  minutes: 'm',
  seconds: 's',
};

// Calculate the time between our start and end date.
const timeBetweenDates = (startDate, endDate, options) => {
  // If no startDate is supplied, the current datetime is used.
  if (!startDate) {
    startDate = new Date();
  }

  // If no endDate is supplied, the current datetime is used.
  if (!endDate) {
    endDate = new Date();
  }

  // If no options are supplied, then none will be passed.
  if (!options) {
    options = {};
  }

  // Attempt to get the interval between our start and end date, and if we encounter a RangeError (https://date-fns.org/v2.29.3/docs/intervalToDuration#exceptions),
  // then return our placeholder time remaining of -1 to signify an error has occurred.
  try {
    let durationRemaining = intervalToDuration({ start: startDate, end: endDate })
    // NOTE(mweiner): date-fns appears to no longer set the `seconds` field if there are 0 seconds.
    // We want to always display 00s on our countdown, so we will ensure this field is always set.
    if ( durationRemaining["seconds"] == null) {
      durationRemaining.seconds = 0
    }
    return (durationRemaining);
  } catch {
    return defaultRemainingTime;
  }
};

// A helper function to ensure that the startDate and endDate the user supplied forms a valid date range.
// If a startDate or endDate is not supplied, the current datetime is used.
const countdownIsValid = (startDate, endDate, timeLeft) => {
  try {
    // NOTE(mweiner): date-fns does not appear to check validity of the range
    // inside their `isWithinInterval` function. We need to check for them.
    const startTime = startDate || new Date()
    const endTime = endDate || new Date()
    if (endTime.getTime() <= startTime.getTime()) {
      return false
    }

    const validInterval = isWithinInterval(new Date(), { start: startTime, end: endTime });
    const intervalHasBeenCalculated = Object.values(timeLeft).every(item => item >= -1);
    return validInterval && intervalHasBeenCalculated;
  } catch {
    return false;
  }
};

const Countdown = (props) => {
  // The time remaining (displayed to user) will be tracked in React State.
  const [timeLeft, setTimeLeft] = React.useState(defaultRemainingTime);

  // On first load of our component, supply the difference between the startDate and endDate.
  React.useEffect(() => {
    setTimeLeft(timeBetweenDates(props.startDate || new Date(), props.endDate || startOfTomorrow(), props.dateOptions));
  }, [props.startDate, props.endDate, props.dateOptions]);

  // Update our state containing our time remaining between the startDate and endDate every 1 second.
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeBetweenDates(props.startDate || new Date(), props.endDate || startOfTomorrow(), props.dateOptions));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="mb-4 md:mb-0">
      <span className="font-bold">{props.prefix || 'Countdown'}</span>
      <span>{props.divider || ': '}</span>

      {
        countdownIsValid(props.startDate || new Date(), props.repeatUntil || props.endDate || new Date(), timeLeft) ?
          Object.keys(timeLeft).map((key) => (

            // Only display countdown elements whose value is not 0 (except for seconds).
            timeLeft[key] !== -1 && (timeLeft[key] !== 0 || key == 'seconds') ?
              <span className={key} key={key}>
                <span>
                  {
                    // Pad hours, minutes, and seconds countdown elements so they always have 2 digits.
                    key == 'seconds' || key == 'minutes' || key == 'hours' ? timeLeft[key].toString().padStart(2, 0) : timeLeft[key]
                  }
                </span>
                <span>{suffixesForCountdown[key]}</span>
                {
                  // Allow seconds to hit 00.
                  key !== 'seconds' ? <span>{props.dateSeparator || ', '}</span> : <span></span>
                }
              </span>
              :
              // Display empty span for countdown elements whose countdown is 0 (e.g. 0 yrs, or 0 mths.).
              <span key={key}></span>
          ))
          :
          // Display the `endMessage` if the date range is not valid or if the `endDate` has passed.
          <>
            <span>{props.endMessage || 'The countdown has ended.'}</span>
          </>
      }
    </div>
  );
};

export default Countdown;