import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup.jsx';
import Activate from './screens/Activate.jsx';
import Profile from './screens/Profile.jsx';
import ForgetPassword from './screens/ForgetPassword.jsx';
import ResetPassword from './screens/ResetPassword.jsx';
import Subscription from './screens/Subscription';
import PrivateRoute from './Routes/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../src/screens/Home';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <Home {...props} />} />
      <Route path='/home' exact render={props => <Home {...props} />} />
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
