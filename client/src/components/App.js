import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import Navigation from './Navigation';

function App() {
  return (
    <div className="container my-4">
      <BrowserRouter>
      <Navigation></Navigation>
        <Switch>
          <Route path='/' exact component={Home} ></Route>
          <Route path='/login' component={Login} ></Route>
          <Route path='/registration' component={Registration} ></Route>
          <Route path='/dashboard' component={Dashboard} ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
