import React from 'react';

import './index.style.scss';

const Header = ({userDetails, onLoginClick, onLogoutClick} : any) => (
  <div className='header'>
    <div className='app-title'>
      mSwasth
    </div>
    { userDetails ?
      <button className='form-button logout' onClick={() => onLogoutClick()}>Logout</button>  
      :
      <button className='form-button' onClick={() => onLoginClick()}>Login</button>
    }
    
  </div>
)

export default Header;