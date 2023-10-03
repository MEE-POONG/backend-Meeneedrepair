import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Badge,
  Card,
  Button,
  Image,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
// import { bankMap } from "@/test";
// import DeleteModal from "@/components/modal/DeleteModal";
import { Appointment } from '@prisma/client';
import LayOut from "@/components/RootPage/TheLayOut";
import DeleteModal from "@/components/modal/DeleteModal";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const AppointmentPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: appointmentData }, getappointment] = useAxios({
    url: `/api/appointment?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteappointmentLoading, error: deleteappointmentError },
    executeappointmentDelete,
  ] = useAxios({}, { manual: true });

  const [filteredappointmentsData, setFilteredappointmentsData] = useState<
    Appointment[]
  >([]);

  useEffect(() => {
    setFilteredappointmentsData(appointmentData?.appointment ?? []);
  }, [appointmentData]);

  const deleteappointment = (id: string): Promise<any> => {
    return executeappointmentDelete({
      url: "/api/appointment/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredappointmentsData((prevappointments) =>
        prevappointments.filter((appointment) => appointment.id !== id)
      );
    });
  };

  const handleChangePage = (page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: page,
    }));
  };

  const handleChangePageSize = (size: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
      pageSize: size,
    }));
  };

  const handleChangesearchKey = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchKey: search,
    }));
  };


  useEffect(() => {
    if (appointmentData?.appointment) {
      const filteredData = appointmentData.appointment.filter((appointment:any) =>
        appointment.fname.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        appointment.lname.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        appointment.email.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        appointment.tel.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        appointment.request.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        appointment.message.toLowerCase().includes(params.searchKey.toLowerCase()) 
      );

      setFilteredappointmentsData(filteredData);
    }
  }, [appointmentData, params.searchKey]);

  return (
    <LayOut>
      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">แจ้งซ่อม</h4>

          
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">No</th>
                  <th className="w-t-150">ชื่อ</th>
                  <th className="w-t-150">นามสกุล</th>
                  <th className="w-t-150">อีเมล</th>
                  <th className="w-t-150">เบอร์โทร</th>
                  <th className="w-t-150">อุปกรณ์ที่ต้องการซ่อม</th>
                  <th className="w-t-150">รายละเอียด</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredappointmentsData.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td className="w-t-150">{index + 1}</td>
                    <td className="w-t-150">{appointment.fname}</td>
                    <td className="w-t-150">{appointment.lname}</td>
                    <td className="w-t-150">{appointment.email}</td>
                    <td className="w-t-150">{appointment.tel}</td>
                    <td className="w-t-150">{appointment.request}</td>
                    <td className="w-t-150">{appointment.message}</td>
  

                    {/* <img src={appointment.img} alt="appointment" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <newsSchoolAddnewsSchoolModal data={newsSchool} /> */}


                      {/* <EditnewsSchoolModal data={newsSchool} apiEdit={() => editnewsSchool(editList)} /> */}
                      <Link
                        href={`/appointment/edit/${appointment.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={appointment}
                        apiDelete={() => deleteappointment(appointment.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect
              page={params.page}
              totalPages={appointmentData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default AppointmentPage;
