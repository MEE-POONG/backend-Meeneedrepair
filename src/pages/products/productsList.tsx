import { MdOutlineEdit, MdDelete } from "react-icons/md";

const ProductsList: React.FC = () => {
    return (
        <div className="overflow-hidden rounded-lg lg:shadow-xl m-2">
            <table className="border-collapse w-full">
                <thead className="bg-[#1e293b] text-white ">
                    <tr className="">
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-left ">Product No.</th>
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-left ">Roduct Name</th>
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-left">Image</th>
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-left">Description</th>
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-left">Type</th>
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-left">Amount</th>
                        <th className="p-3 uppercase font-semibold text-sm hidden lg:table-cell text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        className="bg-gray-50 hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap 
                        lg:flex-no-wrap mb-10 lg:mb-0 shadow-xl rounded-lg text-xs md:text-sm"
                    >
                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Product No. </span>
                            <p className="px-3 py-1 md:p-3 w-28">PMNR-0001</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Product Name </span>
                            <p className="px-3 py-1 md:p-3 w-48">CPU CORE I7-12700KF (Original) No Fan</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className="bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Image</span>
                            <img
                                className="w-24 lg:w-3/4"
                                src="https://img.advice.co.th/images_nas/pic_product4/A0139524/A0139524OK_BIG_1.jpg" alt=""
                            />
                        </td>

                        <td className="flex items-center lg:table-cell lg:w-auto border-b ">
                            <span className="bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Descriptions</span>
                            <div className="px-3 py-1 line-clamp-2 ">
                                KTC เผยยอดรูดบัตรในหมวดรถยนต์ไฟฟ้าเติบโตกว่า 60% คาดสิ้นปีพอร์ตแตะ 100 ล้านบาท รับเทรนด์พลังงานสะอาดที่เข้ามามีบทบาทมากขึ้น
                                ‘สุวัฒน์ เทพปรีชาสกุล’ ผู้บริหารสูงสุด ฝ่ายการตลาดบัตรเครดิต KTC หรือ บริษัท บัตรกรุงไทย จำกัด (มหาชน) เปิดเผยว่า จากเทรนด์พลังงานทางเลือกที่เข้ามามีบทบาทมากขึ้น KTC ได้ร่วมกับพันธมิตรในการให้บริการสินเชื่อที่เกี่ยวกับยานยนต์ไฟฟ้า (EV) แบบครบวงจร
                                เริ่มตั้งแต่การออกรถยนต์ โดยร่วมกับค่ายรถยนต์ในการให้บริการผ่อนชำระเงินจอง-เงินดาวน์ แท่นชาร์จ โดยให้บริการผ่อนชำระตั้งแต่การติดตั้งแท่นชาร์จ ไปจนถึงการผ่อนชำระค่าชาร์จไฟฟ้า นอกจากนี้ ยังให้บริการผ่อนชำระโซลาร์รูฟท็อป อุปกรณ์เฉพาะ ไปจนถึงประกันภัยรถ EV อีกด้วย
                            </div>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Type</span>
                            <span className="ml-3 rounded-full bg-amber-200 py-1 px-3 text-xs text-amber-800 font-semibold shadow-md">CPU</span>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Amount</span>
                            <p className="text-center ml-3 lg:ml-0">1000</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Actions</span>
                            <div className="flex justify-end px-5 gap-1 text-lg">
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
export default ProductsList;