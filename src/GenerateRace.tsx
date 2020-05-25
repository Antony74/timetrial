import * as React from 'react';

import { useRaces } from './useRaces';

const GenerateRace: React.FunctionComponent = () => {

  const races = useRaces();
  const allRaces = races.allRaces().map((value, index) => ({...value, index}));

  const [state, setState] = React.useState({date: null});

  if (!allRaces.length)
    return <div></div>;

  const raceIndex = allRaces
  .filter(someRace => someRace.date === state.date)
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
              <td>{prevDate ? <a href='#' onClick={() => {setState({date: prevDate});}}>Previous</a>:''}</td>
              <td>{nextDate ? <a href='#' onClick={() => {setState({date: nextDate});}}>Next</a>:''}</td>
            </tr>
          ]}
        </tbody>
      </table>
    </div>
  );
};

export default GenerateRace;
