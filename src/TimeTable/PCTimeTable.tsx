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

const MyTable: FunctionComponent<IProps> = ({
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

  const [head, ...body] = data;
  return (
    <Table striped bordered hover>
      <thead className="table-dark">
        <tr>
          {head.map((item, index) => (
            <th key={item[0] + index}>{item[0]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, rowIndex) => (
          <tr key={String(row)}>
            {row.map((data, index) => (
              <td
                className={
                  pairWeekNumber === weekNumber &&
                  index - 1 === pairActiveDay &&
                  pairActiveNumber === rowIndex
                    ? 'table-warning'
                    : weekNumber === activeWeek && activeDay === index - 1
                    ? 'table-info'
                    : ''
                }
                key={String(data) + index}
              >
                {data.join(' ')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MyTable;
