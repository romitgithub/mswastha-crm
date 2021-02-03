const APP_INITIAL_STATE: any = {
  loading: false,
  loginReducer: {
    loginDetails: {
      username: '',
      password: ''
    },
    userDetails: null,
    loggedIn: false,
    loggedOut: false
  },
  patientRecordsReducer: {
    patientRecords: {
      list: [],
      pagination: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  }
}

export default APP_INITIAL_STATE
