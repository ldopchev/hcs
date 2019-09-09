import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import User from './components/User';

function App() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path='/' component={User}></Route> 
        <Route exact path='/login' component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );

}

export default App;
