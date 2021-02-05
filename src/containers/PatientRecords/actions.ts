import ACTION_TYPES from "./actionType.enum"
import DataService from "../../services/data.service"

const dummyPatients = [
  {
    name: "Mrs. Shashi",
    contact_number: "9823722332",
    last_checkdate: 1611426600000,
    next_checkdate: 1612377000000,
  },
  {
    name: "Mr. Akash",
    contact_number: "9823722332",
    last_checkdate: 1611426600000,
    next_checkdate: 1612463400000,
  },
  {
    name: "Mrs. Virali",
    contact_number: "9823722332",
    last_checkdate: 1611513000000,
    next_checkdate: 1612463400000,
  },
  {
    name: "Mr. Sanjay",
    contact_number: "9823722332",
    last_checkdate: 1611513000000,
    next_checkdate: 1612549800000,
  },
  {
    name: "Mrs. Akriti",
    contact_number: "9823722332",
    last_checkdate: 1611685800000,
    next_checkdate: 1612549800000,
  },
  {
    name: "Mr. Shashi",
    contact_number: "9823722332",
    last_checkdate: 1611685800000,
    next_checkdate: 1612722600000,
  },
  {
    name: "Mr. Gulati",
    contact_number: "9823722332",
    last_checkdate: 1611772200000,
    next_checkdate: 1612722600000,
  },
  {
    name: "Mrs. Khambiya",
    contact_number: "9823722332",
    last_checkdate: 1611772200000,
    next_checkdate: 1612895400000,
  },
  {
    name: "Mr. Amol",
    contact_number: "9823722332",
    last_checkdate: 1611858600000,
    next_checkdate: 1612895400000,
  },
  {
    name: "Mrs. Shivani",
    contact_number: "9823722332",
    last_checkdate: 1611858600000,
    next_checkdate: 1612981800000,
  },
  {
    name: "Mrs. Shivani",
    contact_number: "9823722332",
    last_checkdate: 1611858600000,
    next_checkdate: 1612981800000,
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
        { fake: false, data: {data: dummyPatients} }
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

