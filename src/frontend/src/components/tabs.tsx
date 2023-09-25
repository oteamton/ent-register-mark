import React from 'react';

interface TabsProps {
  tabNames: string[];
  formRefs: React.RefObject<HTMLDivElement>[];
}

const Tabs: React.FC<TabsProps> = ({ tabNames, formRefs }) => {
    const handleTabClick = (index: number) => {
      formRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <div className="tabs">
        {tabNames.map((tab, index) => (
          <button key={index} onClick={() => handleTabClick(index)}>
            {tab}
          </button>
        ))}
      </div>
    );
  };

export default Tabs;