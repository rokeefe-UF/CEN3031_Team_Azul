import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import SignUp from "./views/SignUp/SignUp";
import SignUp2 from "./views/SignUp/SignUp2";
import Admin from "./views/Admin/Admin"
import LoginWithGoogle from "./views/SignUp/LoginWithGoogle";
import User from "./views/SignUp/User";
import axiosPath from './axiosRequests';
import Login from "./views/SignUp/Login";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/LogIn" component={Login} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignUp2" component={SignUp2} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/User" component={User} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

//example to get and have it run async
const log = async () => {
  console.log('calling');
  let result = await axiosPath.makeGetRequest('personal/');
  console.log(result);
  result = await axiosPath.makeGetRequest('horoscopeInfo/');
  console.log(result);
};

//log.apply();



export default App;
