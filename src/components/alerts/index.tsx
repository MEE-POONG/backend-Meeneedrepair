import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface AlertsProps {
  checkAlertShow: string;
  setCheckAlertShow: React.Dispatch<React.SetStateAction<string>>;
}

const Alerts: React.FC<AlertsProps> = ({ checkAlertShow, setCheckAlertShow }) => {
  const handleClose = () => setCheckAlertShow('not');

  let variant;
  let heading;
  if (checkAlertShow === 'success') {
    variant = 'success';
    heading = 'เพิ่มข้อมูลสำเร็จ';
  } else if (checkAlertShow === 'primary') {
    variant = 'primary';
    heading = 'กำลังเพิ่มข้อมูล';
  } else if (checkAlertShow === 'danger') {
    variant = 'danger';
    heading = 'Error เพิ่มข้อมูลไม่สำเร็จ';
  } else if (checkAlertShow === 'warning') {
    variant = 'warning';
    heading = 'กรอกข้อมูลไม่ครบ';
  }

  return (
    <>
      {checkAlertShow !== 'not' && (
        <Alert variant={variant} onClose={handleClose} dismissible className='data'>
          <Alert.Heading className='m-0'>{heading}</Alert.Heading>
        </Alert>
      )}
    </>
  );
}

export default Alerts;