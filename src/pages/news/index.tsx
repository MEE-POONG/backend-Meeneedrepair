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
import { News } from '@prisma/client';
import LayOut from "@/components/RootPage/TheLayOut";
import DeleteModal from "@/components/modal/DeleteModal";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const NewsPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: newsData }, getnews] = useAxios({
    url: `/api/news?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deletenewsLoading, error: deletenewsError },
    executenewsDelete,
  ] = useAxios({}, { manual: true });

  const [filterednewssData, setFilterednewssData] = useState<
    News[]
  >([]);

  useEffect(() => {
    setFilterednewssData(newsData?.news ?? []);
  }, [newsData]);

  const deletenews = (id: string): Promise<any> => {
    return executenewsDelete({
      url: "/api/news/" + id,
      method: "DELETE",
    }).then(() => {
      setFilterednewssData((prevnewss) =>
        prevnewss.filter((news) => news.id !== id)
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
    if (newsData?.news) {
      // Filter the registerForm data based on searchKey
      const filteredData = newsData.news.filter((news: any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        news.title.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news.subtitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news.detail.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news.date.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news.author.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news.refer.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news.img.toLowerCase().includes(params.searchKey.toLowerCase())


      );

      setFilterednewssData(filteredData);
    }
  }, [newsData, params.searchKey]);

  return (
    <LayOut>

      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">ข่าว</h4>

            {/* ค้นหาข้อมูล */}
            {/* <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangeSearchTerm(e.target.value)}
                placeholder="ค้นหาโปรโมชั่น"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup> */}
            {/* <AddListName /> */}

            {/* ค้นหาข้อมูล */}
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ค้นหาข่าว"
                aria-label="news"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Link href="/news/addNews" className="ms-2 btn icon icofn-primary">
              เพิ่มข่าว
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">No</th>
                  <th className="w-t-150">หัวข้อข่าว</th>
                  <th className="w-t-150">หัวข้อข่าวย่อย</th>
                  <th className="w-t-150">รายละเอียด</th>
                  <th className="w-t-150">วันที่</th>
                  <th className="w-t-150">ผู้เขียน</th>
                  <th className="w-t-150">อ้างอิง</th>
                  <th className="w-t-150">รูป</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filterednewssData
                  .slice() // สร้างสำเนาของอาร์เรย์เพื่อป้องกันการเปลี่ยนแปลงต้นฉบับ
                  .sort((a, b) => new Date(1.30).getTime() - new Date(30.1).getTime()) // เรียงลำดับข้อมูลตามวันที่จากใหม่สู่เก่า
                  .map((news, index) => (
                    <tr key={news.id}>
                      <td className="w-t-150">{index + 1}</td>
                      <td className="w-t-150">{news.title}</td>
                      <td className="w-t-150">{news.subtitle}</td>
                      <td className="w-t-150">{news.detail ? (
                      news.detail.length > 100 ? (
                        `${news.detail.substring(0, 100)}...`
                      ) : (
                        news.detail
                      )
                    ) : null}</td>
                      <td className="w-t-150">{news.date}</td>
                      <td className="w-t-150">{news.author}</td>
                      <td className="w-t-150">{news.refer}</td>

                      <td className="w-t-150">
                        <Image
                          src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img}/public`}
                          alt="newsSchool imge"
                          thumbnail
                        />
                      </td>

                      <td>
                        <Link
                          href={`/news/edit/${news.id}`}
                          className="mx-1 btn info icon icon-primary"
                        >
                          <FaPen />
                          <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                        </Link>
                        <DeleteModal
                          data={news}
                          apiDelete={() => deletenews(news.id)}
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
              totalPages={newsData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default NewsPage;
