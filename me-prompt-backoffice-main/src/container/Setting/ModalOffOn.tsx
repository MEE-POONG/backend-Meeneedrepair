import React, { useState } from 'react';
import { Container, Row, Col, Button, Image, Modal } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import { FaPowerOff } from 'react-icons/fa';

const ModalOffOn: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <>
            <Button className="ms-2 btn danger" bsPrefix="icon">
                <FaPowerOff />
                <span className="h-tooltiptext">ปิดใช้งาน</span>
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Body className="p-0">
                    <iframe
                        title="Video"
                        width="100%"
                        height="480"
                        src="https://www.youtube.com/embed/w9x95BR8aX0"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: "5px 5px 0 0" }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-primary py-2 px-2" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalOffOn;
