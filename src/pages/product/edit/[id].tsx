import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import LayOut from "@/components/RootPage/TheLayOut";



const ProductAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateProductLoading, error: updateProductError },
    executeProductPut,
  ] = useAxios({}, { manual: true });
  const [productname, setproductname] = useState<string>("");
  const [productbrand, setproductbrand] = useState<string>("");
  const [productmodel, setproductmodel] = useState<string>("");
  const [productdetail, setproductdetail] = useState<string>("");
  const [producttype, setproducttype] = useState<string>("");
  const [productcost, setproductcost] = useState<string>("");
  const [productprice, setproductprice] = useState<string>("");
  const [productremaining, setproductremaining] = useState<string>("");
  // const [productimg, setproductimg] = useState<string>("");

  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");

 /* const [bankAccount, setBankAccount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [email, setEmail] = useState<string>("");*/


  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };



  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
  //       setproductimg(splittedString);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!productname) missingFields.push("productname");
    if (!productbrand) missingFields.push("productbrand");
    if (!productmodel) missingFields.push("productmodel"); 
    if (!productdetail) missingFields.push("productdetail");
    if (!producttype) missingFields.push("producttype");
    if (!productcost) missingFields.push("productcost");
    if (!productprice) missingFields.push("productprice");
    if (!productremaining) missingFields.push("productremaining");
    // if (!productimg) missingFields.push("productimg"); 
  
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          productname,
          productbrand,
          productmodel,
          productdetail,
          producttype,
          productcost,
          productprice,
          productremaining,
            // productimg,
          /*img,*/
        };


        // Execute the update
        const response = await executeProductPut({
          url: "/api/product/" + id,
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
      <Head>
        <title>Phanomwan Backend</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='Product-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Product - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
            <Col md={4}>
                <FloatingLabel controlId="productname" label="productname / ชื่อสินค้า" className="mb-3">
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
                <FloatingLabel controlId="productbrand" label="productbrand / แบรน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productbrand !== ""}
                    isInvalid={inputForm && productbrand === ""}
                    type="productbrand"
                    value={productbrand}
                    onChange={e => setproductbrand(e.target.value)}
                    placeholder="productbrand"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="productmodel" label="productmodel / รุ่น" className="mb-3">
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
                <FloatingLabel controlId="productdetail" label="productdetail / รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && productdetail !== ""}
                    isInvalid={inputForm && productdetail === ""}
                    type="text"
                    value={productdetail}
                    onChange={e => setproductdetail(e.target.value)}
                    placeholder="productdetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="producttype" label="producttype / ประเภท " className="mb-3">
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
                <FloatingLabel controlId="productcost" label="productcost / ต้นทุน" className="mb-3">
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
                <FloatingLabel controlId="productprice" label="productprice / ราคาขาย" className="mb-3">
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
                <FloatingLabel controlId="productremaining" label="productremaining / สินค้าคงคลัง" className="mb-3">
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
   
        
              {/* <Col md={4}>
                <FloatingLabel controlId="NewsImg" label="NewsImg / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newImg !== ""}
                    isInvalid={inputForm && newImg === ""}
                    type="file"
                    defaultValue={newImg}
                    onChange={handleFileUpload}
                    placeholder="NewsImg"/> 
                </FloatingLabel>
              </Col> */}
              
              
            
          
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

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}

