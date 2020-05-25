import * as React from 'react';

import { useRaces, RaceWithCourse } from './useRaces';

const GenerateRace: React.FunctionComponent = (date: string) => {

  const races = useRaces();
  const allRaces: RaceWithCourse[] = races.allRaces();

  if (!allRaces.length)
    return <div></div>;

  const raceIndex = allRaces
  .filter(someRace => someRace.date === date)
  .reduce((_1, _2, index) => index, allRaces.length - 1);

  const race = allRaces[raceIndex];
  const prevDate = raceIndex > 0 ? allRaces[raceIndex - 1].date : null;
  const nextDate = raceIndex + 1 < allRaces.length ? allRaces[raceIndex + 1].date : null;

  return (
    <div>
      <h2>{race.date} - {race.course}</h2>
      <table className='singlerace'>
        <tbody>
          {[...race.racedetail.map((detail) => (
            <tr key={detail.runnername}>
              <td>{detail.runnername}</td>
              <td>{detail.time}</td>
            </tr>
            )),
            <tr key="prevnext">
              <td>{prevDate}</td>
              <td>{nextDate}</td>
            </tr>
          ]}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateRace;
