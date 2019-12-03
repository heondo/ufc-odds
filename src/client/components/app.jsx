import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpcomingSeasons from './upcoming-seasons';
import SeasonPage from './season-page';
import Header from '../container/header';
import { UserContext } from '../context/user-context';

export default function App(props) {
  const [user, setUser] = useState(null);

  const userProviderVal = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <Header />
      <Switch>
        <UserContext.Provider value={userProviderVal}>
          <Route exact path="/" render={props => <UpcomingSeasons {...props} />} />
          <Route exact path="/season/:id" render={props => <SeasonPage {...props} />} />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}
