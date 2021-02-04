import { combineReducers } from "redux"

import loginReducer from "../containers/Login/reducer"
import patientRecordsReducer from "../containers/PatientRecords/reducer"
import newPatientReducer from "../containers/AddPatient/reducer"

const appReducer = combineReducers({ loginReducer, patientRecordsReducer, newPatientReducer })

export default appReducer
