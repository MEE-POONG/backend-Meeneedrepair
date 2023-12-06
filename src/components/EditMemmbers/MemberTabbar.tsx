import { useState } from 'react';

type Tab = {
  label: string;
  content: React.ReactNode;
};

interface MemberTabbarProps {
    memberstabs: Tab[];
}

const MemberTabbar: React.FC<MemberTabbarProps> = ({ memberstabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex">
        {memberstabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${
              index === activeTab
                ? 'text-gray-900 border-b-2 font-bold border-purple-600'
                : 'text-gray-700'
            } py-2 px-4 text-xs md:text-base focus:outline-none`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 border border-t-0 rounded-b">
        {memberstabs[activeTab].content}
      </div>
    </div>
  );
};

export default MemberTabbar;
