import React, { useState } from "react";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import axios from "axios";
import LayOut from "@/components/RootPage/TheLayOut";


const BlogAdd: React.FC = () => {
  const [{ error: errorMessage, loading: BlogLoading }, executeBlog] = useAxios({ url: '/api/blog', method: 'POST' }, { manual: true });
  const [title, settitle] = useState<string>("");
  const [subtitle, setsubtitle] = useState<string>("");
  const [detail, setdetail] = useState<string>("");
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
    setimg(null);

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
    if (!img) missingFields.push("blogImg");


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
          formData.append("file", img); // Assuming 'newImg' is a File object
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
              img: imageId, // Use the uploaded image ID
              
            };

            const response = await executeBlog({ data });
            if (response && response.status === 201) {
              setAlertForm("success");
              setTimeout(() => {
                clear();
              }, 3000);
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
        <title>Phanomwan Backend</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='Blog-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} pathBack={"/blog"} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มข่าว
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="BlogName" label="ชื่อข่าว * จำกัด 50 ตัวอักษร" className="mb-3" style={{ color: 'red' }}>
                  <Form.Control
                    isValid={inputForm && title !== ""}
                    isInvalid={inputForm && title === ""}
                    type="text"
                    value={title}
                    onChange={e => {
                      const newValue = e.target.value;
                      if (newValue.length <= 50) {
                        settitle(newValue);
                      }
                    }}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="BlogTitle" label="หัวข้อข่าว" className="mb-3">
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
                <FloatingLabel controlId="BlogImg" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img !== null}
                    isInvalid={inputForm && img === null}
                    type="file"
                    // defaultValue={newImg}
                    onChange={handleFileUpload}
                    placeholder="BlogImg" />
                </FloatingLabel>
              </Col>



            </Row>

            <Col md={8}>
              <FloatingLabel controlId="BlogSubDetail" label="รายละเอียดข่าว" className="mb-3">
                <Form.Control
                  as="textarea"
                  isValid={inputForm && detail !== ""}
                  isInvalid={inputForm && detail === ""}
                  // type="text"
                  value={detail}
                  onChange={e => setdetail(e.target.value)}
                  placeholder="BlogSubDetail"
                  style={{ width: "100%", height: "200px" }} // Adjust the height as needed

                />
              </FloatingLabel>
            </Col>





          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}
            <Link href="/blog" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default BlogAdd;