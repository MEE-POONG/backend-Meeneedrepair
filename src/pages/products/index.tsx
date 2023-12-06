import DashboardLayout from "@/components/layout";
import ProductsList from "./productsList";
import { IoMdAdd, IoMdBuild } from "react-icons/io";

const Products: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between mx-2 ">
                    <h2 className="font-semibold text-2xl">จัดการสินค้า</h2>

                    <div className="flex">
                        <button
                            className="flex items-center bg-green-500 hover:bg-green-800 text-white py-1.5 px-3 text-sm font-semibold rounded-full "
                        >
                            <span><IoMdAdd /></span>
                            <span className="hidden md:block">ADD</span>
                        </button>
                        <button
                            className="flex items-center bg-amber-400 hover:bg-amber-700 text-white py-1.5 px-3 text-sm font-semibold rounded-full ml-2"
                        >
                            Type
                        </button>
                    </div>
                </div>
                <ProductsList />

            </div>
        </DashboardLayout>
    )
}
export default Products;