import { useState } from 'react';
import xml2js from 'xml2js';

export interface RaceDetail {
  runnername: [string],
  time: [string]
}

export interface Race {
  date: string,
  racedetail: RaceDetail[]
}

export interface RaceWithCourse extends Race {
  course: string;
}

export type Course = 'Summer' | 'Winter' | 'alternative Summer';

export interface Season {
  course: Course,
  race: Race[]
}

export interface Races {
  runners: string[];
  season: Season[];
}

let races: Races = {
  runners: [],
  season: []
};

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

const allRaces = (): RaceWithCourse[] => {
  return races.season.reduce((acc, season) => {
    return [...acc, ...season.race.map(race => ({...race, course:season.course}))];
  }, []);
};

interface Hook extends Races {
  allRaces(): RaceWithCourse[];
}

export const useRaces = (): Hook => {

  const [state, setState] = useState({...races});

  if (!allRaces().length) {
    racesPromise.then(() => {
      setState({...races});
    });
  }

  return {...state, allRaces};
};


