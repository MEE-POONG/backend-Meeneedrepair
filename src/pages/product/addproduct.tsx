import React, {useState } from "react";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import axios from "axios";  
import LayOut from "@/components/RootPage/TheLayOut";



const ProductAdd: React.FC = () => {
  const [{ error: errorMessage, loading: productLoading }, executeproduct] = useAxios({ url: '/api/product', method: 'POST' }, { manual: true });
  const [productname, setproductname] = useState<string>("");
  const [productbrand, setproductbrand] = useState<string>("");
  const [productmodel, setproductmodel] = useState<string>("");
  const [productdetail, setproductdetail] = useState<string>("");
  const [producttype, setproducttype] = useState<string>("");
  const [productcost, setproductcost] = useState<string>("");
  const [productprice, setproductprice] = useState<string>("");
  const [productremaining, setproductremaining] = useState<string>("");
  // const [productimg, setproductimg] = useState<string>("");
  const [productimg, setproductimg] = useState<File | null>(null);

  

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
    setproductname("");
    setproductbrand("");
    setproductmodel("");
    setproductdetail("");
    setproducttype("");
    setproductcost("");
    setproductprice("");
    setproductremaining("");
    // setproductimg("");


    setproductimg(null);
    // setproducttype("");
    
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setproductimg(file); // Store the File object
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    // Check for missing fields here...
    if (!productname) missingFields.push("productname");
    if (!productbrand) missingFields.push("productbrand");
    if (!productmodel) missingFields.push("productmodel");
    if (!productdetail) missingFields.push("productdetail");
    if (!producttype) missingFields.push("producttype");
    if (!productcost) missingFields.push("productcost");
    if (!productprice) missingFields.push("productprice");
    if (!productremaining) missingFields.push("productremaining");
    if (!productimg) missingFields.push("productimg");

  
    if (missingFields.length > 0) {
      // Handle missing fields...
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading
  
        // Upload the image
        if (productimg) {
          const formData = new FormData();
          formData.append("file", productimg); // Assuming 'productimg' is a File object
          const uploadResponse = await axios.post(
            "https://upload-image.me-prompt-technology.com/",
            formData
          );
  
          if (uploadResponse.status === 200) {
            const responseData = uploadResponse.data;
            const imageId = responseData.result.id;
            
            // Prepare the data to send
            const data = {
              productname,
              productbrand,
              productmodel,
              productdetail,
              producttype,
              productcost,
              productprice,
              productremaining,
              productimg: imageId, // Use the uploaded image ID
              // producttype,
            };
  
            const response = await executeproduct({ data });
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
      <div className='Product-page'>
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
                <FloatingLabel controlId="productname" label="ชื่อสินค้า" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productname !== ""}
                    isInvalid={inputForm && productname === ""}
                    type="text"
                    value={productname}
                    onChange={e => setproductname(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productbrand" label="แบรน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productbrand !== ""}
                    isInvalid={inputForm && productbrand === ""}
                    type="title2"
                    value={productbrand}
                    onChange={e => setproductbrand(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productmodel" label="รุ่น" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productmodel !== ""}
                    isInvalid={inputForm && productmodel === ""}
                    type="text"
                    value={productmodel}
                    onChange={e => setproductmodel(e.target.value)}
                    placeholder="productmodel"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productdetail" label="รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productdetail !== ""}
                    isInvalid={inputForm && productdetail === ""}
                    type="text"
                    value={productdetail}
                    onChange={e => setproductdetail(e.target.value)}
                    placeholder="setproductdetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="producttype" label="ประเภท " className="mb-3">
                  <Form.Control
                    isValid={inputForm && producttype !== ""}
                    isInvalid={inputForm && producttype === ""}
                    type="text"
                    value={producttype}
                    onChange={e => setproducttype(e.target.value)}
                    placeholder="producttype"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productcost" label="ต้นทุน " className="mb-3">
                  <Form.Control
                    isValid={inputForm && productcost !== ""}
                    isInvalid={inputForm && productcost === ""}
                    type="text"
                    value={productcost}
                    onChange={e => setproductcost(e.target.value)}
                    placeholder="productcost"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productprice" label="ราคาขาย " className="mb-3">
                  <Form.Control
                    isValid={inputForm && productprice !== ""}
                    isInvalid={inputForm && productprice === ""}
                    type="text"
                    value={productprice}
                    onChange={e => setproductprice(e.target.value)}
                    placeholder="productprice"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productremaining" label="จำนวนสินค้าคงคลัง" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productremaining !== ""}
                    isInvalid={inputForm && productremaining === ""}
                    type="text"
                    value={productremaining}
                    onChange={e => setproductremaining(e.target.value)}
                    placeholder="productremaining"
                  />
                </FloatingLabel>
              </Col>
             
            

              <Col md={4}>
                <FloatingLabel controlId="productimg" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productimg !== null}
                    isInvalid={inputForm && productimg === null}
                    type="file"
                    // defaultValue={productimg}
                    onChange={handleFileUpload}
                    placeholder="productimg"/> 
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
            <Link href="/product" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default ProductAdd;