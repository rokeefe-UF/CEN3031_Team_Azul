import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Heading, Text, Link } from 'rebass';
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import LoginWithGoogle from './LoginWithGoogle';
import { Route, Switch, Redirect  } from 'react-router-dom';
import User from './User';
import background from '../../assets/moonbackground.jpg';
import "./Login.css";
import Button from "@material-ui/core/Button";
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';


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

class Login extends Component {
    constructor(){
    super();

    UserProfile.name='';
    UserProfile.email=null;
    UserProfile.isLoggedIn=false;
    this.state = {name:'', email:null, loggedIn:false, loggedInWithGoogle:false, nextPage:''};
    }
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };


 async log2(){
        const a= (await axiosPath.makeGetRequest('personal/'+this.state.email));
console.log(a);
return a;
       };


toSignUpPage=()=>{
  console.log("clickety click");
  this.props.history.push('/SignUp');
}

handleSubmit = async (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then(async(user) => {
       this.setState({name:this.state.name, email:this.state.email, loggedIn:this.state.loggedIn, loggedInWithGoogle:false, nextPage:this.state.nextPage});
       const obj=await this.log2();
 console.log(obj);
 UserProfile.setEmail(this.state.email);
        UserProfile.loggingInWithoutGoogle();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageEmail();
        console.log(UserProfile.getLocalStorageEmail());
        this.state.nextPage='/User';
        console.log(this.state.nextPage);
        console.log(UserProfile.getLocalStorageEmail());
        this.state.loggedInWithGoogle=false;


       if(obj!==undefined && obj.Email===this.state.email){
   
        this.bool=true;
        console.log(this.bool);
        
        
                //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                //console.log(GoogleLogin.BasicProfile);
            //if(this.state.email!=null &&this.state.email===this.state.email)
              //  alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
            //else{
            UserProfile.loggingInWithoutGoogle();
            //console.log(UserProfile.isLoggedIn());
            
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setEmail(this.state.email); 
            UserProfile.loggedIn=true;
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setLocalStorageName();
            UserProfile.setLocalStorageEmail();
            console.log(UserProfile.getLocalStorageEmail());
            UserProfile.setLocalStorageisLoggedInWithGoogle();
            UserProfile.setLocalStorageisLoggedIn();
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            //console.log(this.state.name);
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            //console.log(this.state.name);
           // console.log(this.state.email);
           UserProfile.loggedIn=true;
           this.state.loggedIn=true;
           this.nextPage='/User';
        
           console.log(this.state.nextPage);window.location.reload();  
           if(this.state.email==='Admin@admin.com')
           this.props.history.push('/Admin');
          else
           return <Redirect to={{pathname: '/User',state:{user: {name:this.state.name, email:this.state.email, dob:this.state.dob, pob:this.state.pob, tob:this.state.tob}, g:false}}}></Redirect>
         
         }
     })
     .catch((error) => {
       this.setState({ error: error });
       this.setState({name:this.state.name, email:this.state.email, loggedIn:false, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
        UserProfile.loggedIn=false; 
        this.state.loggedIn=false;
        alert('Invalid Username or Password');
        UserProfile.loggingOut();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
        this.state.nextPage='/Login';
         console.log("Faile");
         return <Redirect to="/Login"/>

       
     });
 };
 render() {
    console.log(UserProfile.getLocalStorageEmail());
    if(UserProfile.getLocalStorageEmail()!=='' && UserProfile.getLocalStorageEmail()!==null && UserProfile.getLocalStorageEmail()!=='null')
    if(UserProfile.getLocalStorageEmail()==='Admin@admin.com' || UserProfile.getLocalStorageEmail()==='admin')
    return <Redirect to='/Admin'/>
    else
    return <Redirect to='/User'/>
   const { email, password, error } = this.state;
   return (
     <div className="Login">
       <header className="Login-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="login-title">
                    Welcome to MoonFlow
                </h1>
                
       
      
       <div className="Login-card">
                    <p style={{marginBottom:5}}>Login</p>
                    
           <form on onSubmit={this.handleSubmit}>
             <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <div style={{marginBottom:7,marginTop:1}}>   <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             </div>
             <div>
             <ColorButton children="Login" variant="outlined"size="large" className={useStyles.margin} onClick={this.handleSubmit}/>
           </div>
           </form>
<div style={{fontSize:15, marginTop:5}}>
       Forgot Password?
       <Link href='/PasswordReset'><br></br>Reset Password</Link>
</div>

       <p style={{marginTop: 6, marginBottom: 8, fontSize:25}}>or</p>
       <LoginWithGoogle></LoginWithGoogle>
       </div>
       <div>
                    <br></br><br></br>
                    <p style={{marginBottom:5}}>
                        Don't have an account?
                    </p>
                    <ColorButton onClickCapture={this.toSignUpPage}className={useStyles.margin} size="large" variant="outlined" >Sign Up Here</ColorButton>
</div>
       </header>
     </div>
   );
 }
}
export default withRouter(Login);
