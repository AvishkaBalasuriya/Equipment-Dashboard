import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ProtectedRoute = ({component:Component,...rest}) => {
    const authenticationData = useSelector((store)=>store.authenticationReducer)
    return (
        <Route
            {...rest}
            render={props=>{
                if(authenticationData)
                    return <Component {...props}></Component>
                else
                    return <Redirect to="/"></Redirect>
            }}
        ></Route>
    )
}

const ProtectedAdminRoute = ({component:Component,...rest}) => {
    const authenticationData = useSelector((store)=>store.authenticationReducer)
    return (
        <Route
            {...rest}
            render={props=>{
                if(authenticationData && authenticationData.userData.type)
                    return <Component {...props}></Component>
                else
                    return <Redirect to="/"></Redirect>
            }}
        ></Route>
    )
}

export {
    ProtectedRoute,
    ProtectedAdminRoute
}
