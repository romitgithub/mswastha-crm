import APP_INITIAL_STATE from "../../store/initialState"
import APP_ACTION_TYPE from "./actionType.enum"

const newPatientReducer = (
  state = APP_INITIAL_STATE.newPatientReducer,
  action: { type: string; data: { [key: string]: any } }
) => {
  let newState
  switch (action.type) {
    case APP_ACTION_TYPE.UPDATE_PATIENT_DETAILS:
      newState = {
        ...state,
        patientDetails: action.data,
      }
      return newState
    case APP_ACTION_TYPE.ADD_PATIENT_SUCCESS:
      newState
        = {
        ...state,
        newPatientAdded: action.data
      }
      return newState;
    case APP_ACTION_TYPE.ADD_PATIENT_ERROR:
      newState
        = {
        ...state,
        newPatientAdded: action.data
      }
      return newState;
    default:
      return state
  }
}

export default newPatientReducer
