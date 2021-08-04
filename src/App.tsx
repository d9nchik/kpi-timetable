import React, { FunctionComponent } from 'react';
import './App.css';
import TimeTable from './TimeTable/TimeTable';

const App: FunctionComponent = () => {
  return (
    <div>
      <h1 className="text-center">Розклад занять</h1>
      <TimeTable />
    </div>
  );
};

export default App;
