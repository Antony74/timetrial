import { useState } from 'react';
import xml2js from 'xml2js';

interface RaceDetail {
  runnername: [string],
  time: [string]
}

interface Race {
  date: string,
  racedetail: RaceDetail[]
}

interface Season {
  course: 'Summer' | 'Winter' | 'alternative Summer',
  race: Race[]
}

interface Races {
  runners: string[];
  season: Season[];
}

let races: Races = null;

const racesPromise = fetch('races.xml').then(response => {
  return response.text();
}).then(text => {
  return xml2js.parseStringPromise(text);
}).then(json => {

  races = {
    runners: json.RACES.RUNNERS[0].RUNNERNAME,
    season: json.RACES.SEASON.map((SEASON): Season => {
      return {
        course: SEASON.COURSE[0],
        race: SEASON.RACE.map((RACE): Race => {
          return {
            date: RACE.DATE[0],
            racedetail: RACE.RACEDETAIL.map((RACEDETAIL): RaceDetail => {
              return {
                runnername: RACEDETAIL.RUNNERNAME[0],
                time: RACEDETAIL.TIME[0]
              };
            })
          };
        })
      };
    })
  };

  return races;
});

export const useRaces = (): Races => {

  const [state, setState] = useState({
    runners: [],
    season: []
  });

  if (races === null) {
    racesPromise.then(() => {
      setState({...races});
    });
  }

  return state;
};

export default useRaces;

