import { MdOutlineEdit, MdDelete } from "react-icons/md";

const BlogList: React.FC = () => {
    return (
        <div className="overflow-hidden rounded-lg lg:shadow-xl m-2">
            <table className="border-collapse w-full">
                <thead className="bg-[#1e293b] text-white  ">
                    <tr className="">
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left ">Topic</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left">Image</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-left">Description</th>
                        <th className="p-3 uppercase font-medium text-sm hidden lg:table-cell text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        className="bg-gray-50 hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap 
                    lg:flex-no-wrap mb-10 lg:mb-0 shadow-xl rounded-lg text-xs md:text-base"
                    >
                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Topic </span>
                            <p className="px-3 py-1 md:p-3 w-3/4 md:w-64 md:truncate ">KTC เทรนด์รถไฟฟ้าในไทยมาแรง ยอดรูดหมวด EV พุ่ง 60%</p>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Image</span>
                            <div className="w-3/4">
                                <img
                                    className="p-2"
                                    src="https://images.workpointtoday.com/workpointnews/2023/11/30144208/1701330125_30862_WEB_1.png" alt=""
                                />
                            </div>
                        </td>

                        <td className="flex items-center lg:table-cell lg:w-auto border-b ">
                            <span className="bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Descriptions</span>
                            <div className="px-3 py-1 line-clamp-1 ">
                                KTC เผยยอดรูดบัตรในหมวดรถยนต์ไฟฟ้าเติบโตกว่า 60% คาดสิ้นปีพอร์ตแตะ 100 ล้านบาท รับเทรนด์พลังงานสะอาดที่เข้ามามีบทบาทมากขึ้น
                                ‘สุวัฒน์ เทพปรีชาสกุล’ ผู้บริหารสูงสุด ฝ่ายการตลาดบัตรเครดิต KTC หรือ บริษัท บัตรกรุงไทย จำกัด (มหาชน) เปิดเผยว่า จากเทรนด์พลังงานทางเลือกที่เข้ามามีบทบาทมากขึ้น KTC ได้ร่วมกับพันธมิตรในการให้บริการสินเชื่อที่เกี่ยวกับยานยนต์ไฟฟ้า (EV) แบบครบวงจร
                                เริ่มตั้งแต่การออกรถยนต์ โดยร่วมกับค่ายรถยนต์ในการให้บริการผ่อนชำระเงินจอง-เงินดาวน์ แท่นชาร์จ โดยให้บริการผ่อนชำระตั้งแต่การติดตั้งแท่นชาร์จ ไปจนถึงการผ่อนชำระค่าชาร์จไฟฟ้า นอกจากนี้ ยังให้บริการผ่อนชำระโซลาร์รูฟท็อป อุปกรณ์เฉพาะ ไปจนถึงประกันภัยรถ EV อีกด้วย
                            </div>
                        </td>

                        <td className="flex items-center lg:table-cell w-full lg:w-auto border-b">
                            <span className=" bg-[#1e293b] text-white lg:hidden p-2 md:w-28 h-full">Actions</span>
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
export default BlogList;