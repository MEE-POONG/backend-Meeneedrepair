import Link from 'next/link';
import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Image, Navbar } from 'react-bootstrap';
import { FaArrowRight, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';

interface FooterProps { }

const TheFooter: React.FC = () => {

  return (
      <footer className="pt-4">
        <div className="bg-white rounded-top p-3">
          <div className="row">
            <div className="col-12 col-sm-6 text-center text-sm-start">
              &copy; <a href="#">Your Site Name</a>, All Right Reserved.
            </div>
            <div className="col-12 col-sm-6 text-center text-sm-end">
              Designed By <a href="https://htmlcodex.com">HTML Codex</a>{' '}{' '}
              Distributed By: <a href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default TheFooter;
