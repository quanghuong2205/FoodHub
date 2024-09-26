import Link from 'next/link';
import checkoutStyles from '../checkout.module.scss';
import classNames from 'classnames';
import Button from '@/shared/button';
import { useCheckout } from '@/services/checkout.service';
import { useContext, useEffect } from 'react';
import { NotifyContext } from '@/providers/notify.provider';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/providers/cart';

function PlaceOrder() {
  const router = useRouter();
  const { sendNotify } = useContext(NotifyContext);
  const { trigger: requestOrder, isMutating, data, error, reset } = useCheckout();
  const { handleResetCart } = useContext(CartContext);

  /* Order success */
  useEffect(() => {
    if (!isMutating && !error && data) {
      sendNotify('Đặt Hàng', 'success', 'Đặt Hàng thành công');
      handleResetCart();
      router.push('/order');
    }
  }, [isMutating, error, data, sendNotify, router, handleResetCart, reset]);

  /* Error */
  useEffect(() => {
    if (error) {
      sendNotify('Đặt Hàng', 'error', 'Đặt Hàng thất bại');
      router.push('/');
    }
  }, [error, sendNotify, router]);

  return (
    <div className={classNames(checkoutStyles['order'], checkoutStyles['section'])}>
      <div className={checkoutStyles['order-policy']}>
        Chọn &quot;Đặt Hàng&quot;, Bạn đồng ý<Link href={'/policy'}>điều khoản của chúng tôi.</Link>
      </div>

      <div className={checkoutStyles['order-act']}>
        <Button
          isLoading={isMutating}
          onClick={requestOrder}
          title='Place order'
          variant='primary'
        />
      </div>
    </div>
  );
}

export default PlaceOrder;
