import Link from 'next/link';
import checkoutStyles from '../checkout.module.scss';
import classNames from 'classnames';
import { Flex } from 'antd';

function Address() {
  return (
    <div className={classNames(checkoutStyles['address'], checkoutStyles['section'])}>
      <div
        className={classNames(checkoutStyles['address-header'], checkoutStyles['section-header'])}>
        <div className={checkoutStyles['section-header__left']}>Địa chỉ giao hàng</div>
        <div className={checkoutStyles['section-header__right']}>
          <Link href={'/checkout/shipping-address'}>Thay đổi</Link>
        </div>
      </div>

      <div className={checkoutStyles['address-content']}>
        <Flex>
          <strong className='bold ellipsis-text'>Quang Hướng</strong>
          <span className={checkoutStyles['address-separator']}></span>
          <strong>0372262860</strong>
        </Flex>

        <span>1277 Giải Phóng, Phường Hoàng Liệt, Quận Hoàng Mai, Hà Nội</span>
      </div>

      <div className={checkoutStyles['address-label']}>
        <span>Mặc định</span>
      </div>
    </div>
  );
}

export default Address;
