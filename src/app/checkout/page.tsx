'use client';
import { useCheckoutInfor } from '@/services/checkout.service';
import Address from './_components/address';
import Payment from './_components/payment';
import PlaceOrder from './_components/place-order';
import ProductList from './_components/product-list';
import Shipment from './_components/shippment';
import Summary from './_components/summary';
import checkoutStyles from './checkout.module.scss';
import classNames from 'classnames';
import Loading from '@/components/loading';

function CheckoutPage() {
  const { data, isLoading } = useCheckoutInfor();
  if (isLoading) return <Loading content='Đang tải thông tin giỏ hàng....' />;
  return (
    <div className={classNames(checkoutStyles['checkout'], 'page')}>
      <div className='container'>
        <div className='row'>
          <div className='col col-9'>
            {data && data?.products && <ProductList products={data.products} />}
            <Shipment />
            <Payment />
          </div>
          <div className='col col-3'>
            <Address />
            {data && data?.products && <Summary checkout={data.checkout_infor} />}
            {data && data.products.length !== 0 && <PlaceOrder />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
