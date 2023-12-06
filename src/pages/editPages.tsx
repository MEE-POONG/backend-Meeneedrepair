
import AboutPage from "@/components/PageEdit/AboutPage";
import ContactPage from "@/components/PageEdit/ContactPage";
import DashboardLayout from "@/components/layout";


const EditPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between mx-2 ">
                    <h2 className="font-semibold text-2xl">จัดการหน้าเว็บ</h2>
                </div>

                <AboutPage/>
                <ContactPage/>
            </div>
        </DashboardLayout>
    )
}
export default EditPage;