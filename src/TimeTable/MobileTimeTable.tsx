import React, { FunctionComponent, useEffect } from 'react';

import { Table } from 'react-bootstrap';

interface IProps {
  data: string[][][];
  activeDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  pairWeekNumber: 0 | 1;
  pairActiveDay: number;
  pairActiveNumber: number;
  activeWeek: number;
  weekNumber: 0 | 1;
}

const MobileTable: FunctionComponent<IProps> = ({
  data,
  activeDay,
  pairWeekNumber,
  pairActiveDay,
  pairActiveNumber,
  weekNumber,
  activeWeek,
}: IProps) => {
  useEffect(() => {
    document
      .getElementsByClassName('table-warning')[0]
      .scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [pairWeekNumber, pairActiveDay, pairActiveNumber]);

  data = transponeData(data);
  const [head, ...body] = data;
  const modifiedBody = body.map(day =>
    day
      .map((info, infoIndex) => ({
        info: info.join(' '),
        headInfo: head[infoIndex].join(' '),
        infoIndex,
      }))
      .filter(({ info }) => info.length)
  );
  return (
    <div>
      {modifiedBody.map((day, dayIndex) => {
        const [head, ...body] = day;

        if (body.every(({ info }) => info.length === 0)) {
          return <div key={dayIndex} />;
        }

        return (
          <Table key={dayIndex} striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>{head.headInfo}</th>
                <th>{head.info}</th>
              </tr>
            </thead>
            <tbody>
              {body.map(({ info, headInfo, infoIndex }) => (
                <tr key={info + headInfo}>
                  <td>{headInfo}</td>
                  <td
                    className={
                      pairWeekNumber === weekNumber &&
                      dayIndex === pairActiveDay &&
                      pairActiveNumber + 1 === infoIndex
                        ? 'table-warning'
                        : dayIndex === activeDay && activeWeek === weekNumber
                        ? 'table-info'
                        : ''
                    }
                  >
                    {info}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      })}
    </div>
  );
};

function transponeData<E>(data: E[][]): E[][] {
  const transponed: E[][] = [];

  for (let i = 0; i < data[0].length; i++) {
    const tempArray: E[] = [];
    for (let j = 0; j < data.length; j++) {
      tempArray.push(data[j][i]);
    }
    transponed.push(tempArray);
  }
  return transponed;
}

export default MobileTable;
