import React, { useEffect, useState } from "react";
import LayOut from "@/components/RootPage/TheLayOut";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";


const HomePage: React.FC = () => {

  return (
    <LayOut>
      
      <div className='home-page h-100'>
        <Card className="title">
          <Card.Header>
            <h2 className="display-6 text-center">Welcome</h2>
          </Card.Header>
        </Card>
        <Row className="warn">
          <Col lg="4" className="h-100">
            <Card className="h-100">
              <Card.Header>
                <h4 className="text-center">คิวงานบอท</h4>
              </Card.Header>
              <Card.Body className="y-scroll">
                {Array.from({ length: 15 }, (_, index) => (
                  <Alert key={index} variant='success' className="home">
                    <b>เติมเครดิต 9,000 ยูส ufh27oa14</b>
                    <b>โดย Est</b>
                    <b>14.00<Button className="ms-2 btn" bsPrefix="icon"><FaRegEye /></Button></b>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" className="h-100">
            <Card className="h-100">
              <Card.Header>
                <h4 className="text-center">จัดการข้อมูล</h4>
              </Card.Header>
              <Card.Body className="y-scroll">
                {Array.from({ length: 15 }, (_, index) => (
                  <Alert key={index} variant='warning' className="home">
                    <b>แก้ข้อมูล ufrcbaaa</b>
                    <b>โดย Est</b>
                    <b>14.00<Button className="ms-2 btn" bsPrefix="icon"><FaRegEye /></Button></b>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" className="h-100">
            <Card className="h-100">
              <Card.Header>
                <h4 className="text-center">พันธมิตรเข้าใช้</h4>
              </Card.Header>
              <Card.Body className="y-scroll">
                {Array.from({ length: 15 }, (_, index) => (
                  <Alert key={index} variant='info' className="home">
                    <b>ufh27oa14</b>
                    <b>14.00<Button className="ms-2 btn" bsPrefix="icon"><FaRegEye /></Button></b>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </div>
    </LayOut>
  );
}
export default HomePage;