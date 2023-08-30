import { bankMap } from '@/data/test';
import { Member } from '@prisma/client';
import React, { useState } from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye } from 'react-icons/fa';

interface PartnerViewMemberModalProps {
    data: Member;
}
const PartnerViewMemberModal: React.FC<PartnerViewMemberModalProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const bankObj = bankMap.find(b => b.value === data?.bank);

    return (
        <>
            <Button className="mx-1 btn success" bsPrefix="icon" onClick={handleShow}>
                <FaRegEye />
                <span className="h-tooltiptext">ดูข้อมูล</span>
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>ข้อมูล </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg="4">
                            ชื่อ : {data?.firstname + " " + data?.lastname}
                        </Col>
                        <Col lg="4">
                            tel : {data?.phone}
                        </Col>
                        <Col lg="4">
                            line : {data?.line}
                        </Col>
                        <Col lg="4">
                            email : {data?.email}
                        </Col>
                        <Col >
                            {bankObj &&
                                <Image src={bankObj.image} alt={bankObj.value} style={{ width: '20px', marginRight: '10px' }} />
                            }
                            เลขบัญชี : {data?.bankAccount}
                        </Col>
                    </Row>
                    <div className='mt-3'>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <br />
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PartnerViewMemberModal;
