import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CurrentDate = () => {
  // สร้างวันที่ปัจจุบัน
  const currentDate = new Date();
  
  // ดึงข้อมูลวันที่และเวลา
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const formattedDate = currentDate.toLocaleDateString('en-US');

  return (
    <div className="container mt-5">
      <h1>วันที่ปัจจุบัน</h1>
      <p>{formattedDate}</p>
    </div>
  );
};

export default CurrentDate;
