import React from "react"
import { connect } from "react-redux"
import { getPatientRecords } from "./actions"
import { logoutUser, saveUserDetails } from "../Login/actions"
import Header from "../../components/Header"

import "./index.style.scss"
import DataService from "../../services/data.service"

interface Props {
  patientRecords: any
  userDetails: any
  getPatientRecords: Function
  logoutUser: Function
  saveUserDetails: Function
  loggedOut: boolean
  history: any
}

class PatientRecords extends React.Component<Props> {
  componentDidMount() {
    this.getAuthDetails()
    this.props.getPatientRecords(this.props.patientRecords.pagination)
  }

  getAuthDetails = () => {
    DataService.getLoggedInUserFromStorage().then(user => {
      if (user) {
        this.props.saveUserDetails(user)
      }
    })
  }

  render() {
    console.log(this.props)
    const { patientRecords, userDetails, loggedOut } = this.props

    if (loggedOut) {
      this.props.history.replace({ pathname: "/" })
    }

    return (
      <>
        {userDetails ? (
          <div className="patient-records-container">
            <Header
              userDetails={userDetails}
              onLogoutClick={() => this.props.logoutUser()}
            />
            <div className="patients-container">
              <div className="patients-header">
                <div className="header-text">
                  Dr. {userDetails.username} / {patientRecords.length} patients{" "}
                </div>
                <button className="form-button">Add New Patient</button>
              </div>
              <div className="patient-list">
                {patientRecords &&
                  patientRecords.length &&
                  patientRecords.map((patientItem: any, index: number) => (
                    <div
                      className="patient-card"
                      key={`${patientItem.doc_id}${index}`}
                    >
                      <div className="patient-name">{patientItem.name}</div>
                      <div className="patient-number">
                        {patientItem.contact_number}
                      </div>
                      <div className="patient-next-appointment">
                        <p>Next Appointment</p>
                        <p>{patientItem.next_checkdate}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
    patientRecords: state.patientRecordsReducer.patientRecords,
    userDetails: state.loginReducer.userDetails,
    loggedOut: state.loginReducer.loggedOut,
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  getPatientRecords: (pagination: any) => {
    dispatch(getPatientRecords(pagination))
  },
  logoutUser: () => {
    dispatch(logoutUser())
  },
  saveUserDetails: (userDetails: any) => {
    dispatch(saveUserDetails(userDetails))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientRecords)
