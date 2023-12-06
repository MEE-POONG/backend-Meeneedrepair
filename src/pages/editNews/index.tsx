import DashboardLayout from "@/components/layout";
import NewsList from "./newsList";
import { useState } from "react";
import AddNewsModal from "./AddNews";


const EditNews: React.FC = () => {
  type Props = {
    children: React.ReactNode;
  };

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between mx-2">
          <h2 className="font-semibold text-2xl">จัดการข่าว</h2>
          <button onClick={openAddModal}
            className="bg-[#1E293B] text-white py-1.5 px-3 text-sm font-semibold rounded-full"
          >
            เพิ่มข่าว
          </button>
        </div>
        <NewsList />

        <AddNewsModal isAddModalOpen={isAddModalOpen} onClose={closeAddModal} />

      </div>

    </DashboardLayout>
  )
}
export default EditNews;