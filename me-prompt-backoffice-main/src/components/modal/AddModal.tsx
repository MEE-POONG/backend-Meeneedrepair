import { useRouter } from 'next/router';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface AddModalProps {
    checkAlertShow: string;
    setCheckAlertShow: React.Dispatch<React.SetStateAction<string>>;
    checkBody: Record<string, string> | null | undefined;
}

const AddModal: React.FC<AddModalProps> = ({ checkAlertShow, setCheckAlertShow, checkBody }) => {
    const handleClose = () => setCheckAlertShow('not');
    const router = useRouter();

    let variant;
    let heading;
    let boding;
    switch (checkAlertShow) {
        case 'success':
            variant = 'success';
            heading = 'เพิ่มข้อมูลสำเร็จ';
            break;
        case 'primary':
            variant = 'primary';
            heading = (
                <>
                    <Spinner animation="border" variant="primary" />
                    {'กำลังเพิ่มข้อมูล'}
                </>
            );
            break;
        case 'danger':
            variant = 'danger';
            heading = 'Error เพิ่มข้อมูลไม่สำเร็จ';
            boding = (
                <ul>
                    {checkBody && Object.entries(checkBody).map(([key, value]) => (
                        <li key={key}><strong>{value}</strong></li>
                    ))}
                </ul>
            );
            break;
        case 'warning':
            variant = 'warning';
            heading = 'กรอกข้อมูลไม่ครบ';
            boding = (
                <ul>
                    {Object.entries(checkBody || {}).map(([field, errorMsg]) => (
                        <li key={field}><strong>{field}:</strong> {errorMsg}</li>
                    ))}
                </ul>
            );
            break;
        default:
            break;
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
                <Modal show={true} onHide={checkAlertShow === 'success' ? handleClickReload : handleClose} centered>
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

export default AddModal;