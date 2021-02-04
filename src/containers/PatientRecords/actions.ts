import ACTION_TYPES from "./actionType.enum"
import DataService from "../../services/data.service"

const dummyPatients = [
  {
    name: "Mrs. Shashi",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611426600000,
    nextCheckupTimestamp: 1612377000000,
  },
  {
    name: "Mr. Akash",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611426600000,
    nextCheckupTimestamp: 1612463400000,
  },
  {
    name: "Mrs. Virali",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611513000000,
    nextCheckupTimestamp: 1612463400000,
  },
  {
    name: "Mr. Sanjay",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611513000000,
    nextCheckupTimestamp: 1612549800000,
  },
  {
    name: "Mrs. Akriti",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611685800000,
    nextCheckupTimestamp: 1612549800000,
  },
  {
    name: "Mr. Shashi",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611685800000,
    nextCheckupTimestamp: 1612722600000,
  },
  {
    name: "Mr. Gulati",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611772200000,
    nextCheckupTimestamp: 1612722600000,
  },
  {
    name: "Mrs. Khambiya",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611772200000,
    nextCheckupTimestamp: 1612895400000,
  },
  {
    name: "Mr. Amol",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611858600000,
    nextCheckupTimestamp: 1612895400000,
  },
  {
    name: "Mrs. Shivani",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611858600000,
    nextCheckupTimestamp: 1612981800000,
  },
  {
    name: "Mrs. Shivani",
    mobileNumber: "9823722332",
    lastCheckupTimestamp: 1611858600000,
    nextCheckupTimestamp: 1612981800000,
  },
]

const dummyPatientRecords = {
  list: dummyPatients,
  pagination: {
    totalPages: 2,
    pageNumber: 1,
    pageSize: 10,
  },
}

export const getPatientRecords = (pagination: any) => {
  return async (dispatch: Function) => {
    const loggedInUser = await DataService.getLoggedInUserFromStorage()
    if (loggedInUser) {
      DataService.get(
        "getPatientRecords",
        loggedInUser,
        {},
        { fake: false, data: dummyPatientRecords }
      ).then((response: any) => {
        if (response && response.data) {
          dispatch({
            type: ACTION_TYPES.PATIENT_RECORDS_SUCCESS,
            data: response.data,
          })
        }
      })
    } else {
    }
  }
}

export const toggleAddPatientModal = (isOpen: boolean) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_ADD_PATIENT_MODAL,
      data: isOpen,
    })
  }
}

