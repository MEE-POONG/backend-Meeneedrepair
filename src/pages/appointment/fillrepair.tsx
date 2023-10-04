import React, { useEffect, useState } from "react";
import { Accordion, Alert, Button, Card, Carousel, Col, Row } from "react-bootstrap";
import useAxios from "axios-hooks";
import { Appointment } from '@prisma/client';
import axios from "axios";
import DeleteModal from '@/components/modal/DeleteModal';
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";


export default function Fillrepair() {


  const [{ data: appointmentData }, getappointment] = useAxios({
    url: `/api/appointment`,
    method: "GET",
  });

  const [
    { loading: deleteappointmentLoading, error: deleteappointmentError },
    executeappointmentDelete,
  ] = useAxios({}, { manual: true });

  const [filteredappointmentsData, setFilteredappointmentsData] = useState<
    Appointment[]
  >([]);

  const deleteappointment = (id: string): Promise<any> => {
    return executeappointmentDelete({
      url: "/api/appointment/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredappointmentsData((prevappointments) =>
        prevappointments.filter((appointment) => appointment.id !== id)
      );
    });
  };

  useEffect(() => {
    setFilteredappointmentsData(appointmentData?.appointment ?? []);
  }, [appointmentData]);


  async function markAsRepaired(appointmentId: any) {
    try {
      // ส่งคำขอ PUT ไปยังเซิร์ฟเวอร์เพื่ออัปเดตสถานะเป็น "ซ่อมแล้ว"
      await axios.put(`/api/appointment/${appointmentId}`, { status: "ซ่อมแล้ว" });
      window.location.reload();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ', error);
    }
  }

  return (
    <>

      <Col lg="4" className="h-200">
        <Card>
          <Card.Header>
            <h4 className="text-center">คิวจองซ่อม ลูกค้าทั่วไป <BsWrenchAdjustableCircleFill/> </h4>
          </Card.Header>
          <div className="t-scroll">
            {filteredappointmentsData
              .filter((appointment) => appointment.status === "ยังไม่ซ่อม")
              .sort((a, b) => new Date(a.time || '').getTime() - new Date(b.time || '').getTime()) // Sort by date
              .map((appointment, index) => (
                <Accordion defaultActiveKey="0" flush key={appointment.id}>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      {index + 1}. {appointment.fname} {appointment.lname}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>สถานะ : {appointment.status} </p>
                      <p>วันที่ : {appointment.time}</p>
                      <p>แจ้งซ่อมโดยคุณ : {appointment.fname} {appointment.lname}</p>
                      <p>อีเมล : {appointment.email}</p>
                      <p>เบอร์โทร : {appointment.tel}</p>
                      <p>อุปกรณ์ที่ต้องการซ่อม : {appointment.request}</p>
                      <p>รายละเอียด : {appointment.message}</p>
                      <Button variant="success" onClick={() => markAsRepaired(appointment.id)}>
                        ซ่อมแล้ว
                      </Button>{' '}
                      <Button variant="danger" onClick={() => deleteappointment(appointment.id)}>ยกเลิกการซ่อม</Button>{' '}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
          </div>
        </Card>
      </Col>


    </>
  )
}