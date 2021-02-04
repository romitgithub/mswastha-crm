import APP_INITIAL_STATE from "../../store/initialState"
import APP_ACTION_TYPE from "./actionType.enum"

const patientRecordsReducer = (
  state = APP_INITIAL_STATE.patientRecordsReducer,
  action: { type: string; data: { [key: string]: any } }
) => {
  let newState;
  switch (action.type) {
    case APP_ACTION_TYPE.PATIENT_RECORDS_SUCCESS:
      newState = {
        ...state,
        patientRecords: action.data,
      }
      return newState
    case APP_ACTION_TYPE.TOGGLE_ADD_PATIENT_MODAL:
      newState = {
        ...state,
        isAddPatientModalOpen: action.data
      }
      return newState;
    default:
      return state
  }
}

export default patientRecordsReducer
