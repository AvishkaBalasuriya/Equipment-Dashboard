import {React} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'

const StatusCard = (props) => {
    const useStyles = makeStyles({
        root: {
            backgroundColor:'#26282b',
            margin:props.margin,
            minWidth: props.width,
            minHeight: props.height,
            justifyContent:'center',
            alignItems:'center'
        },
        titlePaper:{
            backgroundColor:'#8884d8',
        },
        title: {
            textAlign:'center',
            color:'black',
            fontSize: props.fontSize,
            fontWeight:'bold'
        },
        counter: {
            textAlign:'center',
            color:'white',
            fontSize: 60,
            fontWeight:'bolder'
        },
        lastUpdate: {
            textAlign:'center',
            color:'white',
            fontSize: 12,
        },
        error:{
            textAlign:'center',
            color:'white',
            fontSize: 16,
        }
    })

    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <div className={classes.titlePaper}>
                <Typography className={classes.title}>
                    {props.title}
                </Typography>
            </div>
            <CardContent>
            {
                props.data?
                <>
                    <Typography className={classes.counter} variant="h6" component="h1">
                        {props.data.count}
                    </Typography>
                </>
                :
                <p className={classes.error}>Sorry! Unable to load data for this counter</p>
            }
            </CardContent>
            <CardActionArea />
            <Typography className={classes.lastUpdate} variant="h2" component="h1">
                Last Update On: {props.data.lastUpdate}
            </Typography>
        </Card>
    )
}

export default StatusCard
