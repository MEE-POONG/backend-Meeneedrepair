import { MdOutlineEdit, MdDelete } from "react-icons/md";


const MembersList: React.FC = () => {
    return (
        <div className="w-full rounded-md overflow-hidden">
            <table className="border-collapse w-full">
                <thead className="bg-purple-500 text-white">
                    <tr>
                        <th className="p-3 font-bold text-bass hidden lg:table-cell text-left">No.</th>
                        <th className="p-3 font-bold text-bass hidden lg:table-cell text-left">Name</th>
                        <th className="p-3 font-bold text-bass hidden lg:table-cell text-left">Mail</th>
                        <th className="p-3 font-bold text-bass hidden lg:table-cell text-left">Phone</th>
                        <th className="p-3 font-bold text-bass hidden lg:table-cell text-center">Role</th>
                        <th className="p-3 font-bold text-bass hidden lg:table-cell text-right px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-5 lg:mb-0 rounded-lg text-xs md:text-sm lg:text-base ">
                        <td className="flex items-center gap-3 w-full lg:w-auto lg:p-2 border-b lg:table-cell ">
                            <span className="bg-purple-500 p-2 w-20 text-right table-cell lg:hidden font-bold text-white">No. :</span>
                            <p>1</p>
                        </td>
                        <td className="flex items-center gap-3 w-full lg:w-auto lg:p-2 border-b lg:table-cell">
                            <span className="bg-purple-500 p-2 w-20 text-right table-cell lg:hidden font-bold text-white">Name :</span>
                            John Smith
                        </td>
                        <td className="md:flex items-center gap-3 w-full lg:w-auto lg:p-2 border-b lg:table-cell hidden">
                            <span className="bg-purple-500 p-2 w-20 text-right table-cell lg:hidden font-bold text-white">Mail :</span>
                            <p>john@mail.com</p>
                        </td>
                        <td className="md:flex items-center gap-3 w-full lg:w-auto lg:p-2 border-b lg:table-cell hidden">
                            <span className="bg-purple-500 p-2 w-20 text-right table-cell lg:hidden font-bold text-white">Phone :</span>
                            <p>123456789</p>
                        </td>
                        <td className="flex items-center gap-3 w-full lg:w-auto lg:p-2 border-b lg:table-cell text-center">
                            <span className="bg-purple-500 p-2 w-20 text-right table-cell lg:hidden font-bold text-white">Role :</span>
                            <span className="rounded-full bg-sky-200 py-1 px-3 text-xs text-sky-800 font-semibold">user</span>
                        </td>
                        <td className="flex items-center gap-3 w-full lg:w-auto lg:p-2 border-b lg:table-cell">
                            <span className=" bg-purple-500 p-2 w-20 text-right table-cell lg:hidden font-bold text-white">Actions :</span>
                            <div className="flex justify-end gap-2 md:px-5">
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
export default MembersList;