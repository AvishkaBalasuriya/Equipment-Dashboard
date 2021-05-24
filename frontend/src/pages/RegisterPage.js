import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import AuthenticationHeader from '../components/headers/AuthenticationHeader'
import InputField from '../components/InputField'

import {register} from '../services/backend'

import {showLoadingPanel,hideLoadingPanel} from '../redux/actions/loadingPanel'
import {showAlert} from '../redux/actions/snackBar'

const RegisterPage = () => {
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
  const authenticationData = useSelector(state=>state.authenticationReducer)

  const [firstName,onChangefirstNameInput] = useState()
  const [lastName,onChangelastNameInput] = useState()
  const [email,onChangeEmailInput] = useState()
  const [password,onChangePasswordInput] = useState()
  const [passwordConfirm,onChangepasswordConfirmInput] = useState()
  const [type,onChangeTypeInput] = useState(false)

  const callRegister = async(e) => {
    e.preventDefault()

    dispatch(showLoadingPanel())

    let registerResult = await register({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      passwordConfirm:passwordConfirm,
      type:type,
      accessToken:authenticationData.authToken
    })

    dispatch(hideLoadingPanel())

    if(!registerResult.success){
      dispatch(hideLoadingPanel())
      dispatch(showAlert({status:true,message:registerResult.message===""?registerResult.error:registerResult.message,type:"error"}))
      return 
    }
    dispatch(showAlert({status:true,message:registerResult.message,type:"success"}))
    clearInputs()
  }

  const clearInputs = () => {
    onChangefirstNameInput()
    onChangelastNameInput()
    onChangeEmailInput()
    onChangePasswordInput()
    onChangepasswordConfirmInput()
    onChangeTypeInput(false)
  }

  return (
    <Container component="main" maxWidth="xs" id="paper">
      <CssBaseline />
      <div className={classes.paper}>
        <AuthenticationHeader title="Register New Admin"></AuthenticationHeader>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                autoComplete="fname"
                name="firstName"
                id="firstName"
                label="First Name"
                onChange={onChangefirstNameInput}
              ></InputField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChangelastNameInput}
              ></InputField>
            </Grid>
            <Grid item xs={12}>
              <InputField
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeEmailInput}
              ></InputField>
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={onChangePasswordInput}
              ></InputField>
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="passwordConfirm"
                onChange={onChangepasswordConfirmInput}
              ></InputField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type}
                    onChange={(e)=>{onChangeTypeInput(e.target.checked)}}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label="Is Admin"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>callRegister(e)}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default RegisterPage