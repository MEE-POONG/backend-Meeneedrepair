import DashboardLayout from "@/components/layout";
import BlogList from "./blogList";


const EditBlog: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between mx-2">
                    <h2 className="font-semibold text-2xl">จัดการข่าว</h2>
                    <button 
                        className="bg-[#1E293B] text-white py-1.5 px-3 text-sm font-semibold rounded-full"
                    >
                        เพิ่มบทความ
                    </button>
                </div>
                <BlogList />
            </div>
        </DashboardLayout>
    )
}
export default EditBlog;