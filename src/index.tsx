import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './header';
import GenerateRace from './GenerateRace';
import Summer from './Summer';
import AltSummer from './AltSummer';
import Winter from './Winter';
import All from './All';
import Race from './Race';

const FrontPage: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Wallingford Timetrial</h1>
      <p>
          The time trial is held on Fridays and normally starts at the North gate of Howbery Park at about 12:30, just turn up,
          all standards are welcome.  Runners are set off based on their previous timetrials with the aim
          of everyone finishing at roughly the same time.
      </p>
      <p>
          Remember to bring something with you so you can time yourself (watch, phone, GPS device etc.).
          We usually start from the North gate of Howbery Park.
          We finish at the old south entrance to Howbery Park (the shut metal gate), about 75 m south of the main entrance.
      </p>

      <h2>Rules</h2>
      <li>If you need to overtake on the towpath, shout out &quot;mind your backs,&quot; the person in front must give way</li>
      <li>No short cuts allowed</li>
      <li>You may stop your watch if traffic prevents you from immediately crossing main roads</li>

      <br/>

      <h2>Most Recent Timetrial</h2>
      <GenerateRace date={null}></GenerateRace>
  </div>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Header></Header>
      <Switch>
        <Route path='/Summer'>
          <Summer></Summer>
        </Route>
        <Route path='/AltSummer'>
          <AltSummer></AltSummer>
        </Route>
        <Route path='/Winter'>
          <Winter></Winter>
        </Route>
        <Route path='/All'>
          <All></All>
        </Route>
        <Route path="/Race/:dd/:mm/:yyyy" component={Race}>
        </Route>
        <Route path='*'>
          <FrontPage/>
        </Route>
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

