import React from 'react'
import Modal from 'react-modal';
import mSwasthMockImg from '../../assets/img/mswasth-mock.png';
import Header from '../../components/Header';
import Login from '../Login';

import './index.style.scss';

Modal.setAppElement('#root')

const customStyles = {
  overlay: {
    inset                   : 0,
    backgroundColor         : "rgba(0,0,0,0.5)"
  },
  content: {
    border          : 'none',
    background: 'none',
    top             : '50%',
    transform       : 'translate(0, -50%)'
  }
};

interface Props {

}

interface State {
  isLoginModalOpen: boolean
}

class Landing extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoginModalOpen: false
    }
  }

  handleLoginClick = () => {
    this.setState({ isLoginModalOpen: true });
  }

  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className='mswasth-crm-page'>
        <Header onLoginClick={this.handleLoginClick} />
        <div className='meta-info-container'>
          <div className='meta-info-text'>
            <h3>
              Empower your practice with mSwasth
            </h3>
            <p>WhatsApp is the most popular messaging platform in India with 400mn+ users.</p>
            <p>Just sign up and add patient details to get started.</p>
          </div>
          <div className='meta-info-image'>
            <img src={mSwasthMockImg} className='mock-image' />
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

export default Landing;