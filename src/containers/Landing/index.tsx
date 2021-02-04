import React from "react"
import Modal from "react-modal"
import mSwasthMockImg from "../../assets/img/mswasth-mock.png"
import Header from "../../components/Header"
import Login from "../Login"

import "./index.style.scss"

Modal.setAppElement("#root")

const customStyles = {
  overlay: {
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    border: "none",
    background: "none",
    top: "50%",
    transform: "translate(0, -50%)",
  },
}

interface Props {}

interface State {
  isLoginModalOpen: boolean
}

class Landing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isLoginModalOpen: false,
    }
  }

  handleLoginClick = () => {
    this.setState({ isLoginModalOpen: true })
  }

  componentDidMount() {}

  render() {
    return (
      <div className="mswasth-crm-page">
        <Header onLoginClick={this.handleLoginClick} />
        <div className='marketing-gimmick'>
          <h3>Empower your practice with mSwasth</h3>
            <p>
              Simplifying the doctor patient interaction during the course of treatment
            </p>
        </div>
        <div className="meta-info-container">
          <div className="meta-info-doctors">
            <h3>Doctors</h3>
            <ul>
              <li>Stay connected and educate your patients throughout their treatment</li>
              <li>Schedule revisits with automated reminders</li>
              <li>Improve patient referrals with better health outcomes</li>
            </ul>
          </div>
          <div className="meta-info-image">
            <img alt="mswasth" src={mSwasthMockImg} className="mock-image" />
          </div>
          <div className="meta-info-patients">
            <h3>Patients</h3>
            <ul>
              <li>No additional app needed, patient can just chat directly</li>
              <li>No app training required for WhatApp</li>
              <li>Communication in local language is possible</li>
            </ul>
          </div>
        </div>
        <Modal
          isOpen={this.state.isLoginModalOpen}
          onRequestClose={() => {
            this.setState({ isLoginModalOpen: false })
          }}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          contentLabel="Login"
        >
          <Login />
        </Modal>
      </div>
    )
  }
}

export default Landing
