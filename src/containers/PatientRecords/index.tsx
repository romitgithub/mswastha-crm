import React from "react"
import { connect } from "react-redux"
import { getPatientRecords } from './actions';
import { logoutUser, saveUserDetails } from '../Login/actions';
import Header from '../../components/Header';

import "./index.style.scss"
import DataService from "../../services/data.service";

interface Props {
  patientRecords: any,
  userDetails: any,
  getPatientRecords: Function,
  logoutUser: Function,
  saveUserDetails: Function,
  loggedOut: boolean,
  history: any
}

class PatientRecords extends React.Component <Props>{
  
  componentDidMount() {
    this.getAuthDetails();
    this.props.getPatientRecords(this.props.patientRecords.pagination)
  }

  getAuthDetails = () => {
    DataService.getLoggedInUserFromStorage().then(user => {
      if (user) {
        this.props.saveUserDetails(user);
      }
    })
  }
  
  render() {
    console.log(this.props);
    const { patientRecords, userDetails, loggedOut } = this.props;
    const { list: patientList, pagination } = patientRecords;
    
    if (loggedOut) {
      this.props.history.replace({pathname: '/'})
    }

    return (
      <div className='patient-records-container'>
        { userDetails ?
          <>
          <Header userDetails={userDetails} onLogoutClick={() => this.props.logoutUser()}/>
          { patientRecords && patientRecords.length &&
            (<div className='patient-list'>
              {
                patientRecords.map((patientItem: any, index: number) => (
                  <div className='patient-card' key={`${patientItem.doc_id}${index}`}>
                    <div className='patient-name'>{patientItem.name}</div>
                    <div className='patient-number'>{patientItem.contact_number}</div>
                    <div className='patient-next-appointment'>
                      <p>Next Appointment</p>
                      <p>{patientItem.next_checkdate}</p>
                    </div>
                  </div>
              ))}
            </div>
            )}
          </> : 
          <p>logged out...</p>
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    patientRecords: state.patientRecordsReducer.patientRecords,
    userDetails: state.loginReducer.userDetails,
    loggedOut: state.loginReducer.loggedOut
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientRecords)