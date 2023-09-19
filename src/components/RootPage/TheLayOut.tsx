// Layout.tsx
import React, { useState } from 'react';
import TheNavBar from './TheNavBar';
import TheFooter from './TheFooter';
import TheOffcanvas from './TheOffcanvas';

interface LayoutProps {
  children: React.ReactNode;
}

const LayOut: React.FC<LayoutProps> = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleToggleShow = () => setShow(!show);

  const mainStyle = show
    ? { width: 'calc(100% - 175px)', marginLeft: '175px' }
    : { width: 'calc(100% - 0px)', marginLeft: '0px' };

  return (
    <main >
      <TheOffcanvas show={show} onToggleShow={handleToggleShow} />
      <TheNavBar onToggleShow={handleToggleShow} show={show} />
      <div className='bg-whilt paper' style={mainStyle} >
        {children}
        <TheFooter />
      </div>
    </main>
  );
};

export default LayOut;
