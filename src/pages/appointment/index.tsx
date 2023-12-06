import DashboardLayout from "@/components/layout";
import AppointList from "./appointList";


const EditAppointment:React.FC =() =>{
    return(
        <DashboardLayout>
            <div className="">
                <h2 className="font-semibold text-xl ml-5">จัดการการจอง</h2>
                <AppointList/>
            </div>
        </DashboardLayout>
    )
}
export default EditAppointment;