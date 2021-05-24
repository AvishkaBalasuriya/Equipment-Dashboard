import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import AuthenticationHeader from '../components/headers/AuthenticationHeader'
import InputField from '../components/InputField'

import {setLoggedUser} from '../redux/actions/authentication'
import {clearOtpData} from '../redux/actions/otp'
import {showLoadingPanel,hideLoadingPanel} from '../redux/actions/loadingPanel'
import {showAlert} from '../redux/actions/snackBar'

import {resetPassword} from '../services/backend'

const PasswordResetPage = () => {
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
    const otpData = useSelector(state=>state.otpReducer)
    const history = useHistory()

    const [password,onChangePasswordInput] = useState()
    const [passwordConfirm,onChangePasswordConfirmInput] = useState()

    const callPasswordReset = async(e) => {
        e.preventDefault()

        dispatch(showLoadingPanel())

        let passwordResetResult = await resetPassword({otpId:otpData.otpId,password:password,passwordConfirm:passwordConfirm})

        if(!passwordResetResult.success){
            dispatch(hideLoadingPanel())
            dispatch(showAlert({status:true,message:passwordResetResult.message===""?passwordResetResult.error:passwordResetResult.message,type:"error"}))
            return 
        }
        
        let authToken = passwordResetResult.data.accessToken
        let userData = jwt.decode(authToken)

        dispatch(hideLoadingPanel())
        dispatch(setLoggedUser({authToken:authToken,userData:userData}))
        dispatch(clearOtpData())

        history.replace('/dashboard')
    }


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <AuthenticationHeader title="Reset Password"></AuthenticationHeader>
                <form className={classes.form} noValidate>
                    <InputField
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        onChange={onChangePasswordInput}
                    ></InputField>
                    <InputField
                        id="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        name="passwordConfirm"
                        autoComplete="passwordConfirm"
                        onChange={onChangePasswordConfirmInput}
                    ></InputField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>callPasswordReset(e)}
                    >
                        Reset Password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/" variant="body2">
                                Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
} 

export default PasswordResetPage
