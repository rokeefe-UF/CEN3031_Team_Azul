import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";
import SignUp2 from "./SignUp2";
import './User.css';
import background from '../../assets/moonbackground.jpg';
import UserProfile from './UserState';
import  {GoogleLogin, GoogleLogout}  from 'react-google-login';
import config from './config.json';
import axiosPath from "../../axiosRequests";

import firebase from 'firebase';


const ColorButton = withStyles(theme => ({
    root: {
      borderRadius: 20,
      padding: '3px 10px',
      border: '1px solid',
      backgroundColor: '#E28222',
    '&:hover': {
      backgroundColor: '#C6721D',
      },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));
function User(props){
  UserProfile.getLocalStorageEmail();




  const classes = useStyles();
  const [newUser, setNewUser] = useState({
    name: '',
    pob: '',
    dob: '',
    email: null,
    tob: '',
    house:'',
    b:false,
    sign:''
});
  let p1=null;
  let p2='';
  let p3='';
  let p4='';
  let p5='';
  let p6='';
  let p7='';
  let p8='';
  let p9='';
  let p10='';
    
      useEffect(()=>{
    if(newUser.b){

      UserProfile.setEmail(null);
      UserProfile.setName('');
      UserProfile.loggingOut();
      UserProfile.setBirthday('');
      UserProfile.setHouse('');
      UserProfile.setLocalStorageHouse();
      UserProfile.setBirthplace('');
      UserProfile.setBirthTime('');
      UserProfile.setSign('');
      UserProfile.setLocalStorageBTime();
      UserProfile.setLocalStorageBDay();
      UserProfile.setLocalStorageBPlace();
      UserProfile.setLocalStorageEmail();
      UserProfile.setLocalStorageName();
      UserProfile.setLocalStorageisLoggedIn();
      UserProfile.setLocalStorageisLoggedInWithGoogle();
      UserProfile.setLocalStorageisLoggedInWithoutGoogle();
      UserProfile.setLocalStorageSign();
      



    }

  });

  let ret=false;
    
  const url = 'personal/'

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if(p1 !== null){
        const result = await axiosPath.makeGetRequest("personal/" + p1);
        setData(result);
      };
    }
      fetchData();
}, [])
const [st, newStat]=useState(0);
    
  if(props===undefined || props.location.state===undefined || props.location.state===null || props.location.state.user.email===undefined){
    p1=UserProfile.getLocalStorageEmail();
    p2=UserProfile.getLocalStorageName();
    p3=UserProfile.getLocalStorageBDay();
    p4=UserProfile.getLocalStorageBTime();
    p5=UserProfile.getLocalStorageBPlace();
    p6=UserProfile.getLocalStorageisLoggedIn();
    p7=UserProfile.getLocalStorageisLoggedInWithGoogle();
    p8=UserProfile.getLocalStorageisLoggedInWithoutGoogle();
    p9=UserProfile.getLocalStorageHouse();
    p10=UserProfile.getLocalStorageSign();
    UserProfile.getLocalStorageEmail();
    if(UserProfile.getLocalStorageEmail()!==null && UserProfile.getLocalStorageEmail()!=='' &&UserProfile.getLocalStorageEmail()!=='null'){
    UserProfile.loggedIn=true;
    }
    else
    ret=true;
  }
  else{
    p1=props.location.state.user.email;
    p2=props.location.state.user.name;
    p3=props.location.state.user.dob;
    p4=props.location.state.user.tob;
    p5=props.location.state.user.pob;
    p9=props.location.state.house;
    p10=props.location.state.sign;
    p6=true;
    UserProfile.loggedIn=true;
    if(p7===false){
    UserProfile.loggingInWithoutGoogle();
    UserProfile.setEmail(p1);
    UserProfile.setName(p2);
    UserProfile.setBirthplace(p5);
    UserProfile.setBirthTime(p4);
    UserProfile.setBirthday(p3);
    UserProfile.setHouse(p9);
    UserProfile.setSign(p10);
    UserProfile.setLocalStorageHouse();
    UserProfile.setLocalStorageBDay();
    UserProfile.setLocalStorageBPlace();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedIn();
    UserProfile.setLocalStorageisLoggedInWithoutGoogle();
    UserProfile.setLocalStorageBTime();
    UserProfile.setLocalStorageName();
    UserProfile.setLocalStorageSign();

    }
  else
    UserProfile.loggingInWithGoogle();
UserProfile.loggedIn=true;
  UserProfile.setEmail(p1);
  UserProfile.setName(p2);
  UserProfile.setBirthplace(p5);
  UserProfile.setBirthTime(p4);
  UserProfile.setBirthday(p3);
  UserProfile.setHouse(p9);
  UserProfile.setSign(p10);
  UserProfile.setLocalStorageHouse();
  UserProfile.setLocalStorageSign();
  UserProfile.setLocalStorageBDay();
  UserProfile.setLocalStorageBPlace();
  UserProfile.setLocalStorageEmail();
  UserProfile.setLocalStorageisLoggedIn();
  UserProfile.setLocalStorageisLoggedInWithoutGoogle();
  UserProfile.setLocalStorageBTime();
  UserProfile.setLocalStorageName();
    p7=props.location.state.g;
    p8=!p7;
  }



  

  newUser.name=p2;
  newUser.email=p1;
  newUser.dob=p3;
  newUser.tob=p4;
  newUser.pob=p5;
  newUser.house=p9;
  newUser.sign=p10;

  useEffect(() => {
    const fetchData = async () => {
      if(p1 !== null){
        const result = await axiosPath.makeGetRequest("personal/" + p1);
        setData(result);
      };
    }
      fetchData();
}, [])
 

