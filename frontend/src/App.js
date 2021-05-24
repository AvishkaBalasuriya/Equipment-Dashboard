import { BrowserRouter as Router, Route } from "react-router-dom"
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import {useSelector,useDispatch} from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/Dashboard'
import SendOtpPage from './pages/SendOtpPage'
import RegisterPage from './pages/RegisterPage'
import VerifyOtpPage from './pages/VerifyOtpPage'
import PasswordResetPage from './pages/PasswordResetPage'
import {ProtectedRoute,ProtectedAdminRoute} from './components/ProtectedRoute'
import NavigationBar from './components/NavigationBar'

import {hideAlert} from './redux/actions/snackBar'

function App() {
  const dispatch = useDispatch()
  const loadingStatus = useSelector(state=>state.loadingPanelReducer)
  const snackBarData = useSelector(state=>state.snackBarReducer)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(hideAlert())
  }

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }))

  const classes = useStyles()

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loadingStatus}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snackBarData.status} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={snackBarData.type}>{snackBarData.message}</Alert>
      </Snackbar>
      <Router>
        <NavigationBar />
        <Route exact path="/" component={LoginPage}></Route>
        <Route exact path="/sendOtpVerification" component={SendOtpPage}></Route>
        <Route exact path="/verifyOtp" component={VerifyOtpPage}></Route>
        <Route exact path="/resetPassword" component={PasswordResetPage}></Route>
        <ProtectedRoute exact path="/dashboard" component={DashboardPage}></ProtectedRoute>
        <ProtectedAdminRoute exact path="/register" component={RegisterPage}></ProtectedAdminRoute>
      </Router>
    </div>
  )
}

export default App
