import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { Form, Button, Container, Row, Image, Card, FloatingLabel } from 'react-bootstrap';



const HomePage: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <Head>
                <title>Wellcome | PSD-MeBack</title>
                <meta
                    name="description"
                    content="T ACTIVE"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='login-page '>
                <Card className="text-primary">
                    <Card.Body>
                        <Form>
                            <Image src={`${process.env.ImageBase_URL}/QZ6TuL-3r02W7wQjQrv5DA/907bdcd3-565b-4ae1-045b-c4d966eaa600/250`} className="w-100 p-2" />
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                                <Form.Control type="Password" placeholder="Password" />
                            </FloatingLabel>
                            <Form.Group controlId="formRememberMe">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="primary" type="submit" >
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
export default HomePage;