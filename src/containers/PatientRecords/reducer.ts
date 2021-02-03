import APP_INITIAL_STATE from "../../store/initialState"
import APP_ACTION_TYPE from "./actionType.enum"

const patientRecordsReducer = (
  state = APP_INITIAL_STATE.patientRecordsReducer,
  action: { type: string; data: { [key: string]: any } }
) => {
  switch (action.type) {
    case APP_ACTION_TYPE.PATIENT_RECORDS_SUCCESS:
      const newState = {
        ...state,
        patientRecords: action.data
      }
      return newState;
    default:
      return state
  }
}

export default patientRecordsReducer
