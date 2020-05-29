import * as React from 'react';

import { useRaces, Course } from './useRaces';

interface GenerateTableProps {
  course: Course;
}

const GenerateTable: React.FunctionComponent = (props: GenerateTableProps) => {

  const races = useRaces();

  return (
    <div>
      <h2>Timetrial Results</h2>
      {
        races.season.filter(
          (season) => props.course === null || props.course === season.course
        ).map(season => {
          return (
            <li key={season.race[0].date}>
              {`${season.race[0].date} switch to ${season.course}`}
            </li>
          );
        })
      }
    </div>
  );
};

export default GenerateTable;

