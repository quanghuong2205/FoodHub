import classNames from 'classnames';
import checkoutStyles from '../checkout.module.scss';

function Discount() {
  return (
    <div className={classNames(checkoutStyles['discount'], checkoutStyles['section'])}>
      <div
        className={classNames(checkoutStyles['discount-header'], checkoutStyles['section-header'])}>
        <div
          className={classNames(
            checkoutStyles['discount-header__left'],
            checkoutStyles['section-header__left'],
          )}>
          <span>Mã giảm giá</span>
        </div>
        <div
          className={classNames(
            checkoutStyles['discount-header__right'],
            checkoutStyles['section-header__right'],
          )}>
          <span>2 mã giảm giá có thể sử dụng</span>
        </div>
      </div>

      <div className={checkoutStyles['discount-content']}>
        <button className={checkoutStyles['discount-act']}>Nhập mã</button>
      </div>
    </div>
  );
}

export default Discount;
