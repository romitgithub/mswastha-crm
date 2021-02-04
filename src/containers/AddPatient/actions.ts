import ACTION_TYPES from "./actionType.enum"
import DataService from "../../services/data.service"

export const addNewPatient = (patientDetails: any) => {
  return (dispatch: Function) => {
    const { name, contactNumber, lastCheckupDate, nextCheckupDate } = patientDetails;
    DataService.get("addNewPatient", { name, contactNumber, lastCheckupDate, nextCheckupDate }, "", {}).then(
      (response: any) => {
        if (response && !DataService.isObjectEmpty(response)) {
          dispatch({
            type: ACTION_TYPES.ADD_PATIENT_SUCCESS,
            data: true
          })
        } else {
          dispatch({
            type: ACTION_TYPES.ADD_PATIENT_ERROR,
            data: false
          })
        }
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}

export const updatePatientDetails = (patientDetails: any) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_PATIENT_DETAILS,
      data: patientDetails,
    })
  }
}