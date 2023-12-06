import DashboardLayout from "@/components/layout";
import OrderList from "./orderList";


const EditAppointment: React.FC = () => {
    return (
        <DashboardLayout>
            <h2 className="font-semibold md:text-2xl ml-5">จัดการรายการสั่งซื้อ</h2>
            <div>
                <OrderList />
            </div>
        </DashboardLayout>
    )
}
export default EditAppointment;