import ACTION_TYPES from "./actionType.enum"
import DataService from "../../services/data.service"
import CookieService from "../../services/cookie.service"

export const loginUser = (userDetails: any) => {
  return (dispatch: Function) => {
    const { username, password } = userDetails
    DataService.get("login", { username, password }, "", {}).then(
      (response: any) => {
        if (response.msg === "exist") {
          console.log("user exists")
          CookieService.set("user", JSON.stringify(userDetails)).then(() => {
            dispatch(saveUserDetails(userDetails))
          })
        }
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}

export const saveUserDetails = (userDetails: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      data: userDetails,
    })
  }
}

export const updateLoginDetails = (loginDetails: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_LOGIN_DETAILS,
      data: loginDetails,
    })
  }
}

export const logoutUser = () => {
  return (dispatch: Function) => {
    DataService.logoutUser().then(() => {
      dispatch({
        type: ACTION_TYPES.LOGOUT_USER,
        data: null,
      })
    })
  }
}
