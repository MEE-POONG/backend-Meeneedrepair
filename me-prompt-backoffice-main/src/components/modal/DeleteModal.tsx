import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrashAlt } from 'react-icons/fa';
interface DeleteModalProps {
    data: any;
    apiDelete: () => Promise<any>; // add this line
}
const DeleteModal: React.FC<DeleteModalProps> = ({ data, apiDelete }) => {
    const [show, setShow] = useState<boolean>(false);
    const [checkDelete, setCheckDelete] = useState<string>("not");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let heading = `ลบข้อมูล : ${data?.firstname !== undefined ? data?.firstname : ""} ${data?.lastname !== undefined ? data?.lastname : ""} ${data?.userAG !== undefined ? data?.userAG : ""}`;
    let detail = `ต้องการลบข้อมูลใช่หรือไม่`;
    let variant = "";

    if (checkDelete === 'success') {
        variant = 'success';
        detail = 'ลบข้อมูลสำเร็จ';
    } else if (checkDelete === 'primary') {
        variant = 'primary';
        detail = 'กำลังลบข้อมูล';
    } else if (checkDelete === 'danger') {
        variant = 'danger';
        detail = 'Error ลบข้อมูลไม่สำเร็จ';
    } else if (checkDelete === 'warning') {
        variant = 'warning';
        detail = 'กรอกข้อมูลไม่ครบ';
    }
    const handleDelete = () => {
        setCheckDelete("primary");
        apiDelete().then(() => {
            setCheckDelete("success");
            setTimeout(() => {
                setCheckDelete("not");
                handleClose();
            }, 1000);
        }).catch(() => {
            setCheckDelete("danger");
        });
    };
    const handleCloseAndReset = () => {
        handleClose();
        setCheckDelete("not");
    };

    return (
        <>
            <Button className="mx-1 btn danger" bsPrefix="icon" onClick={handleShow}>
                <FaTrashAlt />
                <span className="h-tooltiptext">ปิดใช้งาน</span>
            </Button>
            <Modal show={show} onHide={handleCloseAndReset}>
                <Modal.Header  >
                    <Modal.Title >ลบ {heading} </Modal.Title>
                    <Button variant="close" onClick={handleCloseAndReset} />
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={variant} className='data m-0'>
                        <Alert.Heading className='p-0'>{detail}</Alert.Heading>
                    </Alert>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" className={checkDelete === 'not' || checkDelete === 'danger' ? "my-2" : "d-none"} onClick={handleCloseAndReset}>
                        Close
                    </Button>
                    <Button variant="danger " className={checkDelete === 'not' || checkDelete === 'danger' ? "my-2" : "d-none"} onClick={handleDelete}>
                        {/* <Button variant="primary" className={checkDelete === 'not' || checkDelete === 'danger' ? "my-2" : "d-none"} onClick={() => setCheckDelete("primary")}> */}
                        ยืนยันการลบ
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default DeleteModal;
