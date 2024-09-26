import { useCartDrawerStore } from '@/zustand/cart-drawer-store';
import { Drawer } from 'antd';
import cartStyles from './cart.module.scss';
import CloseIcon from '../icon-components/close';
import { useViewportStore } from '@/zustand/viewport-store';
import Cart from './_components/cart';
import { useContext } from 'react';
import { CartContext } from '@/providers/cart';
import Footer from './_components/footer';

function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawerStore();
  const { isMobile } = useViewportStore();
  const {} = useContext(CartContext);

  return (
    <Drawer
      style={{ width: isMobile ? '86%' : 'auto', marginLeft: 'auto' }}
      className={cartStyles.wrapper}
      footer={null}
      closeIcon={null}
      open={isOpen}
      onClose={closeDrawer}>
      <div className={cartStyles.cart}>
        <header className={cartStyles.header}>
          <p className={cartStyles.title}>Thông tin giỏ hàng </p>
          <button
            className={cartStyles.close}
            onClick={closeDrawer}>
            <CloseIcon />
          </button>
        </header>

        <div className={cartStyles.list}>
          <Cart />
        </div>

        <Footer />
      </div>
    </Drawer>
  );
}

export default CartDrawer;
