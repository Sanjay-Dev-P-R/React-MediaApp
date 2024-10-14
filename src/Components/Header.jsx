import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';


function Header() {
  return (
    <>
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          {/* <img
            src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
            height='30'
            alt=''
            loading='lazy'
          /> */}<i className="fa-solid fa-compact-disc m-1"></i>
          Media App
        </MDBNavbarBrand>
      </MDBContainer>
    </MDBNavbar>
  </>
  )
}

export default Header