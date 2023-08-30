import { useRouter } from 'next/router';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface AlertModalProps {
    checkAlertShow: string;
    setCheckAlertShow: React.Dispatch<React.SetStateAction<string>>;
    checkBody: string;

}

const AlertModal: React.FC<AlertModalProps> = ({ checkAlertShow, setCheckAlertShow, checkBody }) => {
    const handleClose = () => setCheckAlertShow('not');
    const router = useRouter();

    let variant;
    let heading;
    let boding;
    if (checkAlertShow === 'success') {
        variant = 'success';
        heading = 'เพิ่มข้อมูลสำเร็จ';
    } else if (checkAlertShow === 'primary') {
        variant = 'primary';
        heading = (
            <>
                <Spinner animation="border" variant="primary" />
                {'กำลังเพิ่มข้อมูล'}
            </>);
    } else if (checkAlertShow === 'danger') {
        variant = 'danger';
        heading = 'Error เพิ่มข้อมูลไม่สำเร็จ';
    } else if (checkAlertShow === 'warning') {
        variant = 'warning';
        heading = 'กรอกข้อมูลไม่ครบ';
        boding = checkBody;
    }
    const handleClickReload = () => {
        setCheckAlertShow('not')
        router.reload();
    };
    const handleClickฺBack = () => {
        router.back();
    };

    return (
        <>
            {checkAlertShow !== 'not' && (
                <Modal show={true}  onHide={checkAlertShow === 'success' ? handleClickReload : handleClose} centered>
                    <Alert variant={variant} onClose={checkAlertShow === 'success' ? handleClickReload : handleClose} className='m-0' dismissible>
                        <Alert.Heading className='m-0'>{heading}</Alert.Heading>
                        <p className='m-0'>{boding}</p>
                        <div className='d-flex justify-content-around'>
                            <Button onClick={handleClickReload} className={checkAlertShow === 'success' ? "my-2" : "d-none"}>เพิ่มต่อ</Button>
                            <Button onClick={handleClickฺBack} className={checkAlertShow === 'success' ? "my-2" : "d-none"}>กลับหน้าสมาชิก</Button>
                        </div>
                    </Alert>
                </Modal>
            )}
        </>
    );
}

export default AlertModal;