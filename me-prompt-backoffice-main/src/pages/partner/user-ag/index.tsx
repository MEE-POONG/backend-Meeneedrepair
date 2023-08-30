import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Badge, Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaPencilRuler, FaRegEye, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";

import { UserAG as PrismaUserAG, Member as PrismaMember } from '@prisma/client';
// import UserAGAddUserAGModal from "@/container/UserAG/AddUserAGModal";
// import UserAGViewUserAGModal from "@/container/UserAG/ViewModal";
import DeleteModal from "@/components/modal/DeleteModal";
import AddPartner from "@/container/userAG/AddPartner";
interface Member extends PrismaMember {
}

interface UserAG extends PrismaUserAG {
  member: Member;
}
interface Params {
  page: number;
  pageSize: number;
  keyword: string;
  totalPages: number;
}
const UserAGPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    keyword: "",
    totalPages: 1,
  });
  const [{ data, loading, error }, getUserAG,] = useAxios({
    url: `/api/userAG/search?page=${params.page}&pageSize=${params.pageSize}&keyword=${params.keyword}`,
    method: "GET",
  }, { autoCancel: false });

  const [{ }, executeUserAGDelete,] = useAxios({}, { manual: true });

  const [filteredUserAGsData, setFilteredUserAGsData] = useState<UserAG[]>([]);

  useEffect(() => {
    console.log(data);
    
    setFilteredUserAGsData(data?.data ?? []);

  }, [data]);

  const deleteUserAG = (id: string): Promise<any> => {
    return executeUserAGDelete({
      url: "/api/userAG/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredUserAGsData(prevUserAGs => prevUserAGs.filter(userAG => userAG?.id !== id));
    });
  };


  const handleChangePage = (page: number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: page,
    }));
  };

  const handleChangePageSize = (size: number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: 1,
      pageSize: size,
    }));
  };

  const handleChangekeyword = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      keyword: search,
    }));
  };
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error!</p>;
  return (
    <LayOut>

      <div className='userAG-page h-91'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              UserAG - Master
            </h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangekeyword(e.target.value)}
                placeholder="ค้นหาผู้ใช้"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <AddListName /> */}
            <Link href="/partner/user-ag/add" className="ms-2 btn icon icofn-primary">
              เพิ่มพาร์ทเนอร์
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="first">No.</th>
                  <th >userAG</th>
                  <th >ผู้ใช้</th>
                  <th>สู้ฟรี</th>
                  <th>Benefit</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredUserAGsData.map((userAG: UserAG, index: number) => {
                  return (
                    <tr key={userAG?.id}>
                      <td className="text-end">{index + 1}</td>
                      <td>{userAG?.username}</td>
                      <td>
                        {userAG?.member ? <>{userAG.member.firstname} {userAG.member.lastname}</> : <> ไม่มีผู้ใช้ </>}
                        {/* <Button className="ms-2 btn" bsPrefix="icon">
                          <FaPencilRuler />
                        </Button> */}
                        <AddPartner setID={userAG?.id} />
                      </td>
                      <td>{userAG?.percent}%</td>
                      <td>
                        <Button
                          bsPrefix="icon" className={`ms-2 btn ${userAG?.commission ? 'active' : ''}`}>
                          ค่าคอม
                        </Button>
                        <Button
                          bsPrefix="icon" className={`ms-2 btn ${userAG?.overdue ? 'active' : ''}`}>
                          ค้างบวก
                        </Button>
                        <Button
                          bsPrefix="icon" className={`ms-2 btn ${userAG?.adjustPercentage ? 'active' : ''}`}>
                          ปรับสู้ฟรี
                        </Button>
                        <Button
                          bsPrefix="icon" className={`ms-2 btn ${userAG?.customerCommission ? 'active' : ''}`}>
                          คืนลูกค้า
                        </Button>
                        <Button
                          bsPrefix="icon" className={`ms-2 btn ${userAG?.pay ? 'active' : ''}`}>
                          จ่าย
                        </Button>
                      </td>
                      <td>

                        <Link href={`/partner/user-ag/edit/${userAG?.id}`} className="ms-2 btn icon icofn-primary">
                          <FaPen />
                          <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                        </Link>
                        <DeleteModal data={userAG} apiDelete={() => deleteUserAG(userAG.id)} />
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={data?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default UserAGPage;