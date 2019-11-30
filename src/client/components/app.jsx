import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpcomingSeasons from './upcoming-seasons';
import Header from '../container/header';

export default function App(props) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" render={props => <UpcomingSeasons {...props} />}/>
      </Switch>
    </Router>
  );
}
