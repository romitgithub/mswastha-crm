import React from 'react';
import { connect } from 'react-redux';
import { addNewPatient, updatePatientDetails } from './actions';

import './index.style.scss';

interface Props {
  patientDetails: any,
  updatePatientDetails: Function,
  addNewPatient: Function,
  newPatientAdded: boolean,
  closeModal: Function,
  userDetails: any
}

class AddPatient extends React.Component<Props>{
  
  updatePatientDetails = (key: string, value: string) => {
    this.props.updatePatientDetails({
      ...this.props.patientDetails,
      [key]: value
    })
  }
  
  render() {
    const { name, contactNumber, lastCheckupDate, nextCheckupDate } = this.props.patientDetails;

    if (this.props.newPatientAdded && this.props.closeModal) {
      this.props.closeModal(this.props.newPatientAdded);
    }

    return (
      <div className="add-patient-container">
        <div className="form-field">
          <label>Patient Name</label>
          <input
            type="text"
            value={name}
            onChange={e => {
              this.updatePatientDetails('name', e.target.value)
            }}
          />
        </div>
        <div className="form-field">
          <label>Contact Number</label>
          <input
            type="number"
            maxLength={10}
            value={contactNumber}
            onChange={e => {
              this.updatePatientDetails('contactNumber', e.target.value)
            }}
          />
        </div>
        <div className='form-field'>
          <label>Last Checkup Date</label>
          <input
            type='date'
            value={lastCheckupDate}
            className='datepicker'
            onChange={e => {
              this.updatePatientDetails('lastCheckupDate', e.target.value)
            }}
          />
        </div>
        <div className='form-field'>
          <label>Next Checkup Date</label>
            <input
            type='date'
            value={nextCheckupDate}
            className='datepicker'
            onChange={e => {
              this.updatePatientDetails('nextCheckupDate', e.target.value)
            }}
          />
        </div>
        <button
          className="form-button"
          onClick={() => this.props.addNewPatient(this.props.patientDetails, this.props.userDetails)}
        >
          Add Patient
        </button>
        </div>
      )
  }
}

const mapStateToProps = (state: any) => ({
  patientDetails: state.newPatientReducer.patientDetails,
  newPatientAdded: state.newPatientReducer.newPatientAdded,
  userDetails: state.loginReducer.userDetails
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePatientDetails: (patientDetails: any) => {
    dispatch(updatePatientDetails(patientDetails))
  },
  addNewPatient: (patientDetails: any, userDetails: any) => {
    dispatch(addNewPatient(patientDetails, userDetails))
  }
})

export default connect(mapStateToProps, mapDispatchToProps) (AddPatient)