if(ret)
return <Redirect to='/Home'/>



const renderTable = () => {
  if(data){
      var email=data.Email;
      var name='';
      var sign='';
      var house='';
      var time='';
      var bday='';
      var location='';
      var subscribed='';
      if(data.Name!==undefined && data.name!=='undefined')
      name=data.Name;
      if(data.Sign!==undefined && data.Sign!=='undefined')
      sign=data.Sign;
      if(data.House!==undefined && data.House!=='undefined')
      house=data.House;
      if(data.TimeOfBirth!==undefined && data.TimeOfBirth!=='undefined')
      time=data.TimeOfBirth;
      if(data.Birthday!==undefined && data.Birthday!=='undefined')
      bday = data.Birthday;
      if(data.LocationOfBirth!==undefined && data.LocationOfBirth!=='undefined')
      location = data.LocationOfBirth;
      if(data.Subscribed!==undefined && data.Subscribed)
      subscribed = 'yes';
      else
      subscribed='no';

      return(
      //<h1>{str}</h1>
      <div>
          <p style={{marginTop:20}}>Email: {email}</p>
          <p>Birthday: {bday}</p>
          <p>Birth Location: {location}</p>
          <p>Birth Time: {time}</p>
          <p>Sign: {sign}</p>
          <p>House: {house}</p>
          <p>Subscriber: {subscribed}</p>
      </div>
      
      )
  // return data.map(user => {
  // return (
  //     <tr key = {user._id}>
  //         <td>{user.Name}</td>
  //         <td>{user.Email}</td>
  //     </tr>
  // )
  // })
      }
}
const renderName = () => {
  if(data){
      if(data.Name!==undefined)
      var name=data.Name;

      return(
      //<h1>{str}</h1>
      <div>
        <p style={{fontSize:'45px'}}>Hi, Welcome {name}</p>
      </div>
      
      )
  // return data.map(user => {
  // return (
  //     <tr key = {user._id}>
  //         <td>{user.Name}</td>
  //         <td>{user.Email}</td>
  //     </tr>
  // )
  // })
      }
}
  if(p1===null && props===null && props.location.state===null&& props.location.state.user.email===null)
    return(<Redirect to="/Home"/>);
   UserProfile.getLocalStorageName();

    if(p7===false)
      UserProfile.loggingInWithoutGoogle();
    else
      UserProfile.loggingInWithGoogle();
