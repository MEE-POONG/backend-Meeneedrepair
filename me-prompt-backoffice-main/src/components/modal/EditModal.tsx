import { useRouter } from 'next/router';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface EditModalProps {
    checkAlertShow: string;
    setCheckAlertShow: React.Dispatch<React.SetStateAction<string>>;
    checkBody: Record<string, string> | null | undefined;
}

const EditModal: React.FC<EditModalProps> = ({ checkAlertShow, setCheckAlertShow, checkBody }) => {
    const handleClose = () => setCheckAlertShow('not');
    const router = useRouter();

    let variant;
    let heading;
    let boding;
    switch (checkAlertShow) {
        case 'success':
            variant = 'success';
            heading = 'แก้ไขข้อมูลสำเร็จ';
            break;
        case 'primary':
            variant = 'primary';
            heading = (
                <>
                    <Spinner animation="border" variant="primary" />
                    {'กำลังแก้ไขข้อมูล'}
                </>
            );
            break;
        case 'danger':
            variant = 'danger';
            heading = 'Error แก้ไขข้อมูลไม่สำเร็จ';
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
    const handleClickBack = () => {
        router.back();
    
        setTimeout(() => {
            window.location.reload();
        }, 100); 
    };
    return (
        <>
            {checkAlertShow !== 'not' && (
                <Modal show={true} onHide={checkAlertShow === 'success' ? handleClickReload : handleClose} centered>
                    <Alert variant={variant} onClose={checkAlertShow === 'success' ? handleClickReload : handleClose} className='m-0' dismissible>
                        <Alert.Heading className='m-0'>{heading}</Alert.Heading>
                        <p className='m-0'>{boding}</p>
                        <div className='d-flex justify-content-around'>
                            <Button onClick={handleClickBack} className={checkAlertShow === 'success' ? "my-2" : "d-none"}>กลับหน้าสมาชิก</Button>
                        </div>
                    </Alert>
                </Modal>
            )}
        </>
    );
}

export default EditModal;