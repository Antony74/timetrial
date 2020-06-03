import * as React from 'react';
import { Link } from 'react-router-dom';

import { useRaces } from './useRaces';

class GenerateRaceProps {
  date: string;
}

const GenerateRace: React.FunctionComponent<GenerateRaceProps> = (props: GenerateRaceProps) => {

  const races = useRaces();
  const allRaces = races.allRaces().map((value, index) => ({...value, index}));

  if (!allRaces.length)
    return <div></div>;

  const raceIndex = allRaces
  .filter(someRace => someRace.date === props.date)
  .reduce((_, value) => value.index, allRaces.length - 1);

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
              <td>{prevDate ? <Link to={`/Race/${prevDate}`}>Previous</Link> : ''}</td>
              <td>{nextDate ? <Link to={`/Race/${nextDate}`}>Next</Link> : ''}</td>
            </tr>
          ]}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateRace;
