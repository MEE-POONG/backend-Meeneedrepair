import React, { useEffect, useState } from "react";
import LayOut from "@/components/RootPage/TheLayOut";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import Fillrepair from "./appointment/fillrepair";


const HomePage: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); // รูปแบบวันที่เป็นข้อความ

  return (
    <LayOut>


          < Fillrepair />
  
    </LayOut>
  );
}
export default HomePage;