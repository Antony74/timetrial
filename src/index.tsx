import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './header';

const App: React.FunctionComponent = () => (
  <HashRouter>
    <Header></Header>
    <Switch>
      <Route path='/Summer'>Summer!</Route>
      <Route path='*'>App works!</Route>
    </Switch>
  </HashRouter>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

