import React, { Fragment, useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import "./App.css"
import AlertComponent from './components/layout/alertcomponent'
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Landing from './components/layout/landing/landing';
import Navbar from './components/layout/navbar/navbar'
import Dashboard from './components/dashboard/dashboard'
import PrivateRoute from './components/routing/privateroute'
import Addexperiance from './components/profileforms/addexperiance';
import Addeducation from './components/profileforms/addeducation';
import Profileform from './components/profileforms/profileform';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/profile';
import Posts from './components/posts/posts';
import Userposts from './components/posts/userposts';

// redux stuff
import {Provider} from 'react-redux';
import store from './store'
import {LoadUser} from './actions/auth'
import SetAuthToken from './utils/setauthtoken';

if(localStorage.token){
  SetAuthToken(localStorage.token);
}

function App() {

useEffect(()=>{
  store.dispatch(LoadUser())
},[]);

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Fragment>
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <div className='AlertComponent'>
        <AlertComponent/>
        </div>
      <section className="container">
        <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile/:id" component={Profile}/>
        <Route exact path="/profiles" component={Profiles}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/create_profile" component={Profileform}/>
        <PrivateRoute exact path="/edit_profile" component={Profileform}/>
        <PrivateRoute exact path="/add_education" component={Addeducation}/>
        <PrivateRoute exact path="/add_experiance" component={Addexperiance}/>
        <PrivateRoute exact path="/posts" component={Posts}/>
        <PrivateRoute exact path="/userposts" component={Userposts}/>
        </Switch>
      </section>
      {/* <Landing/> */}
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <Profileform/> */}
      {/* <Addexperiance/> */}
      {/* <Addeducation/> */}
    </Fragment>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
