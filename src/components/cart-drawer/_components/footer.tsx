import { Flex } from 'antd';
import cartStyles from '../cart.module.scss';
import { useContext, useMemo } from 'react';
import { CartContext } from '@/providers/cart';
import Button from '@/shared/button';
import { useRouter } from 'next/navigation';
import { useCartDrawerStore } from '@/zustand/cart-drawer-store';

function Footer() {
  const router = useRouter();
  const { products, isCartUpdating } = useContext(CartContext);
  const { closeDrawer } = useCartDrawerStore();

  /* Cart total price */
  const totalPrice = useMemo(() => {
    return products.reduce((acc: number, cur) => (acc += cur.price * cur.quantity), 0);
  }, [products]);

  /* Handle go to checkout page */
  const handleGoToCheckout = () => {
    if (!products.length) return;
    closeDrawer();
    router.push('/checkout');
  };

  return (
    <footer className={cartStyles.footer}>
      <Flex vertical>
        <Flex
          className={cartStyles['cart-summary']}
          justify='space-between'>
          <div className={cartStyles['cart-total-qty']}>
            <span>Tổng sản phẩm</span>{' '}
            <span>({isCartUpdating ? '...' : `${products.length}`}) items</span>
          </div>

          <strong className={cartStyles['cart-total-price']}>
            {isCartUpdating ? '...đang tính toán' : `$${totalPrice}`}
          </strong>
        </Flex>
        <Button
          onClick={handleGoToCheckout}
          disabled={!products.length}
          title='Tiếp tục thanh toán'
          variant='primary'
          cls={cartStyles['cart-checkout']}
        />
        <span className={cartStyles['cart-call']}>Mua ngay trước khi hết hàng.</span>
      </Flex>
    </footer>
  );
}

export default Footer;
