import React, { useState } from 'react';
import wookie from "../images/wookie logo.jpg"
import "./Navbar.css"
function Navbar() {
 

  return (
    <div id="headhome">
      <nav className="topnav">
        {/* <input type="checkbox" id="check" onChange={handleCheckboxChange} checked={isChecked} /> */}

        <img className="comradeimg" src={wookie} alt="App Logo" />
        <label className="comradename">Wookie Movies</label>
        
       
      </nav>
    </div>
  );
}

export default Navbar;
