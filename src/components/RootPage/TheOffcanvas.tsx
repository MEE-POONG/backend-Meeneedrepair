import React, { useState } from 'react';
import { Offcanvas, Button, Nav, Image, Dropdown, NavDropdown } from 'react-bootstrap';
import { FaBars, FaRegEnvelope, FaShoppingBag, FaTachometerAlt, FaUserEdit } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Blog } from '@prisma/client';

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

                    <div id="Repairreport" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/news')} className={asPath === "/news" || asPath === "/news" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">จัดการข่าว</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/news" || checkClickPath === "/news" || checkClickPath === "/blog"} >
                            <Link href="/news" className={asPath === "/news" || asPath === "/news/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>ข่าว</span>
                            </Link>
                            <Link href="/blog" className={asPath === "/blog" || asPath === "/blog" ? "nav-link active" : "nav-link"}>
                                <span>บล็อค</span>
                            </Link>
                            {/* <Link href="/product" className={asPath === "/product" || asPath === "/product/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link> */}
                        </Dropdown.Menu>
                    </div>




                    <div id="Repairreport" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/appointment')} className={asPath === "/appointment" || asPath === "/appointment/reportproduct" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">แจ้งซ่อม</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/appointment" || checkClickPath === "/appointment/reportproduct" || checkClickPath === "/appointment/listname"} >
                            <Link href="/appointment" className={asPath === "/appointment" || asPath === "/appointment/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>แจ้งเตือนการซ่อม</span>
                            </Link>
                            {/* <Link href="/product/reportproduct" className={asPath === "/product" || asPath === "/product/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>รายงานสินค้า</span>
                            </Link> */}
                            {/* <Link href="/product" className={asPath === "/product" || asPath === "/product/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link> */}
                        </Dropdown.Menu>
                    </div>



                    <div id="Product" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/product')} className={asPath === "/product" || asPath === "/product/reportproduct" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">รายการสินค้า</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/product" || checkClickPath === "/product/reportproduct" || checkClickPath === "/product/listname"} >
                            <Link href="/product" className={asPath === "/product"  ? "nav-link active" : "nav-link"}>
                                <span>สินค้า</span>
                            </Link>
                            <Link href="/product/reportproduct" className={ asPath === "/product/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>รายงานสินค้า</span>
                            </Link>
                            {/* <Link href="/product" className={asPath === "/product" || asPath === "/product/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link> */}
                        </Dropdown.Menu>
                    </div>



                    {/* <div id="News" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/news')} className={asPath === "/news" || asPath === "/news/reportproduct" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">ข่าว</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/news" || checkClickPath === "/news/reportproduct" || checkClickPath === "/news/listname"} >
                            <Link href="/news" className={asPath === "/news" || asPath === "/news/reportproduct" ? "nav-link active" : "nav-link"}>
                                <span>จัดการข่าว</span>
                            </Link>
                           
                        </Dropdown.Menu>
                    </div> */}




                    <div id="settingpages" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/settingpages')} className={asPath === "/settingpages" || asPath === "/settingpages/admin" || asPath === "/settingpages/admin/team" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">ตั้งค่า</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/settingpages" || checkClickPath === "/settingpages/admin" || checkClickPath === "/settingpages/admin/team"} >
                            <Link href="/settingpages" className={asPath === "/settingpages" ? "nav-link active" : "nav-link"}>
                                <span>ตั้งค่าเพจ</span>
                            </Link>
                            <Link href="/settingpages/admin" className={asPath === "/settingpages/admin" || asPath === "/settingpages/admin/team" ? "nav-link active" : "nav-link"}>
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
