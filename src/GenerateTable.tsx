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

          const runnerMap = new Map<string, string>();

          season.race.forEach(race => race.racedetail.forEach(racedetail => {
            if (!runnerMap.has(racedetail.runnername)) {
              runnerMap.set(racedetail.runnername, ' ');
            }
          }));
        
          const runners = Array.from(runnerMap.keys()).sort();

          return (
            <div key={season.race[0].date}>
              <li>
                {`${season.race[0].date} switch to ${season.course}`}
                <table border="1"><tbody>
                  <tr>
                    <td>&nbsp;</td>
                    {
                      runners.map(runner => <td key={runner}>{runner}</td>)
                    }
                  </tr>
                  {
                    season.race.map(race => {
                      runners.forEach((key) => runnerMap.set(key, ' '));
                      race.racedetail.forEach(racedetail => runnerMap.set(racedetail.runnername, racedetail.time));

                      return (
                        <tr key={race.date}>
                          <td>{race.date}</td>
                          {
                            runners.map((key) =>
                              <td key={key}>
                                {runnerMap.get(key)}
                              </td>
                            )
                          }
                        </tr>
                      );
                    })
                  }
                </tbody></table>
                <br/>
              </li>
            </div>
          );
        })
      }
    </div>
  );
};

export default GenerateTable;

