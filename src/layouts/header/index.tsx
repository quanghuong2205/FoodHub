import { Space } from 'antd';
import HeaderSearch from './_components/search';
import UserItem from './_components/user-item';
import headerStyles from './header.module.scss';
import Notify from './_components/notify';
import Cart from './_components/cart';
import CartDrawer from '@/components/cart-drawer';
import { useViewportStore } from '@/zustand/viewport-store';
import MenuIcon from '@/components/icon-components/menu';
import { useUserStore } from '@/zustand/user.store';
import AuthButtons from './_components/ctrls';

function Header({ handleOpenSidebar }: { handleOpenSidebar: () => void }) {
  const { isMobile } = useViewportStore();
  const { user } = useUserStore();

  return (
    <div className={headerStyles.header}>
      <CartDrawer />
      {isMobile && (
        <button
          className={headerStyles['mobile-menu']}
          onClick={handleOpenSidebar}>
          <MenuIcon
            width={20}
            height={20}
          />
        </button>
      )}
      {isMobile && (
        <div className={headerStyles.logo}>
          <span>𝖖.𝖍𝖚𝖔𝖓𝖌.𝖘𝖍𝖔𝖕</span>
        </div>
      )}
      <div className={headerStyles['header-right']}>
        <Space size={!isMobile ? 28 : 20}>
          <HeaderSearch />
          <Notify />
          <Cart />
          {!isMobile && user ? <UserItem /> : <AuthButtons />}
        </Space>
      </div>
    </div>
  );
}

export default Header;
