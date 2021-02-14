import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"
import Landing from "../containers/Landing"
import Login from "../containers/Login"
import PatientRecords from "../containers/PatientRecords"

const router = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={Landing} />
      <ProtectedRoute path="/patient-records" component={PatientRecords} />
    </Switch>
  </Router>
)

export default router
