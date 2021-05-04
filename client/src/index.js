import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Activate from './components/Activate';
import Profile from './components/Profile';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Subscription from './components/Subscription';
import PrivateRoute from './routes/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../src/components/Home';
import Charts from '../src/components/Charts';
import Team from '../src/components/Team';
import Features from '../src/components/Features';
import Dashboard from '../src/components/Dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/urls/:url' exact render={props => <Charts {...props} />} />
      <Route path='/dashboard' exact render={props => <Dashboard {...props} />} />
      
      <Route path='/' exact render={props => <Home {...props} />} />
      <Route path='/home' exact render={props => <Home {...props} />} />
      <Route path='/team' exact component={Team} />
      <Route path='/features' exact component={Features} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/signup' exact render={props => <Signup {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />

      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <Route path='/auth/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path="/subscription" exact component={Subscription} />
      
      <PrivateRoute path="/profile" exact component={Profile} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
