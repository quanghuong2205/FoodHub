import Link from 'next/link';
import checkoutStyles from '../checkout.module.scss';
import classNames from 'classnames';
import { ICheckoutInfor } from '@/entities/checkout.entity';

function Summary({ checkout }: { checkout: ICheckoutInfor }) {
  return (
    <div className={classNames(checkoutStyles['summary'], checkoutStyles['section'])}>
      <div
        className={classNames(checkoutStyles['summary-header'], checkoutStyles['section-header'])}>
        <div
          className={classNames(
            checkoutStyles['summary-header__left'],
            checkoutStyles['section-header__left'],
          )}>
          <span>Tóm tắt</span>
        </div>
        <div className={checkoutStyles['section-header__right']}>
          <Link href={'/cart'}>Thay đổi</Link>
        </div>
      </div>

      <div className={checkoutStyles['summary-content']}>
        <div className={checkoutStyles['summary-group']}>
          <span>Tổng giá đơn hàng: </span>
          <span>{checkout.total_price}$</span>
        </div>
        <div className={checkoutStyles['summary-group']}>
          <span>Phí vận chuyển: </span>
          <span>{checkout.total_shippment}$</span>
        </div>
        <div className={checkoutStyles['summary-group']}>
          <span>Chiết khấu: </span>
          <span>-{checkout.total_discount}$</span>
        </div>
      </div>

      <div className={checkoutStyles['summary-total-order']}>
        <span className={checkoutStyles['summary-total-order__label']}>Tổng thanh toán</span>
        <div className={checkoutStyles['summary-total-order__value']}>
          <span>${checkout.final_price}</span>
          <p>
            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh
            khác)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
