import React, { FunctionComponent, useState, useEffect } from 'react';
import { setInterval } from 'timers';
import data from '../data.json';
import AdaptiveTimeTable from './AdaptiveTable';

const TimeTable: FunctionComponent = () => {
  const date = new Date();
  const [weekNumber, setWeekNumber] = useState(
    (getWeekNumber(date) % 2) as 0 | 1
  );
  const [dayNumber, setDayNumber] = useState(
    ((date.getDay() + 6) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6
  );
  const pair = selectPair(weekNumber, dayNumber, getNumberOfPair(date), data);
  const [pairWeekNumber, setPairActiveWeekNumber] = useState(pair[0]);
  const [pairActiveDay, setPairActiveDay] = useState(pair[1]);
  const [pairActiveNumber, setPairActiveNumber] = useState(pair[2]);

  useEffect(() => {
    const interval = setInterval(update, 10_000);

    function update() {
      const date = new Date();
      setWeekNumber((getWeekNumber(date) % 2) as 0 | 1);
      setDayNumber(((date.getDay() + 6) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6);
      const [pairWeekNumber, pairActiveDay, pairActiveNumber] = selectPair(
        weekNumber,
        dayNumber,
        getNumberOfPair(date),
        data
      );
      setPairActiveWeekNumber(pairWeekNumber);
      setPairActiveDay(pairActiveDay);
      setPairActiveNumber(pairActiveNumber);
    }

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      <h2 className="text-center">Перший тиждень</h2>

      <AdaptiveTimeTable
        data={data[0]}
        activeDay={dayNumber}
        activeWeek={weekNumber}
        weekNumber={0}
        pairActiveDay={pairActiveDay}
        pairActiveNumber={pairActiveNumber}
        pairWeekNumber={pairWeekNumber}
      />
      <h2 className="text-center">Другий тиждень</h2>

      <AdaptiveTimeTable
        data={data[1]}
        activeDay={dayNumber}
        activeWeek={weekNumber}
        weekNumber={1}
        pairActiveDay={pairActiveDay}
        pairActiveNumber={pairActiveNumber}
        pairWeekNumber={pairWeekNumber}
      />
    </div>
  );
};

function getWeekNumber(d: Date) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  // Return array of year and week number
  return Math.ceil(((Number(d) - Number(yearStart)) / 86400000 + 1) / 7);
}

function getNumberOfPair(date: Date): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const endOfPair = [1000, 1200, 1355, 1550, 1745, 2005, 2155];
  const time = date.getHours() * 100 + date.getMinutes();
  for (let i = 0; i < endOfPair.length; i++) {
    if (time < endOfPair[i]) return i as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
  return endOfPair.length as 7;
}

function selectPair(
  weekNumber: 0 | 1,
  dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  pairNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  data: string[][][][]
): [0 | 1, number, number] {
  while (!getPairLength(data, weekNumber, pairNumber, dayNumber)) {
    pairNumber++;
    if (pairNumber > 6) {
      pairNumber = 0;
      dayNumber++;
      if (dayNumber > 5) {
        dayNumber = 0;
        weekNumber = ((weekNumber + 1) % 2) as 0 | 1;
      }
    }
  }
  return [weekNumber, dayNumber, pairNumber];
}

function getPairLength(
  data: string[][][][],
  weekNumber: 0 | 1,
  pairNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  dayNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6
): number {
  try {
    return data[weekNumber][pairNumber + 1][dayNumber + 1].length;
  } catch (error) {
    return 0;
  }
}

export default TimeTable;
