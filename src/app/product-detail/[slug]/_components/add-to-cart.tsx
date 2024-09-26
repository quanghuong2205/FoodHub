import Button from '@/shared/button';
import { Flex } from 'antd';
import productStyles from '../product.module.scss';
import Image from 'next/legacy/image';
import { IOption } from './options';
import { useContext } from 'react';
import { CartContext } from '@/providers/cart';
import { IProductDetailEntity } from '@/entities/product.entity';
import { useCartDrawerStore } from '@/zustand/cart-drawer-store';
import classNames from 'classnames';

interface IAddToCartButtonProps {
  option: IOption;
  handleValidateOption: () => boolean;
  productDetail: IProductDetailEntity;
}

function AddToCartButton({ option, handleValidateOption, productDetail }: IAddToCartButtonProps) {
  const { handleAddToCart: handleAddToCartFromContext, isCartUpdating } = useContext(CartContext);
  const { openDrawer } = useCartDrawerStore();

  const handleAddToCart = async () => {
    /* Validate option */
    if (!handleValidateOption()) return;

    openDrawer();

    await handleAddToCartFromContext(
      productDetail,
      option.product_id,
      option.variant_id,
      option.quantity,
    );
  };

  return (
    <Button
      variant='outline'
      cls={classNames(productStyles['ctrl'], isCartUpdating && 'disable-btn')}
      onClick={handleAddToCart}>
      <Flex
        align='center'
        gap={10}>
        <div className={productStyles['ctrl-icon']}>
          <Image
            src='/icon/cart.png'
            alt='user'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <span className={productStyles['ctrl-text']}>Thêm vào giỏ hàng</span>
      </Flex>
    </Button>
  );
}

export default AddToCartButton;
