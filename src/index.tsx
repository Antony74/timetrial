import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './header';
import GenerateRace from './GenerateRace';
import Summer from './Summer';

const FrontPage: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Wallingford Timetrial</h1>
      <p>
          The time trial is held on Fridays and starts at the front gate at about 12:30, just turn up,
          all standards are welcome.  Runners are set off based on their previous timetrial with the aim
          of everyone finishing at the same time.
      </p>
      <p>
          Remember to bring a digital watch with you so you can time yourself,
          the exact start and finish are when you cross the entrance out of and in to HR, respectively.
      </p>

      <h2>Rules</h2>
      <li>If you need to overtake on the towpath, shout out &quot;mind your backs,&quot; the person in front must give way</li>
      <li>No short cuts allowed</li>

      <br/>

      <h2>Most Recent Timetrial</h2>
      <GenerateRace></GenerateRace>
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

