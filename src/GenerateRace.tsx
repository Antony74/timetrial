import * as React from 'react';

import { useRaces } from './useRaces';

const GenerateRace: React.FunctionComponent = (date: string) => {

  const races = useRaces();

//  console.log(races);

  return <div></div>;
};

export default GenerateRace;
