import * as React from 'react';

import { useRaces, Course } from './useRaces';

const GenerateTable: React.FunctionComponent = (course: Course) => {

  const races = useRaces();

  return (
    <div>
      <h2>Timetrial Results</h2>
      {
//        races.season.filter(
//          (season) => course === null || course === season.course
//        ).map
      }
    </div>
  );
};

export default GenerateTable;

