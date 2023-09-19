import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import LayOut from "@/components/RootPage/TheLayOut";



const AppointmentAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateappointmentLoading, error: updateappointmentError },
    executeappointmentPut,
  ] = useAxios({}, { manual: true });
  const [fname, setfname] = useState<string>("");
  const [lname, setlname] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [tel, settel] = useState<string>("");
  const [request, setrequest] = useState<string>("");
  const [message, setmessage] = useState<string>("");
  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");

  
  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!fname) missingFields.push("fname");
    if (!lname) missingFields.push("lname");
    if (!email) missingFields.push("email"); 
    if (!tel) missingFields.push("tel");
    if (!request) missingFields.push("request");
    if (!message) missingFields.push("message");
    // if (!appointmentimg) missingFields.push("appointmentimg"); 
  
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          fname,
          lname,
          email,
          tel,
          request,
          message,
            // appointmentimg,
          /*img,*/
        };


        // Execute the update
        const response = await executeappointmentPut({
          url: "/api/appointment/" + id,
          method: "PUT",
          data
        });
        if (response && response.status === 200) {
          setAlertForm("success");
          setTimeout(() => {
            // reloadPage();
          }, 5000);
        } else {
          setAlertForm("danger");
          throw new Error('Failed to update data');
        }
      } catch (error) {
        setAlertForm("danger");
      }
    }
  };
  

  return (
    <LayOut>
      <div className='appointment-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              appointment - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
            <Col md={4}>
                <FloatingLabel controlId="fname" label="fname / ชื่อสินค้า" className="mb-3">
                  <Form.Control
                    isValid={inputForm && fname !== ""}
                    isInvalid={inputForm && fname === ""}
                    type="text"
                    value={fname}
                    onChange={e => setfname(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="lname" label="lname / แบรน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && lname !== ""}
                    isInvalid={inputForm && lname === ""}
                    type="lname"
                    value={lname}
                    onChange={e => setlname(e.target.value)}
                    placeholder="lname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="email" label="email / รุ่น" className="mb-3">
                  <Form.Control
                    isValid={inputForm && email !== ""}
                    isInvalid={inputForm && email === ""}
                    type="text"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                    placeholder="email"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="tel" label="tel / รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && tel !== ""}
                    isInvalid={inputForm && tel === ""}
                    type="text"
                    value={tel}
                    onChange={e => settel(e.target.value)}
                    placeholder="tel"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="request" label="request / ประเภท " className="mb-3">
                  <Form.Control
                    isValid={inputForm && request !== ""}
                    isInvalid={inputForm && request === ""}
                    type="text"
                    value={request}
                    onChange={e => setrequest(e.target.value)}
                    placeholder="request"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="message" label="message / ต้นทุน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && message !== ""}
                    isInvalid={inputForm && message === ""}
                    type="text"
                    value={message}
                    onChange={e => setmessage(e.target.value)}
                    placeholder="message"
                  />
                </FloatingLabel>
              </Col>
            
              
            
          
            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}
            <Link href="/appointment" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default AppointmentAdd;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}

