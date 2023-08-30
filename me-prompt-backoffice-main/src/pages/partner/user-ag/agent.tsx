import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Alert, Button, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { FaPen, FaPowerOff, FaRegEye, FaSearch } from "react-icons/fa";


const AgentPage: React.FC = () => {

  const data = Array.from({ length: 50 }, (_, i) => ({ col1: `Row ${i + 1} - Column 1`, col2: `Row ${i + 1} - Column 2` })); // Updated this line

  return (
    <LayOut>

      <div className='partner-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              {'ufruu01'} - Agent
            </h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <span>
              <Button className="ms-2 btn" bsPrefix="icon">
                เพิ่ม Agent
              </Button>
              <Button className="ms-2 btn" bsPrefix="icon">
                สร้าง Agent
              </Button>
            </span>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>ยูสเซอร์</th>
                  <th>ชื่อ-สกุล</th>
                  <th>สิทธิรายได้</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <div className="space-around ">
                        <b>ufruu01</b>
                      </div>
                    </td>
                    <td>
                      <b>นรากร ปากา</b>
                    </td>
                    <td>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        ค่าคอม
                      </Button>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        ค้างบวก
                      </Button>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        ปรับสู้ฟรี
                      </Button>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        จ่าย
                      </Button>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        คืนลูกค้า
                      </Button>
                    </td>
                    <td>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        <FaRegEye />
                      </Button>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        <FaPen />
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

      </div>
    </LayOut>
  );
}
export default AgentPage;