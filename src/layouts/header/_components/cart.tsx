import { Badge } from 'antd';
import Image from 'next/legacy/image';
import headerStyles from '../header.module.scss';
import { useCartDrawerStore } from '@/zustand/cart-drawer-store';
import { useViewportStore } from '@/zustand/viewport-store';
import { CartContext } from '@/providers/cart';
import { useContext } from 'react';

function Cart() {
  const { openDrawer } = useCartDrawerStore();
  const { isMobile } = useViewportStore();
  const { products } = useContext(CartContext);

  return (
    <Badge
      size={!isMobile ? 'default' : 'small'}
      count={products.length}
      className={headerStyles['header-badge']}>
      <button
        className={headerStyles['header-icon']}
        onClick={openDrawer}>
        <Image
          src='/icon/cart.png'
          alt='user'
          layout='fill'
          objectFit='contain'
        />
      </button>
    </Badge>
  );
}

export default Cart;
