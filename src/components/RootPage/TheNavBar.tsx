// Navbar.tsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Image, Button, Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import { FaBars, FaBell, FaRegEnvelope, FaUserEdit } from 'react-icons/fa';
import { TheButtonOffcanvas } from './TheOffcanvas';
import TheBreadcrumb from './TheBreadcrumb';

interface TheNavBarProps {
  show: boolean;
  onToggleShow: () => void;
}

const TheNavBar: React.FC<TheNavBarProps> = ({ show, onToggleShow }) => {

  return (
    <Navbar className="navbar-expand navbar-head sticky-top px-4 py-0">

      <Container fluid>
        <Link href="/" className="navbar-brand me-4">
          <h3 className="text-primary">
            <FaUserEdit className="fa me-2" />
            Mee Need Repai
          </h3>
        </Link>
        <TheButtonOffcanvas show={show} onToggleShow={onToggleShow} />
        {/* <TheBreadcrumb /> */}
        
        
          <div className="navbar-nav align-items-center ms-auto">
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <Image className="rounded-circle me-lg-2" src={'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/947130a0-adde-4905-9003-48e461328800/100'} alt="" style={{ width: "30px", height: "30px" }} />
              <span className="d-none d-lg-inline-flex">มอง มอง</span>
            </>}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default TheNavBar;
