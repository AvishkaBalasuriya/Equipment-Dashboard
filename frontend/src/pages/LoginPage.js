import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import jwt from 'jsonwebtoken'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'

import AuthenticationHeader from '../components/headers/AuthenticationHeader'
import InputField from '../components/InputField'

import {setLoggedUser} from '../redux/actions/authentication'
import {setOtpUserId} from '../redux/actions/otp'
import {showLoadingPanel,hideLoadingPanel} from '../redux/actions/loadingPanel'
import {showAlert} from '../redux/actions/snackBar'

import {login} from '../services/backend'


const LoginPage = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        form: {
          width: '100%',
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
    }))
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const [email,onChangeEmailInput] = useState()
    const [password,onChangePasswordInput] = useState()

    const callLogin = async(e) => {
        e.preventDefault()

        dispatch(showLoadingPanel())

        let loginResult = await login({email:email,password:password})
        if(!loginResult.success){
            if(loginResult.code===503){
                dispatch(hideLoadingPanel())
                dispatch(showAlert({status:true,message:loginResult.message===""?loginResult.error:loginResult.message,type:"error"}))
                dispatch(setOtpUserId({userId:loginResult.data.userId}))
                history.replace('/verifyOtp')
            }
            dispatch(hideLoadingPanel())
            dispatch(showAlert({status:true,message:loginResult.message===""?loginResult.error:loginResult.message,type:"error"}))
            return
        }
        
        let authToken = loginResult.data.accessToken
        let userData = jwt.decode(authToken)

        dispatch(hideLoadingPanel())
        dispatch(setLoggedUser({authToken:authToken,userData:userData}))
        history.replace('/dashboard')
    }


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <AuthenticationHeader title="Sign In"></AuthenticationHeader>
                <form className={classes.form} noValidate>
                    <InputField
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChangeEmailInput}
                    ></InputField>
                    <InputField
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangePasswordInput}
                    ></InputField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>callLogin(e)}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/sendOtpVerification" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
} 

export default LoginPage
