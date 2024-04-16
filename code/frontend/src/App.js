import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import View from './components/View';
import Edit from './components/Edit';

function App() {
  let isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/view">
          {isLoggedIn ? <View /> : <Redirect to="/signin" />}
        </Route>
        <Route path="/edit">
          {isLoggedIn ? <Edit /> : <Redirect to="/signin" />}
        </Route>

        <Redirect to="/signin" />
      </Switch>
    </Router>
  );
}

export default App;
