import React, { useState } from 'react';
import { Offcanvas, Button, Nav, Image, Dropdown, NavDropdown } from 'react-bootstrap';
import { FaBars, FaRegEnvelope, FaShoppingBag, FaTachometerAlt, FaUserEdit } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface TheOffcanvasProps {
    show: boolean;
    onToggleShow: () => void;
}

const TheOffcanvas: React.FC<TheOffcanvasProps> = ({ show, onToggleShow }) => {
    const handleClose = () => onToggleShow();
    const { asPath } = useRouter();
    const [checkClickPath, setCheckClickPath] = useState<string>('/');
    useEffect(() => {
        setCheckClickPath(asPath);
    }, [asPath])
    const handlePath = (valPath: string): void => { checkClickPath === valPath ? setCheckClickPath('') : setCheckClickPath(valPath) };
    const navItems = [
        {
            id: "partner",
            label: "Partner",
            icon: <FaTachometerAlt />,
            path: "/partner",
            subItems: [
                { label: "พันธมิตร", path: "/partner" },
                { label: "UserAg", path: "/partner/user-ag" }
            ]
        },
        {
            id: "bot-auto",
            label: "Bot Auto",
            icon: <FaTachometerAlt />,
            path: "/bot",
            subItems: [
                { label: "คำสั่งบอท", path: "/bot" },
                { label: "ลูกค้า", path: "/bot/customer" },
                { label: "เอเย่น", path: "/bot/agent" },
                { label: "มาสเตอร์", path: "/bot/master" }
            ]
        },
        // ... Add other sections similarly
    ];
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={false} scroll={true} >
                <Offcanvas.Body className='ps-0 pe-2'>
                    <Link href="/" className={asPath === "/" ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">Home</span>
                    </Link>
                    <div id="partner" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/partner')} className={asPath === "/partner" || asPath === "/partner/add" || asPath === "/partner/user-ag" || asPath.startsWith("/partner/edit/") ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Partner</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/partner" || checkClickPath === "/partner/user-ag" || checkClickPath === "/partner" || asPath === "/partner/add" || asPath.startsWith("/partner/edit/")} >
                            <Link href="/partner" className={asPath === "/partner" || asPath === "/partner/add" || asPath.startsWith("/partner/edit/") ? "nav-link active" : "nav-link"}>
                                <span>พันธมิตร</span>
                            </Link>
                            <Link href="/partner/user-ag" className={asPath === "/partner/user-ag" ? "nav-link active" : "nav-link"}>
                                <span>UserAg</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    <div id="bot-auto" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/bot')} className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Bot Auto</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/bot" || checkClickPath === "/bot/agent" || checkClickPath === "/bot/listname"} >
                            <Link href="/bot" className={asPath === "/bot" ? "nav-link active" : "nav-link"}>
                                <span>คำสั่งบอท</span>
                            </Link>
                            <Link href="/bot/customer" className={asPath === "/bot" || asPath === "/bot/customer" ? "nav-link active" : "nav-link"}>
                                <span>ลูกค้า</span>
                            </Link>
                            <Link href="/bot/agent" className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-link active" : "nav-link"}>
                                <span>เอเย่น</span>
                            </Link>
                            <Link href="/bot/master" className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-link active" : "nav-link"}>
                                <span>มาสเตอร์</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    <div id="income" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/income')} className={asPath === "/income" || asPath === "/income/agent" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">income Auto</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/income" || checkClickPath === "/income/agent" || checkClickPath === "/income/listname"} >
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียลูกค้า</span>
                            </Link>
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียเอเย่น</span>
                            </Link>
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    <div id="setting" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/setting')} className={asPath === "/setting" || asPath === "/setting/admin" || asPath === "/setting/admin/team" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Setting</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/setting" || checkClickPath === "/setting/admin" || checkClickPath === "/setting/admin/team"} >
                            <Link href="/setting" className={asPath === "/setting" ? "nav-link active" : "nav-link"}>
                                <span>ติดต่อเรา</span>
                            </Link>
                            <Link href="/setting/admin" className={asPath === "/setting/admin" || asPath === "/setting/admin/team" ? "nav-link active" : "nav-link"}>
                                <span>แอดมิน</span>
                            </Link>

                        </Dropdown.Menu>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
};
const TheButtonOffcanvas: React.FC<TheOffcanvasProps> = ({ show, onToggleShow }) => {
    const handleShow = () => onToggleShow();
    return (
        <Button onClick={handleShow} bsPrefix={`slide-toggle-icon ${show ? 'active' : ''} me-auto`}>
            <FaBars />
        </Button>
    );
}
export { TheButtonOffcanvas };
export default TheOffcanvas;
