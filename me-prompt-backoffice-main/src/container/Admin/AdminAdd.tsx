import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { FaLine, FaMailBulk, FaPhoneAlt, FaPowerOff, FaSearch, FaTag, FaTags, FaUnlockAlt, FaUserAlt } from 'react-icons/fa';
import { RiBankCard2Line, RiBankLine } from 'react-icons/ri';

const AdminAdd: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <>
            <Button className="ms-2 btn" bsPrefix="icon" onClick={handleShowModal}>
                เพิ่ม Admin
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header >
                    เพิ่มข้อมูลแอดมินใหม่
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaUserAlt />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaUnlockAlt />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaTag />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Firstname"
                                    aria-label="Firstname"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaTags />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Lastname"
                                    aria-label="Lastname"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <RiBankLine />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Bank"
                                    aria-label="Bank"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <RiBankCard2Line />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="BankAccount"
                                    aria-label="BankAccount"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaPhoneAlt />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Phone"
                                    aria-label="Phone"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaLine />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Line"
                                    aria-label="Line"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaMailBulk />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="email"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-success py-2 px-2" onClick={handleCloseModal}>
                        ยืนยัน
                    </Button>
                    <Button className="btn-danger py-2 px-2" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminAdd;
