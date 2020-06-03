import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

import GenerateRace from './GenerateRace';

class Params {
  dd: string;
  mm: string;
  yyyy: string;
}

export const Race: React.FunctionComponent<RouteComponentProps<Params>> = (props: RouteComponentProps<Params>) => {
  const {dd, mm, yyyy} = props.match.params;
  return <GenerateRace date={`${dd}/${mm}/${yyyy}`}></GenerateRace>;
};

export default Race;

