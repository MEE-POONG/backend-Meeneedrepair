import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, DropdownButton, FloatingLabel, Form, Image, InputGroup, Modal, Row } from "react-bootstrap";
import useAxios from "axios-hooks";
import { userAGAddPartner } from "@/data/formData";
import BasicInput from "@/components/Input/Basic";
import { FaPencilRuler } from "react-icons/fa";
import BasicSearchInput from "@/components/Input/BasicSearch";
interface AddPartnerProps {
    setID: string;
}
const AddPartner: React.FC<AddPartnerProps> = ({ setID }) => {
    const [show, setShow] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [showValidation, setShowValidation] = useState(false);
    const [nameKey, setNameKey] = useState<string>("");
    const [{ data: searchData, loading: searchLoadding, error: searchError }, userAGSearch] = useAxios({}, { autoCancel: false });
    useEffect(() => {
        userAGSearch({
            url: `/api/member/search?page=1&pageSize=10&keyword=${nameKey}`,
            method: "GET",
        })
    }, [nameKey]);
    useEffect(() => {
        console.log(searchData);
    }, [searchData]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button className={`mx-2 btn ${show ? 'active' : ''}`} bsPrefix="icon" onClick={handleShow}>
                <FaPencilRuler />
                <span className="h-tooltiptext">เพิ่มพาร์ทเนอร์</span>
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header  >
                    <Modal.Title >เลือกพาร์ทเนอร์ </Modal.Title>
                    <Button variant="close" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12} lg={12} >
                            <Form.Group className="mb-3 position-relative" controlId={`memberID`}>
                                <Form.Label>เลือกพาร์ทเนอร์</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'คีย์ค้นหา'}
                                    // name={title}
                                    // value={valueShow}
                                    onChange={e => setNameKey(e.target.value)}
                                // isValid={showValidation && isValid === true}
                                // isInvalid={showValidation && isValid === false}
                                // autoComplete={"off"} 
                                // disabled={disabled}
                                />
                                {showValidation && isValid === false && <Form.Control.Feedback type="invalid">
                                    {/* {invalidFeedback} */}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                bsPrefix="icon" className={`ms-2 btn `}>
                                จ่าย
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                bsPrefix="icon" className={`ms-2 btn ${false ? 'active' : ''}`}>
                                จ่าย
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                    //  onClick={handleAddPartner}
                    >
                        ยืนยันพาร์ทเนอร์
                    </Button>
                </Modal.Footer>
            </Modal>
        </ >
    );
}
export default AddPartner;