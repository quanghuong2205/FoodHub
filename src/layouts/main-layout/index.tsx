'use client';
import { Layout } from 'antd';
import Header from '../header';
import Sidebar from '../sidebar';
import mainlayoutStyles from './mainlayout.module.scss';
import { useViewportStore } from '@/zustand/viewport-store';
import SidebarDrawer from '../sidebar/drawer';
import { useState } from 'react';

const { Header: AntdHeader, Content, Sider } = Layout;
function Mainlayout({
  children,
  shouldHiddenHeader,
}: {
  children: React.ReactNode;
  shouldHiddenHeader?: boolean;
}) {
  const { isMobile } = useViewportStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <Layout className={mainlayoutStyles.mainlayout}>
      {!isMobile ? (
        <Sider
          collapsedWidth='0'
          className={mainlayoutStyles.aside}>
          <Sidebar />
        </Sider>
      ) : (
        <SidebarDrawer
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}>
          <Sider
            collapsedWidth='0'
            className={mainlayoutStyles.aside}>
            <Sidebar handleCloseSidebar={handleCloseSidebar} />
          </Sider>
        </SidebarDrawer>
      )}

      <Layout>
        {!shouldHiddenHeader && (
          <AntdHeader className={mainlayoutStyles.header}>
            <Header handleOpenSidebar={handleOpenSidebar} />
          </AntdHeader>
        )}

        <Content
          className={mainlayoutStyles.content}
          style={{
            maxHeight: shouldHiddenHeader ? '100vh' : 'calc(100vh - 64px)',
            overflow: 'scroll',
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Mainlayout;
