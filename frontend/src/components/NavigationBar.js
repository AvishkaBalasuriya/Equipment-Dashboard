import React from 'react'
import { useHistory } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import {clearLoggedUser} from '../redux/actions/authentication'
import {clearOtpData} from '../redux/actions/otp'

function NavigationBar() {
    const authenticationData = useSelector((store)=>store.authenticationReducer)
    const history = useHistory()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(clearOtpData())
        dispatch(clearLoggedUser())
        return
    }

    const navigate = ({e,route}) => {
        e.preventDefault()
        history.push(`/${route}`)
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor:'#8884d8'
        },
        addNewButton:{
            margin:20,
            color:"black",
            backgroundColor:'white',
            fontWeight:'bold',
        },
        logoutButton:{
            color:"white",
            backgroundColor:'red',
            fontWeight:'bold',
        },
    }))

    const classes = useStyles()

    return authenticationData? (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={3} lg={2}>
                        <Typography variant="h6" onClick={(e)=>navigate({e:e,route:"dashboard"})}>
                            Equipment Dashboard
                        </Typography>
                    </Grid>
                    {authenticationData.userData.type?
                        <Grid item xs={12} sm={3} lg={2}>
                            <Button className={classes.addNewButton} onClick={(e)=>navigate({e:e,route:"register"})}>Add new user</Button>
                        </Grid>
                        :
                        null
                    }
                </Grid>
                <Button className={classes.logoutButton} onClick={()=>logout()}>Logout</Button>
            </Toolbar>
        </AppBar>
    ) : null
}

export default NavigationBar
