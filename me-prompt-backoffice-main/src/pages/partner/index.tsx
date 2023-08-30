import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Badge, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import PartnerViewMemberModal from "@/container/Partner/ViewModal";
import DeleteModal from "@/components/modal/DeleteModal";
import { Member } from "@prisma/client";
import PartnerAddPartnerModal from "@/container/Partner/AddPartnerModal";
import { bankMap } from "@/data/test";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const MemberPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });
  const [{ data: membersData }, getMember,] = useAxios({
    url: `/api/member?page=${params.page}&pageSize=${params.pageSize}&searchKey=${params.searchKey}`,
    method: "GET",
  }, { autoCancel: false });

  const [{ loading: deleteMemberLoading, error: deleteMemberError }, executeMemberDelete,] = useAxios({}, { manual: true });

  const [filteredMembersData, setFilteredMembersData] = useState<Member[]>([]);

  useEffect(() => {
    setFilteredMembersData(membersData?.data ?? []);
  }, [membersData]);

  const deleteMember = (id: string): Promise<any> => {
    return executeMemberDelete({
      url: "/api/member/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredMembersData(prevMembers => prevMembers.filter(member => member.id !== id));
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

  const handleChangesearchKey = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchKey: search,
    }));
  };

  return (
    <LayOut>
      <div className='partner-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Partner - Member
            </h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ค้นหาผู้ใช้"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <AddListName /> */}
            <Link href="/partner/add" className="ms-2 btn icon icofn-primary">
              เพิ่มพาร์ทเนอร์
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="first">No.</th>
                  <th className="name">ชื่อ-สกุล</th>
                  <th className="bank">ธนาคาร</th>
                  <th>
                    AG User
                  </th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredMembersData?.map((member: Member, index: number) => {
                  const bankObj = bankMap.find(bank => bank.value === member?.bank);
                  return (
                    <tr key={member.id}>
                      <td className="first">
                        {((params.page * 10) - 10) + index + 1}
                      </td>
                      <td className="name">
                        <div className="space-around ">
                          <b>{member?.firstname}</b>
                          <b>{member?.lastname}</b>
                        </div>
                      </td>
                      <td className="bank">
                        {bankObj &&
                          <div>
                            <img src={bankObj.image} alt={bankObj.value} style={{ width: '30px' }} />
                          </div>
                        }

                        <div>{member.bankAccount} </div>
                      </td>
                      <td>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                          Success
                        </Badge>
                        <br />
                        <Badge className="mx-1" bg="info">
                          Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                          Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                          Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                          Info
                        </Badge>
                      </td>
                      <td>
                        <PartnerViewMemberModal data={member} />

                        <PartnerAddPartnerModal data={member} />
                        <Link href={`/partner/edit/${member.id}`} className="mx-1 btn info icon icon-primary">
                          <FaPen />
                          <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                        </Link>
                        <DeleteModal data={member} apiDelete={() => deleteMember(member.id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={membersData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default MemberPage;