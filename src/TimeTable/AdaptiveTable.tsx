import React, { FunctionComponent, useState, useEffect } from 'react';
import PCTimeTable from './PCTimeTable';
import MobileTimeTable from './MobileTimeTable';

interface IProps {
  data: string[][][];
  activeDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  pairWeekNumber: 0 | 1;
  pairActiveDay: number;
  pairActiveNumber: number;
  activeWeek: number;
  weekNumber: 0 | 1;
}

const AdaptiveTable: FunctionComponent<IProps> = ({
  data,
  activeDay,
  pairWeekNumber,
  pairActiveDay,
  pairActiveNumber,
  activeWeek,
  weekNumber,
}: IProps) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    window.addEventListener('resize', updateOnResize);

    return () => window.removeEventListener('resize', updateOnResize);

    function updateOnResize() {
      setDesktop(window.innerWidth >= 768);
    }
  }, []);

  return (
    <div>
      {isDesktop ? (
        <PCTimeTable
          data={data}
          activeDay={activeDay}
          pairWeekNumber={pairWeekNumber}
          pairActiveDay={pairActiveDay}
          pairActiveNumber={pairActiveNumber}
          activeWeek={activeWeek}
          weekNumber={weekNumber}
        />
      ) : (
        <MobileTimeTable
          data={data}
          activeDay={activeDay}
          pairWeekNumber={pairWeekNumber}
          pairActiveDay={pairActiveDay}
          pairActiveNumber={pairActiveNumber}
          activeWeek={activeWeek}
          weekNumber={weekNumber}
        />
      )}
    </div>
  );
};

export default AdaptiveTable;
