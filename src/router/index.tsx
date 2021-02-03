import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"

import ProtectedRoute from '../components/ProtectedRoute';
import Landing from "../containers/Landing"
import Login from "../containers/Login"
import PatientRecords from "../containers/PatientRecords"

const router = () => (
  <Router basename='/'>
    <Switch>
      <Route exact path="/" component={Landing} />
        
      <Route exact path="/login" component={Login} />
      <ProtectedRoute path="/patient-records" component={PatientRecords} />
      
    </Switch>
  </Router>
)

export default router
