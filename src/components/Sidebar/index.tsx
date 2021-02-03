import React from 'react'

import './index.style.scss'

const Sidebar = ({userDetails}:any) => (
  <div className='sidebar'>
    {userDetails &&
      <>  
        <div className='user-avatar'>
          {userDetails.username[0]}
        </div>
        <div className='user-name'>
          {userDetails.username}
        </div>
      </>
    }
  </div>
)

export default Sidebar;