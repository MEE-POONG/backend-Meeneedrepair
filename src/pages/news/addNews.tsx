import React, {useState } from "react";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import axios from "axios";  
import LayOut from "@/components/RootPage/TheLayOut";



const NewsAdd: React.FC = () => {
  const [{ error: errorMessage, loading: newsLoading }, executenews] = useAxios({ url: '/api/news', method: 'POST' }, { manual: true });
  const [title, settitle] = useState<string>("");
  const [subtitle, setsubtitle] = useState<string>("");
  const [detail, setdetail] = useState<string>("");
  const [date, setdate] = useState<string>("");
  const [author, setauthor] = useState<string>("");
  const [refer, setrefer] = useState<string>("");
  // const [img, setimg] = useState<string>("");
  const [img, setimg] = useState<File | null>(null);

  

  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");


  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };
  const reloadPage = () => {
    clear();
  };

  const clear = () => {
    settitle("");
    setsubtitle("");
    setdetail("");
    setdate("");
    setauthor("");
    setrefer("");
    // setimg("");


    setimg(null);
    // setauthor("");
    
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setimg(file); // Store the File object
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    // Check for missing fields here...
    if (!title) missingFields.push("title");
    if (!subtitle) missingFields.push("subtitle");
    if (!detail) missingFields.push("detail");
    if (!date) missingFields.push("date");
    if (!author) missingFields.push("author");
    if (!refer) missingFields.push("refer");
    if (!img) missingFields.push("img");

  
    if (missingFields.length > 0) {
      // Handle missing fields...
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading
  
        // Upload the image
        if (img) {
          const formData = new FormData();
          formData.append("file", img); // Assuming 'img' is a File object
          const uploadResponse = await axios.post(
            "https://upload-image.me-prompt-technology.com/",
            formData
          );
  
          if (uploadResponse.status === 200) {
            const responseData = uploadResponse.data;
            const imageId = responseData.result.id;
            
            // Prepare the data to send
            const data = {
              title,
              subtitle,
              detail,
              date,
              author,
              refer,
              img: imageId, // Use the uploaded image ID
              // author,
            };
  
            const response = await executenews({ data });
            if (response && response.status === 201) {
              setAlertForm("success");
              setTimeout(() => {
                clear();
              }, 5000);
            } else {
              setAlertForm("danger");
              throw new Error('Failed to send data');
            }
          } else {
            setAlertForm("danger");
            throw new Error('Image upload failed');
          }
        }
      } catch (error) {
        setAlertForm("danger");
      }
    }
  };

  
  return (
    <LayOut>
      <Head>
        <title>MeeNeedpepair Backend</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='News-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มสินค้า
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="title" label="ชื่อข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && title !== ""}
                    isInvalid={inputForm && title === ""}
                    type="text"
                    value={title}
                    onChange={e => settitle(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="subtitle" label="หัวข้อข่าวย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && subtitle !== ""}
                    isInvalid={inputForm && subtitle === ""}
                    type="title2"
                    value={subtitle}
                    onChange={e => setsubtitle(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="detail" label="รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && detail !== ""}
                    isInvalid={inputForm && detail === ""}
                    type="text"
                    value={detail}
                    onChange={e => setdetail(e.target.value)}
                    placeholder="detail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="date" label="วันที่" className="mb-3">
                  <Form.Control
                    isValid={inputForm && date !== ""}
                    isInvalid={inputForm && date === ""}
                    type="date"
                    value={date}
                    onChange={e => setdate(e.target.value)}
                    placeholder="setdate"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="author" label="ผู้เขียน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && author !== ""}
                    isInvalid={inputForm && author === ""}
                    type="text"
                    value={author}
                    onChange={e => setauthor(e.target.value)}
                    placeholder="author"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="refer" label="อ้างอิง" className="mb-3">
                  <Form.Control
                    isValid={inputForm && refer !== ""}
                    isInvalid={inputForm && refer === ""}
                    type="text"
                    value={refer}
                    onChange={e => setrefer(e.target.value)}
                    placeholder="refer"
                  />
                </FloatingLabel>
              </Col>
            
              <Col md={4}>
                <FloatingLabel controlId="img" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img !== null}
                    isInvalid={inputForm && img === null}
                    type="file"
                    // defaultValue={img}
                    onChange={handleFileUpload}
                    placeholder="img"/> 
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
            <Link href="/news" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default NewsAdd;