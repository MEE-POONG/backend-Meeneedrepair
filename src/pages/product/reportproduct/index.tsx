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
import { Product } from '@prisma/client';
import LayOut from "@/components/RootPage/TheLayOut";
import DeleteModal from "@/components/modal/DeleteModal";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const ProductPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: productData }, getproduct] = useAxios({
    url: `/api/product?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteproductLoading, error: deleteproductError },
    executeproductDelete,
  ] = useAxios({}, { manual: true });

  const [filteredproductsData, setFilteredproductsData] = useState<
    Product[]
  >([]);

  useEffect(() => {
    setFilteredproductsData(productData?.product ?? []);
  }, [productData]);

  const deleteproduct = (id: string): Promise<any> => {
    return executeproductDelete({
      url: "/api/product/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredproductsData((prevproducts) =>
        prevproducts.filter((product) => product.id !== id)
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
    if (productData?.product) {
      // Filter the registerForm data based on searchKey
      const filteredData = productData.product.filter((product:any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        product.productname.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productbrand.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productmodel.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productdetail.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.producttype.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productcost.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productprice.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productremaining.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        product.productimg.toLowerCase().includes(params.searchKey.toLowerCase()) 

    
      );

      setFilteredproductsData(filteredData);
    }
  }, [productData, params.searchKey]);

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
            <h4 className="mb-0 py-1">รายชื่อข่าว</h4>

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
                placeholder="ค้นหาสินค้า"
                aria-label="product"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Link href="/product/addproduct" className="ms-2 btn icon icofn-primary">
              เพิ่มสินค้า
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">No</th>
                  <th className="w-t-150">ชื่อสินค้า</th>
                  <th className="w-t-150">แบรนสินค้า</th>
                  <th className="w-t-150">รุ่น</th>
                  <th className="w-t-150">รายละเอียด</th>
                  <th className="w-t-150">ประเภท</th>
                  <th className="w-t-150">ต้นทุน</th>
                  <th className="w-t-150">ราคา</th>
                  <th className="w-t-150">สินค้าคงคลัง</th>
                  <th className="w-t-150">รูป</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredproductsData.map((product, index) => (
                  <tr key={product.id}>
                    <td className="w-t-150">{index + 1}</td>
                    <td className="w-t-150">{product.productname}</td>
                    <td className="w-t-150">{product.productbrand}</td>
                    <td className="w-t-150">{product.productmodel}</td>
                    <td className="w-t-150">{product.productdetail}</td>
                    <td className="w-t-150">{product.producttype}</td>
                    <td className="w-t-150">{product.productcost}</td>
                    <td className="w-t-150">{product.productprice}</td>
                    <td className="w-t-150">{product.productremaining}</td>
               
                    <td className="w-t-150">
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${product.productimg}/public`}
                        alt="newsSchool imge"
                        thumbnail
                      />
                    </td>


                 

                    {/* <img src={product.img} alt="product" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <newsSchoolAddnewsSchoolModal data={newsSchool} /> */}


                      {/* <EditnewsSchoolModal data={newsSchool} apiEdit={() => editnewsSchool(editList)} /> */}
                      <Link
                        href={`/product/edit/${product.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      {/* <DeleteModal
                        data={product}
                        apiDelete={() => deletenewsSchool(product.id)}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect
              page={params.page}
              totalPages={productData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default ProductPage;
