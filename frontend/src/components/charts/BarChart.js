import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BarChart as BarChartComponent, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const BarChart = (props) => {
  const useStyles = makeStyles({
    lastUpdate: {
      textAlign:'center',
      color:'black',
      fontSize: 12,
      fontWeight:'bold'
    },
    error:{
      textAlign:'center',
      color:'black',
      fontSize: 16,
    },
    root:{
      textAlign:'center',
      color:'black',
      fontSize: 16,
    }
  })

  const classes = useStyles()
  
  return props.data?(
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChartComponent
          data={props.data.data}
          margin={{
            top: 40,
            right: 40,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis  dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChartComponent>
      </ResponsiveContainer>
      <p className={classes.lastUpdate}>
        Last Update On: {props.data.lastUpdate}
      </p>
    </>
  ) : <h5 className={classes.error}>Unable to load chart</h5>
}

export default BarChart