import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Badge, Button, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { FaRegEye, FaSearch, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
// import AddListName from "@/container/Partner/AddListName";
// import EditListName from "@/container/Partner/EditListName";


const ListNamePage: React.FC = () => {

  const [srcollBG, setSrcollBG] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setSrcollBG(0 - (document.documentElement.scrollTop / 10));

  };
  const data = Array.from({ length: 50 }, (_, i) => ({ col1: `Row ${i + 1} - Column 1`, col2: `Row ${i + 1} - Column 2` })); // Updated this line

  return (
    <LayOut>

      <div className='partner-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Partner - Master
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
            {/* <AddListName /> */}
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="first">No.</th>
                  <th>ชื่อ-สกุล</th>
                  <th>ธนาคาร</th>
                  <th>ติดต่อ</th>
                  <th>ทำงาน</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="first">
                      {index}
                    </td>
                    <td>
                      <div className="space-around ">
                        <b>รนง งงอยู่</b>
                      </div>
                    </td>
                    <td>
                      061-123-4567
                    </td>
                    <td>
                      <Row >
                        <Col xs={3} className="text-end">
                          <strong>Tel.</strong>
                        </Col>
                        <Col xs={9} className="text-start">
                          0821522818
                        </Col>
                        <Col xs={3} className="text-end">
                          <strong>Line</strong>
                        </Col>
                        <Col xs={9} className="text-start">
                          devilzeros
                        </Col>
                        <Col xs={3} className="text-end">
                          <strong>E-Mail</strong>
                        </Col>
                        <Col xs={9} className="text-start">
                          devilzeros@outlook.co.th
                        </Col>
                      </Row>
                    </td>
                    <td>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <Badge className="mx-1" bg="success">
                        Success
                      </Badge>
                      <br />
                      <Badge className="mx-1" bg="info">
                        Info
                      </Badge>
                      <Badge className="mx-1" bg="info">
                        Info
                      </Badge>
                      <Badge className="mx-1" bg="info">
                        Info
                      </Badge>

                      <Badge className="mx-1" bg="info">
                        Info
                      </Badge>
                    </td>
                    <td>
                      <Button className="ms-2 btn" bsPrefix="icon">
                        <FaRegEye />
                      </Button>
                      {/* <EditListName /> */}
                      <Button className="ms-2 btn" bsPrefix="icon">
                        <FaTrashAlt />
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
export default ListNamePage;