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
            MeePrompt
          </h3>
        </Link>
        <TheButtonOffcanvas show={show} onToggleShow={onToggleShow} />
        <TheBreadcrumb />
        <div className="navbar-nav align-items-center ms-auto">
          {/* <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <i className="me-lg-2">
                <FaRegEnvelope />
              </i>
              <span className="d-none d-lg-inline-flex">Message</span>
            </>}
            menuVariant="dark"
          >
            <NavDropdown.Item href="#action/3.4">
              <div className="d-flex align-items-center">
                <Image className="rounded-circle" src={IMG_URL + '/images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <div className="d-flex align-items-center">
                <Image className="rounded-circle" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <div className="d-flex align-items-center">
                <Image className="rounded-circle" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4" className="text-center">
              See all notifications
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <i className="me-lg-2">
                <FaBell />
              </i>
              <span className="d-none d-lg-inline-flex">Notificatin</span>
            </>}
            menuVariant="dark"
          >
            <NavDropdown.Item href="#action/3.4">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4" className="text-center">
              See all notifications
            </NavDropdown.Item>
          </NavDropdown> */}
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
