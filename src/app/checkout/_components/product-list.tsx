'use client';
import ProductItem from './product-item';
import checkoutStyles from '../checkout.module.scss';
import classNames from 'classnames';
import { ICheckoutProductEntity } from '@/entities/checkout.entity';
import Image from 'next/legacy/image';
import { Flex } from 'antd';

function ProductList({ products }: { products: ICheckoutProductEntity[] }) {
  return (
    <div className={classNames(checkoutStyles['list'], checkoutStyles['section'])}>
      <h3 className={checkoutStyles['section-title']}>Danh sách sản phẩm</h3>
      <div className={checkoutStyles['list-header']}>
        <div className='row'>
          <div className='col col-6'>
            <span>Sản phẩm</span>
          </div>
          <div className='col col-2'>
            <span>Giá mỗi sản phẩm</span>
          </div>
          <div className='col col-2'>
            <span>Số lượng</span>
          </div>
          <div className='col col-2'>
            <span>Tổng giá</span>
          </div>
        </div>
      </div>

      <ul className={checkoutStyles['list-body']}>
        {!products.length && (
          <Flex
            justify='center'
            align='center'
            className={checkoutStyles['list-empty']}>
            <div>
              <Image
                src='/img/empty-cart.jpg'
                alt='empty'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Flex>
        )}
        {products.length !== 0 &&
          products.map((product) => (
            <ProductItem
              key={product.variant_id}
              product={product}
            />
          ))}
      </ul>
    </div>
  );
}

export default ProductList;