UserProfile.loggedIn=true;
    UserProfile.setEmail(p1);
    UserProfile.setName(p2);
    UserProfile.setBirthplace(p5);
    UserProfile.setBirthTime(p4);
    UserProfile.setBirthday(p3);
    UserProfile.setHouse(p9);
    UserProfile.setSign(p10);
    UserProfile.setLocalStorageHouse();
    UserProfile.setLocalStorageSign();
    UserProfile.setLocalStorageBDay();
    UserProfile.setLocalStorageBPlace();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedIn();
    UserProfile.setLocalStorageisLoggedInWithoutGoogle();
    UserProfile.setLocalStorageBTime();
    UserProfile.setLocalStorageName();

      
    //if(newUser.name!==null && newUser.name.length===0)
      //  window.location.reload();


  function handle2(){
    UserProfile.loggedIn=false;
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 !== null) {
      
      
        auth2.signOut().then(
          auth2.disconnect().then(GoogleLogout.onLogoutSuccess)
        )
      }
        
      UserProfile.loggedIn=false;

  
      UserProfile.setEmail(null);
      UserProfile.setName('');
      UserProfile.loggingOut();
      UserProfile.setBirthday('');
      UserProfile.setBirthplace('');
      UserProfile.setBirthTime('');
      UserProfile.setHouse('');
      UserProfile.setSign('');
      let a={
          name: '',
          pob: '',
          dob: '',
          email: null,
          tob:'',
          house:'',
          b:true, 
          sign:''
          };
          setNewUser(a);
          newStat(3);
          UserProfile.loggedIn=false;
      UserProfile.setLocalStorageBTime();
      UserProfile.setLocalStorageHouse();
      UserProfile.setLocalStorageSign();
      UserProfile.setLocalStorageBDay();
      UserProfile.setLocalStorageBPlace();
      UserProfile.setLocalStorageEmail();
      UserProfile.setLocalStorageName();
      UserProfile.setLocalStorageisLoggedIn();
      UserProfile.setLocalStorageisLoggedInWithGoogle();
      UserProfile.setLocalStorageisLoggedInWithoutGoogle();
      newStat(2);

      let r={
          name: '',
          pob: '',
          dob: '',
          email: null,
          tob:'',
          house:'',
          b:true,
          sign:''
          };
          setNewUser(r);
          UserProfile.loggedIn=false;
        
    }

  function handle(){
    firebase.auth().signOut();
        UserProfile.setEmail(null);
        UserProfile.setName('');
        UserProfile.loggingOut();
        UserProfile.setBirthday('');
        UserProfile.setBirthplace('');
        UserProfile.setBirthTime('');
        UserProfile.setHouse('');
        UserProfile.setSign('');
        let a={
            name: '',
            pob: '',
            dob: '',
            email: null,
            tob:'',
            house:'',
            b:true,
            sign:''
            };
            setNewUser(a);
            newStat(3);
            setTimeout(3000);
            UserProfile.loggedIn=false;
        UserProfile.setLocalStorageBTime();
        UserProfile.setLocalStorageBDay();
        UserProfile.setLocalStorageSign();
        UserProfile.setLocalStorageBPlace();
        UserProfile.setLocalStorageHouse();
        UserProfile.setLocalStorageEmail();
        UserProfile.setLocalStorageName();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
        newStat(2);

        let r={
            name: '',
            pob: '',
            dob: '',
            email: null,
            tob:'',
            house:'',
            b:true
            };
            setNewUser(r);
            UserProfile.getLocalStorageisLoggedIn();

    }
    
    if(newUser.b && GoogleLogin.BasicProfile===undefined){
      UserProfile.loggedIn=false;
      UserProfile.abc='hi';
    return( <Redirect to={{pathname:'/Home', 
}}/>
);
    }
    UserProfile.setName(data.Name);
    UserProfile.setBirthplace(data.LocationOfBirth);
    UserProfile.setBirthTime(data.TimeOfBirth);
    UserProfile.setBirthday(data.Birthday);
    UserProfile.setHouse(p9);
    UserProfile.setSign(p10);
    UserProfile.setLocalStorageSign();
    UserProfile.setLocalStorageHouse();
    UserProfile.setLocalStorageBDay();
    UserProfile.setLocalStorageBPlace();
    UserProfile.setLocalStorageisLoggedIn();
    UserProfile.setLocalStorageisLoggedInWithoutGoogle();
    UserProfile.setLocalStorageBTime();
    UserProfile.setLocalStorageName();
    UserProfile.getLocalStorageName();

    if(p7){//google login
    return(

      <div className="User">
      <header className="User-header" style={{backgroundImage: `url(${background})` }}>
      <div>{renderName()}</div>
      <div className="User-card">
        <div>{renderTable()}</div>
      </div>

      <div style={{marginTop: 30}}>
      <GoogleLogout
        onLogoutSuccess={handle2}
                   clientId={config.GOOGLE_CLIENT_ID}
                   theme="dark"
                 
         />              </div>
          <div>
<br></br><br></br>
<div style={{fontSize:20}}>Edit Information or Unsubsribe:</div>
<ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Edit'}}>Edit</ColorButton>


                          </div>
      </header>
              
         </div>    

    );
   
                   } 
                   else if(!p7) {//regular login
                  if(newUser.name===""&& newUser.email===""){
      UserProfile.setEmail(null);
      UserProfile.setHouse('');
      UserProfile.setSign('');
      UserProfile.setName('');
      UserProfile.loggingOut();
      UserProfile.setBirthday('');
      UserProfile.setBirthplace('');
      UserProfile.setBirthTime('');
      if(props!==undefined)
      if(props.location.state!==undefined)
      if(props.location.state.user.email!==undefined)
      if(props.location.state.user.email.length>0)
      UserProfile.loggedIn=true;
      else
      UserProfile.loggedIn=false;
      else
      UserProfile.loggedIn=false;
      UserProfile.setLocalStorageHouse();
      UserProfile.setLocalStorageSign();
      UserProfile.setLocalStorageBTime();
      UserProfile.setLocalStorageBDay();
      UserProfile.setLocalStorageBPlace();
      UserProfile.setLocalStorageEmail();
      UserProfile.setLocalStorageName();
      UserProfile.setLocalStorageisLoggedIn();
      UserProfile.setLocalStorageisLoggedInWithGoogle();
      UserProfile.setLocalStorageisLoggedInWithoutGoogle();
      //return(<Redirect to="/Home"/>);
      }
      UserProfile.getLocalStorageName();
                       return(
                        <div className="User">
                          <header className="User-header" style={{backgroundImage: `url(${background})` }}>
                          <div>{renderName()}</div>
                          <div className="User-card">
                            <div>{renderTable()}</div>
                          </div>

                          <div style={{marginTop: 30}}>
                            <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Home'}}>Log Out</ColorButton>
                          </div>

                          <div>
<br></br><br></br>
<div style={{fontSize:20}}>Edit Information or Unsubsribe:</div>
<ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Edit'}}>Edit</ColorButton>


                          </div>
                          </header>
                          </div>
                        ); }
                        else{
                            return <p>{newUser.name}</p>;
                        }
}
export default User;
