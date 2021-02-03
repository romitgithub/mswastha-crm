import { combineReducers } from "redux"

import loginReducer from "../containers/Login/reducer"
import patientRecordsReducer from "../containers/PatientRecords/reducer"

const appReducer = combineReducers({ loginReducer, patientRecordsReducer })

export default appReducer
