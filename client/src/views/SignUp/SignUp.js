import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './SignUp.css';
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";


const ColorButton = withStyles(theme => ({
    root: {
        padding: '6px 12px',
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

function SignUp() {
    const { register, handleSubmit, errors } = useForm();
    const [newUser, setNewUser] = useState({
        name: '',
        pob: '',
        dob: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        console.log(newUser)
    }, [newUser]);

    const onSubmit = (data,e) => {
        const user = {
            name: data.name,
            pob: data.pob,
            dob: data.dob,
            email: data.email,
            password: data.password
        }
        // {...newUser,
        //     name: data.name,
        //     pob: data.pob,
        //     dob: data.dob,
        //     email: data.email,
        //     password: data.password
        // }
        setNewUser(user);
        e.target.reset();
        //send it here?
    };


    const func=(a)=>{
        const user={
            name:newUser.name,
            pob: newUser.pob,
            dob: a,
            email:newUser.email,
            password:newUser.password
        }
        setNewUser(user);
        };
    
        const func2=(b)=>{
            const user={
                name:newUser.name,
                pob: b,
                dob: newUser.dob,
                email:newUser.email,
                password:newUser.password
            }
            setNewUser(user);
            };

            const func3=(c)=>{
                const user={
                    name:newUser.name,
                    pob: newUser.pob,
                    dob: newUser.dob,
                    email:newUser.email,
                    password:c
                }
                setNewUser(user);
                };

                const func4=(d)=>{
                    const user={
                        name:newUser.name,
                        pob: newUser.pob,
                        dob: newUser.dob,
                        email:d,
                        password:newUser.password
                    }
                    setNewUser(user);
                    };

                    const func5=(e)=>{
                        const user={
                            name:e,
                            pob: newUser.pob,
                            dob: newUser.dob,
                            email:newUser.email,
                            password:newUser.password
                        }
                        setNewUser(user);
                        };

    const classes = useStyles();

    return (

        <div className="SignIn">
            <header className="SignIn-header">
                <h1 className="signin-title">
                    User Information
                </h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> */}
                <div>
                    <input type="text" placeholder="Name" name="name" ref={register} onChange={(e)=>func5(e.target.value)}/>
                    </div>
                    <div>
                        <input type="email" placeholder="Email Address" name="email" ref={register} onChange={(e)=>func4(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Password" name="password" ref={register} onChange={(e)=>func3(e.target.value)}/>
                    </div>
                    <div>
                    <input type="date" placeholder="Date of Birth" name="dob" ref={register} onChange={(e)=>func(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Place of Birth" name="pob" ref={register} onChange={(e)=>func2(e.target.value)}/>
                    </div>               
                    <div>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname:'/User',user:{na:newUser}}}> Submit</ColorButton>
                        </div>
                
                <div>
                <SignUpWithGoogle></SignUpWithGoogle>
                </div>
            </header>
        </div>
    );
}

export default SignUp;
