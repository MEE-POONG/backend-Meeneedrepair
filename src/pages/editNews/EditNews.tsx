// components/Modal.tsx
import React, { ChangeEvent, useState } from 'react';
import { MdClose } from "react-icons/md";

interface EditNewsModalProps {
    isEditModalOpen: boolean;
    onClose: () => void;
}
const EditNewsModal: React.FC<EditNewsModalProps> = ({ isEditModalOpen, onClose }) => {
    if (!isEditModalOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-25 p-2">
            <div className="bg-white p-3 md:p-6 rounded shadow-md ">
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>Edit News</h1>
                    <button className=" bg-blue-500 text-white p-2 rounded" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>

                <div className='mt-4'>
                    <div>
                        <label htmlFor="">Topic :</label>
                        <input type="text" className='border-0 text-sm rounded-lg ml-2 md:w-96' />
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="">Image (main)</label>
                        <img src="https://www.online-station.net/wp-content/uploads/2023/06/image-145.png"
                            className='w-1/2 rounded-md drop-shadow-lg py-1' alt="" />
                        <input
                            className="text-sm rounded-full mt-2"
                            type="file" src="" alt="" />
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="">Description :</label>
                        <textarea name="" id="" className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' ></textarea>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default EditNewsModal;
