import { MdOutlineEdit, MdDelete } from "react-icons/md";

const OrderList: React.FC = () => {
    return (
        <div className="overflow-hidden rounded-lg lg:shadow-xl m-2">
            <table className="border-collapse w-full">
                <thead className="bg-[#1e293b] text-white  ">
                    <tr className="">
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left ">Appoint No.</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left">Costumer</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left">Product</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left">Status</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        className="bg-gray-50 hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap 
                        lg:flex-no-wrap mb-10 lg:mb-0 shadow-xl rounded-lg text-xs md:text-base"
                    >
                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 w-20 h-full">Order No.</span>
                            <p className="px-3 py-1 md:p-3">OD-0001</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 w-20 h-full">Cotumer</span>
                            <p className="px-3 py-1">John Smith</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 w-20 h-full">Products</span>
                            <p className="px-3 py-1">Notebook Acer</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 w-20 h-full">Status</span>
                            <span className="ml-3 rounded-full bg-green-400 py-1 px-3 text-xs text-green-800 font-semibold">finish</span>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 w-20 h-full">Actions</span>
                            <div className="flex justify-end px-5 gap-3">
                                <a href="#" className="text-red-400 hover:text-red-700"> <MdDelete /></a>
                                <a href="#" className="text-green-500 hover:text-green-700" ><MdOutlineEdit /></a>
                            </div>
                        </td>
                    </tr>


                </tbody>

            </table>



        </div>
    )
}
export default OrderList;