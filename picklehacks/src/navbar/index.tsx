import React from 'react';
import './index.css';

import basketball from './images/basketball.png';

function Navbar() {
  return (
    <div className="navbar">
      <img src={basketball} style={{marginLeft: 10, marginTop: 10, height: 50}} />
    </div>
  );
}

export default Navbar;