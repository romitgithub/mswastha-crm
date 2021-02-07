import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { updateLoginDetails, loginUser } from "./actions"

import "./index.style.scss"

interface Props {
  loggedIn: boolean
  loginDetails: any
  updateLoginDetails: Function
  loginUser: Function,
  loginErrorMessage: string | null
}

class Login extends React.Component<Props> {
  updateUsername = (username: string) => {
    this.props.updateLoginDetails({
      ...this.props.loginDetails,
      username: username,
    })
  }

  updatePassword = (password: string) => {
    this.props.updateLoginDetails({
      ...this.props.loginDetails,
      password: password,
    })
  }

  render() {
    console.log(this.props)
    const { username, password } = this.props.loginDetails
    const { loggedIn, loginErrorMessage } = this.props

    return (
      <>
        {!loggedIn ? (
          <div className="login-container">
            <h3 className="app-title">mSwasth</h3>
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={e => {
                  this.updateUsername(e.target.value)
                }}
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => {
                  this.updatePassword(e.target.value)
                }}
              />
            </div>
            { loginErrorMessage && loginErrorMessage !== '' &&
              <p className='login-error'>{loginErrorMessage}</p>
            }
            <button
              className="form-button"
              onClick={() => this.props.loginUser(this.props.loginDetails)}
            >
              Login
            </button>
          </div>
        ) : (
          <Redirect to={"/patient-records"} />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  loginDetails: state.loginReducer.loginDetails,
  loggedIn: state.loginReducer.loggedIn,
  loginErrorMessage: state.loginReducer.loginErrorMessage
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateLoginDetails: (loginDetails: any) => {
    dispatch(updateLoginDetails(loginDetails))
  },
  loginUser: (userDetails: any) => {
    dispatch(loginUser(userDetails))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
