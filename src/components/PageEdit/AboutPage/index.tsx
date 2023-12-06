import React from "react";
import { MdAutoFixHigh } from "react-icons/md";

const AboutPage: React.FC = () => {
    return (
        <div className="m-5 p-5 shadow-lg rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
                About Page
                <button><MdAutoFixHigh /></button>
            </div>
            <div className="">

            </div>
        </div>
    )
}
export default AboutPage;