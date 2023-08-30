import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import ModalOffOn from '@/container/Setting/ModalOffOn';
import { Alert, Button, Card, Image, Form, InputGroup, Tooltip, OverlayTrigger, Table } from "react-bootstrap";
import { FaKey, FaPen, FaPowerOff, FaRegEye, FaSearch, FaToolbox, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import AdminAdd from "@/container/Admin/AdminAdd";


const AdminPage: React.FC = () => {

  const data = Array.from({ length: 50 }, (_, i) => ({ col1: `Row ${i + 1} - Column 1`, col2: `Row ${i + 1} - Column 2` })); // Updated this line

  return (
    <LayOut>

      <div className='admin-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Admin
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
              <AdminAdd />
              <Link href="/setting/admin/team" className="ms-2 btn icon">
                จัดการ Team
              </Link>
            </span>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th>ชื่อ-สกุล</th>
                  <th>ทีม / ตำแหน่ง</th>
                  <th>ติดต่อ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <b>นรากร ปากา</b>
                      <br />
                      <b>{" ชื่อเล่น "}เอ</b>
                    </td>
                    <td>
                      <b>A / หัวหน้าทีม</b>
                    </td>
                    <td>
                      <b>Tel : 0381234567</b>
                      <br />
                      <b>Line : 0381234567</b>
                    </td>
                    <td>
                      <ModalOffOn />
                      <Button className="ms-2 btn info" bsPrefix="icon">
                        <FaToolbox />
                        <span className="h-tooltiptext">กำหนดสิทธิ</span>
                      </Button>
                      <Button className="ms-2 btn warning" bsPrefix="icon">
                        <FaKey />
                        <span className="h-tooltiptext">เปลี่ยนรหัส</span>
                      </Button>
                      <Button className="ms-2 btn primary" bsPrefix="icon" >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Button>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        <FaTrashAlt />
                        <span className="h-tooltiptext">ลบข้อมูล</span>
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
export default AdminPage;