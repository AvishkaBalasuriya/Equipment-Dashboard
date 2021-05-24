import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const AuthenticationHeader = (props) => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          marginBottom: theme.spacing(4),
        }
    }))

    const classes = useStyles()

    return (
        <>
            <img alt="Iviva Icon" src="https://static.iviva.com/favicon.ico" className={classes.paper}></img>
            <Typography component="h1" variant="h4" className={classes.paper}>{props.title}</Typography>
        </>
    )
}

export default AuthenticationHeader
