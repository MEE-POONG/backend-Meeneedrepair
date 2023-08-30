// Navbar.tsx
import React from 'react';
import Head from 'next/head';
import { Navbar, Container, Nav, NavDropdown, Image, Button, Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';
import { FaBars, FaBell, FaRegEnvelope, FaUserEdit } from 'react-icons/fa';
import { TheButtonOffcanvas } from './TheOffcanvas';
import TheBreadcrumb from './TheBreadcrumb';

interface TheSEOProps {
    show: boolean;
    onToggleShow: () => void;
}

const TheSEO: React.FC<TheSEOProps> = ({ show, onToggleShow }) => {

    return (
        <Head>
            <title>Wellcome | MePrompt-BackOffice</title>
            <meta
                name="description"
                content="T ACTIVE"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default TheSEO;
