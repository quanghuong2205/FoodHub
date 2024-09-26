'use client';
import { Flex } from 'antd';
import productStyles from '../product.module.scss';
import ProductVariants from './variants';
import ProductQtyController from '@/components/product-qty-ctrl';
import { IProductDetailEntity, IVariant, IVariantStock } from '@/entities/product.entity';
import { useContext, useMemo, useState } from 'react';
import ProductCtrls from './ctrls';
import { CartContext } from '@/providers/cart';

interface IProductOptionsProps {
  productId: string;
  minPrice: number;
  maxPrice?: number;
  attributes: Record<string, string[]>;
  variants: IVariant[];
  totalStock: number;
  variantStocks: IVariantStock[];
  productDetail: IProductDetailEntity;
}

export interface IOption {
  product_id: string;
  variant_id: string;
  quantity: number;
}

function ProductOptions({
  productId,
  attributes,
  totalStock,
  minPrice,
  maxPrice,
  variants,
  productDetail,
}: IProductOptionsProps) {
  const [option, setOption] = useState<IOption>({
    product_id: productId,
    variant_id: '',
    quantity: 0,
  });
  const { isCartUpdating } = useContext(CartContext);

  const handleSetProductQty = (qty: number) => {
    setOption({ ...option, quantity: qty });
  };

  const handleSetVariantId = (variant_id: string) => {
    setOption({ ...option, variant_id });
  };

  const chosenVariant = useMemo(() => {
    return variants.find((variant) => variant._id === option.variant_id);
  }, [option.variant_id, variants]);

  return (
    <>
      <div className={productStyles['infor-price']}>
        {!chosenVariant ? (
          <>
            <strong>${minPrice}</strong>
            {maxPrice && (
              <>
                <span>~</span>
                <strong>${maxPrice}</strong>
              </>
            )}
          </>
        ) : (
          <strong>${chosenVariant.price}</strong>
        )}
      </div>

      <div className={productStyles['infor-attributes']}>
        <Flex
          vertical
          gap={30}>
          <ProductVariants
            attributes={attributes}
            handleSetVariantId={handleSetVariantId}
            variants={variants}
          />
          <div className={productStyles['attribute']}>
            <Flex align='flex-start'>
              <span className={productStyles['attribute-title']}>Số lượng</span>
              <div className={productStyles['attribute-list']}>
                <ProductQtyController
                  handleSetQty={handleSetProductQty}
                  stock={totalStock}
                  isUpdating={isCartUpdating}
                />
              </div>
            </Flex>
          </div>
        </Flex>
      </div>

      <ProductCtrls
        option={option}
        productDetail={productDetail}
      />
    </>
  );
}

export default ProductOptions;
