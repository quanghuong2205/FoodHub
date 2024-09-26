import checkoutStyles from '../checkout.module.scss';
import classNames from 'classnames';
import ServerImage from '@/components/server-image';
import { ICheckoutProductEntity } from '@/entities/checkout.entity';

function ProductItem({ product }: { product: ICheckoutProductEntity }) {
  return (
    <li className={checkoutStyles.item}>
      <div className='row'>
        <div className='col col-6'>
          <div className={checkoutStyles['item-main']}>
            <div className={checkoutStyles['item-thumb']}>
              <ServerImage
                url={product.thumb_url}
                alt={product.name}
              />
            </div>

            <div className={checkoutStyles['item-text']}>
              <p className={classNames(checkoutStyles['item-name'], 'line-clamp')}>
                {product.name}
              </p>
              <p className={classNames(checkoutStyles['item-desc'], 'line-clamp')}>
                {product.desc}
              </p>
            </div>

            <div className={checkoutStyles['item-variant']}>
              <span>{product.variant}</span>
            </div>
          </div>
        </div>

        <div className='col col-2'>
          <div>
            <span className={checkoutStyles['item-price']}>${product.price}</span>
          </div>
        </div>

        <div className='col col-2'>
          <div>
            <span className={checkoutStyles['item-amount']}>{product.quantity}</span>
          </div>
        </div>

        <div className='col col-2'>
          <div>
            <span
              className={classNames(checkoutStyles['item-price'], checkoutStyles['item-subtotal'])}>
              ${product.price * product.quantity}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
