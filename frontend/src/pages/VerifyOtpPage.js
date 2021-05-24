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

import {setOtpId} from '../redux/actions/otp'
import {setLoggedUser} from '../redux/actions/authentication'
import {showLoadingPanel,hideLoadingPanel} from '../redux/actions/loadingPanel'
import {showAlert} from '../redux/actions/snackBar'

import {verifyOtpCode} from '../services/backend'

const VerifyOtpPage = () => {
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

    const [otpCode,onChangeOtpCodeInput] = useState()

    const callVerifyOtpCode = async(e) => {
        e.preventDefault()

        dispatch(showLoadingPanel())

        let verifyOtpCodeResult = await verifyOtpCode({userId:otpData.userId,otpCode:otpCode})

        if(!verifyOtpCodeResult.success){
            dispatch(hideLoadingPanel())
            dispatch(showAlert({status:true,message:verifyOtpCodeResult.message===""?verifyOtpCodeResult.error:verifyOtpCodeResult.message,type:"error"}))
            return 
        }
        
        if(verifyOtpCodeResult.code===201){
            let authToken = verifyOtpCodeResult.data.accessToken
            let userData = jwt.decode(authToken)

            dispatch(hideLoadingPanel())
            dispatch(setLoggedUser({authToken:authToken,userData:userData}))
            
            history.replace('/dashboard')
            return
        }
        
        let otpId = verifyOtpCodeResult.data.otpId

        dispatch(hideLoadingPanel())
        dispatch(setOtpId({otpId:otpId}))

        history.replace('/resetPassword')
    }


    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <AuthenticationHeader title="Verify OTP Code"></AuthenticationHeader>
                <form className={classes.form} noValidate>
                    <InputField
                        id="otpCode"
                        label="Otp Code"
                        name="otpCode"
                        autoComplete="otpCode"
                        onChange={onChangeOtpCodeInput}
                    ></InputField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>callVerifyOtpCode(e)}
                    >
                        Verify
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

export default VerifyOtpPage
