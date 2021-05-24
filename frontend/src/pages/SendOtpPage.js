import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';

import AuthenticationHeader from '../components/headers/AuthenticationHeader'
import InputField from '../components/InputField'

import {setOtpUserId} from '../redux/actions/otp'
import {showLoadingPanel,hideLoadingPanel} from '../redux/actions/loadingPanel'
import {showAlert} from '../redux/actions/snackBar'

import {sendOtpCode} from '../services/backend'


const SendOtpPage = () => {
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

    const callSendOtpCode = async(e) => {
        e.preventDefault()

        dispatch(showLoadingPanel())

        let sendOtpCodeResult = await sendOtpCode({email:email})

        if(!sendOtpCodeResult.success){
            dispatch(hideLoadingPanel())
            dispatch(showAlert({status:true,message:sendOtpCodeResult.message===""?sendOtpCodeResult.error:sendOtpCodeResult.message,type:"error"}))
            return 
        }
        
        let userId = sendOtpCodeResult.data.userId

        dispatch(hideLoadingPanel())
        dispatch(setOtpUserId({userId:userId}))

        history.replace('/verifyOtp')
    }


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <AuthenticationHeader title="Send Verification"></AuthenticationHeader>
                <form className={classes.form} noValidate>
                    <InputField
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChangeEmailInput}
                    ></InputField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>callSendOtpCode(e)}
                    >
                        Send Verification
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

export default SendOtpPage
