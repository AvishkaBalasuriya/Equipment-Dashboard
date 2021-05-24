import {React,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {useSelector} from 'react-redux'

import StatusCard from '../components/StatusCard'
import BarChart from '../components/charts/BarChart'

import {listenToDataStream} from '../services/socket'

function DashboardPage() {

    const useStyles = makeStyles(() => ({
        paper: {
            flexGrow:1,
        },
        chartPaper: {
            width:"100%",
            height:450
        }
    }));

    const classes = useStyles()
    const cardDataReducerOperational = useSelector(state=>state.cardDataReducer.operational)
    const cardDataReducerNonOperational= useSelector(state=>state.cardDataReducer.nonOperational)
    const chartDataReducerEquipmentInventory = useSelector(state=>state.chartDataReducer.equipmentInventory)
    const authToken = useSelector(state=>state.authenticationReducer.authToken)

    useEffect(() => {
        listenToDataStream(authToken)
    },[authToken])

    return (
        <>
        <Grid container spacing={0} className={classes.paper}>
            <Grid item xs={12} sm={6} lg={6}>
                <StatusCard
                        title="Operational"
                        data={cardDataReducerOperational?cardDataReducerOperational:null}
                        fontSize={40}
                        margin={20}
                        height={250}
                        width={200}
                ></StatusCard>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <StatusCard
                    title="Non-Operational"
                    data={cardDataReducerNonOperational?cardDataReducerNonOperational:null}
                    fontSize={40}
                    margin={20}
                    height={250}
                    width={200}
                ></StatusCard>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
                <div className={classes.chartPaper}>
                    <BarChart
                        data={chartDataReducerEquipmentInventory?chartDataReducerEquipmentInventory:null}
                    ></BarChart>
                </div>
            </Grid>
        </Grid>
        </>
    )
}

export default DashboardPage
