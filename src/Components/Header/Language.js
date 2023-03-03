import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
function Language() {
   return (
      <div>
         <NavDropdown title='English' id="basic-nav-dropdown" className='pe-md-2 pe-xxl-4 me-md-5 drop-down-section drop-down-hide-toggle' >
            <NavDropdown.Item href="#action/3.3">English</NavDropdown.Item>
            <NavDropdown.Item >Việt Nam</NavDropdown.Item>
         </NavDropdown>
      </div>
   )
}

export default Language