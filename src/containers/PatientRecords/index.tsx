import React from "react"
import { connect } from "react-redux"
import Modal from "react-modal"
import { getPatientRecords, toggleAddPatientModal } from "./actions"
import { logoutUser, saveUserDetails } from "../Login/actions"
import Header from "../../components/Header"

import "./index.style.scss"
import './index.style.mobile.scss'
import DataService from "../../services/data.service"
import AddPatient from "../AddPatient"

Modal.setAppElement("#root")

const customStyles = {
  overlay: {
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    inset: 0,
    border: "none",
    background: "none",
  },
}

interface Props {
  patientRecords: any
  userDetails: any
  getPatientRecords: Function
  logoutUser: Function
  saveUserDetails: Function
  loggedOut: boolean
  history: any,
  toggleAddPatientModal: Function,
  isAddPatientModalOpen: boolean
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
    const { patientRecords, userDetails, loggedOut, isAddPatientModalOpen } = this.props

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
                <button className="form-button" onClick={() => this.props.toggleAddPatientModal(true)}>Add New Patient</button>
              </div>
              <div className="patient-list">
                {patientRecords &&
                  patientRecords.length &&
                  patientRecords.map((patientItem: any, index: number) => (
                    <div
                      className="patient-card"
                      key={`${patientItem.doc_id}${index}`}
                    >
                      <div className='patient-card-inner'>
                        <div>
                        <div className="patient-name">{patientItem.name}</div>
                        <div className="patient-number">
                          {patientItem.contact_number}
                          </div>
                          </div>
                        <div className="patient-next-appointment">
                          <p>Next Appointment</p>
                          <p>{patientItem.next_checkdate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <Modal
              isOpen={isAddPatientModalOpen}
              style={customStyles}
              shouldCloseOnEsc={true}
              shouldCloseOnOverlayClick={true}
              onRequestClose={() => this.props.toggleAddPatientModal(false)}
            >
              <AddPatient closeModal={(newPatientAdded: boolean) => { this.props.toggleAddPatientModal(false); this.props.getPatientRecords() }}/>
            </Modal>
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
    isAddPatientModalOpen: state.patientRecordsReducer.isAddPatientModalOpen
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
  toggleAddPatientModal: (isOpen: boolean) => {
    dispatch(toggleAddPatientModal(isOpen))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientRecords)
