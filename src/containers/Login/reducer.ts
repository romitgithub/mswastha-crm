import APP_INITIAL_STATE from "../../store/initialState"
import APP_ACTION_TYPE from "./actionType.enum"

const loginReducer = (
  state = APP_INITIAL_STATE.loginReducer,
  action: { type: string; data: { [key: string]: any } }
) => {
  let newState
  switch (action.type) {
    case APP_ACTION_TYPE.UPDATE_LOGIN_DETAILS:
      newState = {
        ...state,
        loginDetails: action.data,
      }
      return newState
    case APP_ACTION_TYPE.LOGIN_SUCCESS:
      newState = {
        ...state,
        userDetails: action.data,
        loginErrorMessage: null,
        loggedIn: true,
        loggedOut: false,
      }
      return newState
    case APP_ACTION_TYPE.LOGIN_FAILED:
      newState = {
        ...state,
        loginErrorMessage: action.data
      }
      return newState
    case APP_ACTION_TYPE.LOGOUT_USER:
      newState = {
        ...state,
        userDetails: action.data,
        loggedIn: false,
        loggedOut: true,
      }
      return newState

    default:
      return state
  }
}

export default loginReducer
