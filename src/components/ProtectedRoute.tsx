import React from "react"
import { Redirect, Route } from "react-router-dom"
import DataService from "../services/data.service"

const ProtectedRoute = ({
  path,
  component: Component,
  ...rest
}: {
  component: any
  path: string
}) => {
  const loggedInUser = DataService.getLoggedInUserFromStorage()
  return (
    <Route
      {...rest}
      render={props =>
        loggedInUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
