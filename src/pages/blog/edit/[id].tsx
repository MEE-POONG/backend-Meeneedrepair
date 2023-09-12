import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { Blog } from "@prisma/client";
import LayOut from "@/components/RootPage/TheLayOut";
import BlogPage from '../index';



const BlogAdd: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [
        { loading: updateBlogLoading, error: updateBlogError },
        executeBlogPut,
    ] = useAxios({}, { manual: true });
    const [title, settitle] = useState<string>("");
    const [subtitle, setsubtitle] = useState<string>("");
    const [detail, setdetail] = useState<string>("");
    const [img, setimg] = useState<string>("");
    const [alertForm, setAlertForm] = useState<string>("not");
    const [inputForm, setInputForm] = useState<boolean>(false);
    const [checkBody, setCheckBody] = useState<string>("");



    const handleInputChange = (setter: any) => (event: any) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) && !newValue.includes('.')) {
            setter(newValue);
        }
    };



    const [{ data: BlogData }, getBlog] = useAxios({
        url: `/api/blog/${id}`,
        method: "GET",
    });

    const reloadPage = () => {
        window.location.reload();
    };


    useEffect(() => {
        if (BlogData) {
            const {
                title,
                subtitle,
                detail,
                img: imageId, // Use the uploaded image ID
                // ... (ตาม field อื่น ๆ)
            } = BlogData;

            settitle(title);
            setsubtitle(subtitle);
            setdetail(detail);
            setimg(img);


            // ... (กำหนดค่า state อื่น ๆ)
        }
    }, [BlogData]);


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
                setimg(splittedString);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let missingFields = [];
        if (!title) missingFields.push("BlogTitle");
        if (!subtitle) missingFields.push("BlogSubTitle");
        if (!detail) missingFields.push("BlogSubDetail");
        // if (!newImg) missingFields.push("BlogImg");

        if (missingFields.length > 0) {
            setAlertForm("warning");
            setInputForm(true);
            setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
        } else {
            try {
                setAlertForm("primary");

                const data = {
                    title,
                    subtitle,
                    detail,
                    // newImg,
                    /*img,*/
                };


                // Execute the update
                const response = await executeBlogPut({
                    url: "/api/blog/" + id,
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
            <div className='Blog-page'>
                <Card>
                    <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} pathBack="/blog" />
                    <Card.Header className="d-flex space-between">
                        <h4 className="mb-0 py-1">
                            แก้ไขข้อมูล
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

function setAlertForm(arg0: string) {
    throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
    throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
    throw new Error("Function not implemented.");
}

