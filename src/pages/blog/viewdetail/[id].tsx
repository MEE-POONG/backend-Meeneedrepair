
import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaNewspaper } from "react-icons/fa";
import { Blog } from "@prisma/client";
import ActivityAdd from '../addblog';


export default function ViewDetail(props: { data: any }) {
    const conponentPDF = useRef<HTMLDivElement>(null);
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);

    return (
        <>
            <Button
                bsPrefix="create"
                className={`btn icon ${showCheck ? "active" : " "} `}
                onClick={handleShow}
            >
                <FaNewspaper />
                <span className="h-tooltiptext">ดูรายละเอียด</span>
            </Button>


            <Modal show={showCheck} onHide={handleClose} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        รายละเอียด BLOG : {props?.data?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>


                        <div className="container">
                            <div className="my-2">
                                <h4 className="">ชื่อ BLOG : {props?.data?.title} </h4>
                                <h4 className="my-2">หัวข้อ BLOG : {props?.data?.subtitle} </h4>
                                <Row className="my-2">
                                    <img className="my-2" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${props?.data?.img}/500`} alt="Img" />
                                </Row>
                                <h4 className="my-2">รายละเอียด BLOG :</h4>

                                <p>
                                    {props?.data?.detail}
                                </p>



                            </div>
                        </div>
                    </div>

                    {/* <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        <button className="btn btn-success" onClick={generatePDF}>สั่งพิมพ์</button>
                    </div> */}



                </Modal.Body>
            </Modal>

        </>
    )
}