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
import DeleteModal from "@/components/modal/DeleteModal";
import { Blog } from '@prisma/client';
import LayOut from "@/components/RootPage/TheLayOut";
import ViewDetail from "@/pages/blog/viewdetail/[id]";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const BlogPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: blogData }, getblog] = useAxios({
    url: `/api/blog?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteblogLoading, error: deleteblogError },
    executeblogDelete,
  ] = useAxios({}, { manual: true });

  const [filteredblogsData, setFilteredblogsData] = useState<
    Blog[]
  >([]);

  useEffect(() => {
    setFilteredblogsData(blogData?.blog ?? []);
  }, [blogData]);

  const deleteblog = (id: string): Promise<any> => {
    return executeblogDelete({
      url: "/api/blog/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredblogsData((prevblogs) =>
        prevblogs.filter((blog) => blog.id !== id)
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
    if (blogData?.blog) {
      // Filter the registerForm data based on searchKey
      const filteredData = blogData.blog.filter((blog: any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search  
        blog.title.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        blog.subtitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        blog.detail.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        blog.date.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        blog.author.toLowerCase().includes(params.searchKey.toLowerCase()) 
      );

      setFilteredblogsData(filteredData);
    }
  }, [blogData, params.searchKey]);

  return (
    <LayOut>
      <Head>
        <title>Phanomwan Backend</title>
        <meta name="description" content="T ACTIVE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">รายชื่อ Blog</h4>

          
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ค้นหาBLOG"
                aria-label="blog"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Link href="/blog/addblog" className="ms-2 btn icon icofn-primary">
              เพิ่ม Blog
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">No</th>
                  <th className="w-t-150">ชื่อ BLOG</th>
                  <th className="w-t-150">หัวข้อ BLOG</th>
                
                  <th className="w-t-150">วันที่</th>
                  <th className="w-t-150">ผู้เขียน</th>
                  <th className="w-t-150">รายละเอียด BLOG</th>

                  
                  
                  <th className="w-t-150">รูปภาพ</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredblogsData.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    {/* <td>{blog.regId}</td> */}
                    <td>{blog.title}</td>
                    {/* <td>{blog.regBirth}</td> */}
                    <td>{blog.subtitle}</td>
                    {/* <td>{blog.regNation}</td> */}
                    {/* <td>{blog.blogubDetail}</td> */}
                    <td>{blog.date}</td>
                    <td>{blog.author}</td>
                    <td>{blog.detail ? (
                      blog.detail.length > 100 ? (
                        `${blog.detail.substring(0, 100)}...`
                      ) : (
                        blog.detail
                      )
                    ) : null}</td>


                    {/* <td>{blog.newDate}</td> */}
                    {/* <td>{blog.regEname}</td>
                    <td>{blog.regElastname}</td> */}

                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${blog.img}/public`}
                        alt="blog imge"
                        thumbnail
                      />
                    </td>

                    {/* <img src={blog.img} alt="blog" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <blogAddblogModal data={blog} /> */}


                      {/* <EditblogModal data={blog} apiEdit={() => editblog(editList)} /> */}
                      <ViewDetail data={blog}/>
                      
                      <Link
                        href={`/blog/edit/${blog.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={blog}
                        apiDelete={() => deleteblog(blog.id)}
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
              totalPages={blogData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default BlogPage;
