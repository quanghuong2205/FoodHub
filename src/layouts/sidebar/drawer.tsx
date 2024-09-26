import { Drawer } from 'antd';
import React from 'react';

interface ISidebarDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function SidebarDrawer({ children, isOpen, onClose }: ISidebarDrawerProps) {
  return (
    <Drawer
      placement='left'
      style={{ width: '86%', marginRight: 'auto' }}
      bodyStyle={{ padding: 0 }}
      footer={null}
      closeIcon={null}
      onClose={onClose}
      open={isOpen}>
      {children}
    </Drawer>
  );
}

export default SidebarDrawer;
