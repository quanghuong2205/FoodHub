import { Flex, Skeleton } from 'antd';
import cartStyles from '../cart.module.scss';
import { ICartProductEntity } from '@/entities/cart.entity';
import ProductQtyController from '@/components/product-qty-ctrl';
import classNames from 'classnames';
import TrashIcon from '@/components/icon-components/trash';
import ServerImage from '@/components/server-image';
import debounce from '@/utils/debounce';

interface ICartItemProps {
  item: ICartProductEntity;
  isUpdating: boolean;
  handleCartProduct: (productId: string, variantId: string, qty: number) => void;
}

function CartItem({ item, handleCartProduct, isUpdating }: ICartItemProps) {
  /* Handle when quantity is changed */
  const handleProductQuantity = debounce(
    (qty: number) => {
      return handleCartProduct(item.product_id, item.variant_id, qty);
    },
    500,
    false,
  );

  /* Hanlde remove product */
  const handleRemoveProduct = () => {
    return handleCartProduct(item.product_id, item.variant_id, 0);
  };

  const thumbUrl = !item?.variant_id
    ? item.thumb_url
    : item.variants.find((v) => v._id === item.variant_id)?.thumb_url;

  return (
    <div className={cartStyles.item}>
      <Flex gap={14}>
        <div className={cartStyles['item-thumb']}>
          <ServerImage
            url={thumbUrl!}
            alt={item.name}
          />
        </div>
        <Flex
          vertical
          justify='space-between'
          style={{ width: '100%' }}>
          <Flex
            justify='space-between'
            align='flex-start'
            gap={30}>
            <div className={cartStyles['item-infor']}>
              <p className={classNames(cartStyles['item-name'], 'ellipsis-text')}>{item.name}</p>
              <p className='line-clamp'>{item.desc}</p>
            </div>

            <button
              onClick={handleRemoveProduct}
              className={classNames(isUpdating && 'disable-btn')}>
              <TrashIcon
                width={18}
                height={18}
              />
            </button>
          </Flex>

          <Flex
            justify='space-between'
            style={{
              marginTop: 18,
            }}>
            <strong className={cartStyles['item-price']}>${item.price}</strong>
            <ProductQtyController
              cls={cartStyles['item-ctrl']}
              handleSetQty={handleProductQuantity}
              stock={item.stock}
              initQty={item.quantity}
              isUpdating={isUpdating}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className={cartStyles.item}>
      <Flex gap={14}>
        <div className={cartStyles['item-thumb']}>
          <Skeleton.Avatar
            active
            shape='square'
            style={{ width: '100% !important', height: '100% !important' }}
          />
        </div>
        <Skeleton
          active
          paragraph={{ rows: 1 }}
        />
      </Flex>
    </div>
  );
}

export default CartItem;
