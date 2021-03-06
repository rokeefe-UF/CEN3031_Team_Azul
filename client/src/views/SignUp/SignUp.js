import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Flex, Box, Heading, Text } from 'rebass';
import { Label, Input } from '@rebass/forms'
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import SignUpWithGoogle from './SignUpWithGoogle';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './SignUp.css';
import Button from "@material-ui/core/Button"
import background from '../../assets/moonbackground.jpg';
import { useForm } from 'react-hook-form';

//button styling
const ColorButton = withStyles(theme => ({
  root: {
      borderRadius: 20,
      fontSize: 12,
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


//sign up class is responsible for front end sign up page and functionality
class SignUp extends Component {
  //constructor sets the states
    constructor() {
        super();
        this.state = {name:'',email:'',pob:'', dob:'', tob:'',loggedIn:false, loggedInWithGoogle:false, house:'', sign:'',password2:''};
    }

//this method checks if there exists such a user already in our database
    async log2(){
        let a= '';
        try{
            a=await axiosPath.makeGetRequest('personal/'+this.state.email)}
            catch{
                a=undefined;
            };
            const b=a;
return b;
       };

//responsible for the to login page button
       LoginPage=()=>{
        this.props.history.push('/Login');
      }

//on the change of an input box, this method changes the state of the corresponding variables
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };

 //called when a user submits their information (for regular sign up)
handleSubmit = async (event) => {
   event.preventDefault();

   //if the user is already logged in, give an error message
   if(!(UserProfile.getLocalStorageEmail()==='' ||UserProfile.getLocalStorageEmail()==='null' || UserProfile.getLocalStorageEmail()===null || UserProfile.getLocalStorageEmail()===undefined || UserProfile.getLocalStorageEmail()==='undefined'))
              alert("You are already logged in with email "+UserProfile.getLocalStorageEmail()+".  Please log out before creating a new account");
   else{
     //if the user did not provide an email, give an error message
              if(this.state.email.length===0)
   alert("Please provide an email");
   else{
   const obj=await this.log2(); // try to find this email in our database
   if(obj!==undefined){
     //if the email is already in our database, give an error message and redirect to login page
   alert("Already a user with this email");
   return (<Redirect to={{pathname: '/Login'}}></Redirect>);
   }
   else{
    
   const { email, password,password2 } = this.state;
   //if no password given or password is too short, give error message
   if(password===undefined || password.length<6)
   alert("Please use a password of 6 or more characters");
   else{
     //if no name given, give error message
     if(this.state.name===undefined || this.state.name.length===0)
     alert("Please provide a name");
     else{
       //if no date of birth or date of birth not valid, give error message
       if(this.state.dob===undefined ||this.state.dob.length!==10)
       alert("Please provide a valid birth date");
       else{
         //we restrict this email usage because when this email appears on the backend get request, emails are sent to users
        // if(this.state.email.indexOf('Admin@admin.com2')>=0)
         //alert("Please provide a valid email");
        //else{
          //if user chooses undefined as location of birth, alert them that they cannot do that
          if(this.state.pob==='undefined')
            alert("Please provide a valid location of birth (or leave it blank)");
            else{
              if(password!==password2)
                alert("Passwords do not match");
                else{
                  if(password.indexOf("0")===-1 && password.indexOf("1")===-1 && password.indexOf("2")===-1 && password.indexOf("3")===-1 && password.indexOf("4")===-1 && password.indexOf("5")===-1 && password.indexOf("6")===-1 && password.indexOf("7")===-1 && password.indexOf("8")===-1 && password.indexOf("9")===-1)
                  alert("Password must include at least 1 numeric value (0-9)");
                  else{
                  
//now, no more errors, so now let firebase create a corresponding user in its database
firebase.auth().createUserWithEmailAndPassword(email, password).then(async (user) => {
      try{
        
        //now we try to make a corresponding user in our database linked by email to that in firebase's database, but if unsuccessful, roll everything back
      const axiosUser = {
        Name: this.state.name,
        Sign: 'Aries',
        Birthday: this.state.dob,
        TimeOfBirth: this.state.tob,
        LocationOfBirth: this.state.pob,
        Email: this.state.email,
        House:'1st',
        Subscribed:true
    } 
    //create a user in the db
    console.log('sending axios')
         await axiosPath.makeCreateRequest('personal/', axiosUser);
          console.log('sent axios')
    this.state.loggedIn=true;
    
      

//set user session states
 UserProfile.loggingInWithoutGoogle();
       UserProfile.setName(this.state.name);
       UserProfile.setEmail(this.state.email);
       UserProfile.setBirthday(this.state.dob);
       UserProfile.setBirthplace(this.state.pob);
       UserProfile.setBirthTime(this.state.tob);
       UserProfile.setSubscribed(true);
       
       UserProfile.loggedIn=true;
       UserProfile.setLocalStorageBTime();
       UserProfile.setLocalStorageBDay();
       UserProfile.setLocalStorageBPlace();
       UserProfile.setLocalStorageEmail();
       UserProfile.setLocalStorageName();
       UserProfile.setLocalStorageisLoggedIn();
       UserProfile.setLocalStorageisLoggedInWithoutGoogle();
       UserProfile.setLocalStorageSubscribed();
       
       
      //if the user is admin, send to admin page
    if(this.state.email==='heavenlymoonflow@gmail.com')
      this.props.history.push('/Admin');
    else
    //else send to user page
      this.props.history.push('/User');


  }
  //if login in db was unsuccessful but in firebase was successful rollback by deleting user from firebase
  catch{
    firebase.auth().currentUser.delete();
    }
     })
     .catch((error) => {
       alert(error);
     });
   // }
  }
}
  }
}
}
}
}
}
   }
 };

//if user is logged in, send them to user page
 componentDidUpdate(){
   const userw={
     name:this.state.name,
     email:this.state.email,
     pob:this.state.pob,
     dob:this.state.dob,
     tob:this.state.tob,
     house:this.state.house,
     sign:this.state.sign,
     loggedIn:this.state.loggedIn,
     loggedInWithGoogle:this.state.loggedInWithGoogle
   }
  if(this.state.loggedIn)
  return (<Redirect to={{pathname: '/User',state:{user:userw, g:false}}}></Redirect>);

}

 render() {
   const { email, password, error , name, dob, tob, pob, password2} = this.state;

//show the input boxes, styling with background, button for sign up, button for google sign up, and button for going to login page
   return (
       <div className="SignIn">
            <header className="SignIn-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="signin-title">
                    User Information
                </h1>
               
       
                  <div className="Signin-card">  <p></p> 

           <form onSubmit={this.handleSubmit}>

           <div className="signup-box">
             <div>Name:</div>
            <input
               type="text"
               name="name"
               placeholder="name"

               value={name}
               onChange={this.handleInputChange}
             />
             </div>

             <div className="signup-box">
            <div>Email:</div>
           <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
           </div>
           <div className="signup-box">
             <div>Password:</div>
             <input
               type="password"
               name="password"
               placeholder="Password"

               value={password}
               onChange={this.handleInputChange}
             />
             </div>


             <div className="signup-box">
             <div>Confirm Password:</div>
             <input
               type="password"
               name="password2"
               placeholder="Confirm Password"
              onChange={this.handleInputChange}
               value={password2}
               
             />
             </div>


             <div className="signup-box">
             <div>Place of Birth (City, State):</div>
            <input
               type="text"
               name="pob"
               placeholder="place of birth"

               value={pob}
               onChange={this.handleInputChange}
             />
             </div>
             

             <div className="signup-box">
             <div>Birthtime (Optional):</div>
            <input
               type="time"
               name="tob"
               placeholder="time of birth"
                      
               value={tob}
               onChange={this.handleInputChange}
             />
             </div>

             <div className="signup-box">
             <div>Date of Birth:</div>
            <input
               type="date"
               name="dob"
               placeholder="date of birth"
               value={dob}
               onChange={this.handleInputChange}
             />
             </div>


             {/* <p style={{marginBottom:-15}}></p> */}
             <div style={{marginTop:8}}>
             <ColorButton children="Register" className={useStyles.margin} size="large" onClick={this.handleSubmit}/>
</div>
           </form>
<p style={{marginTop: 5, marginBottom: 10, fontSize:25}}>or</p>
       <SignUpWithGoogle></SignUpWithGoogle>
           </div>
           
       
       
       <p style={{marginBottom:5}}>
                    <br></br><br></br>
                    Already a User?
                </p>
                <div>
                <ColorButton onClickCapture={this.LoginPage}className={useStyles.margin} size="large" variant="outlined" >GO LOGIN NOW</ColorButton>
                        </div>
</header>
       </div>


       
                
   );


 }
}
export default withRouter(SignUp);
