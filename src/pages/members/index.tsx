import DashboardLayout from "@/components/layout"
import MembersList from "./MembersList";
import MemberTabbar from "@/components/EditMemmbers/MemberTabbar";

const Members: React.FC = () => {

    const memberstabs = [
        {
            label: 'All Members',
            content: <div><MembersList /></div>
        },
        { label: 'Admin', content: <div>Content for Tab 2</div> },
        { label: 'Customer', content: <div>Content for Tab 3</div> },
        // Add more tabs as needed
    ];


    return (
        <DashboardLayout>
            <div className="flex">
                <h2 className="font-semibold md:text-2xl ml-5">ข้อมูลสมาชิก</h2>
                <button></button>
            </div>
            <div className="mt-5">
                <MemberTabbar memberstabs={memberstabs} />
            </div>
        </DashboardLayout>
    )
}
export default Members;