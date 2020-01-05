import React, { useState, useMemo, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpcomingSeasons from './upcoming-seasons';
import SeasonPage from './season-page';
import axios from 'axios';
import Header from '../container/header';
import SignUp from './signup';
import AccountPage from './account-page';
import Login from './login';
import { UserContext } from '../context/user-context';
import { ThemeContext} from '../context/theme-context';
import EditSummaries from './edit-summaries';

export default function App(props) {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('userData')) || null);
  const [seasons, setSeasons] = useState(null);

  const getSeasons = async () => {
    const response = await axios.get('api/seasons');
    setSeasons(response.data.seasons);
  };

  useEffect(() => {
    getSeasons();
  }, []);

  const userProviderVal = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={userProviderVal}>
        <Header />
        <Switch>
          <Route exact path="/" render={props => <UpcomingSeasons {...props} seasons={seasons} />} />
          <Route exact path="/season/:id" render={props => <SeasonPage {...props} />} />
          <Route exact path="/edit/:id" render={props => <EditSummaries {...props} />} />
          <Route exact path="/signup" render={props => <SignUp {...props} />} />
          <Route exact path="/account" render={props => <AccountPage {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}
