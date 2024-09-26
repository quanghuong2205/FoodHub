import { Flex } from 'antd';
import productStyles from '../product.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { IVariant } from '@/entities/product.entity';
import { sendEvent } from '@/utils/event';

interface IProductVariantsProps {
  handleSetVariantId: (id: string) => void;
  variants: IVariant[];
  attributes: Record<string, string[]>;
}

function ProductVariants({ attributes, variants, handleSetVariantId }: IProductVariantsProps) {
  const [variant, setVariant] = useState<Record<string, string>>({});

  /* Handle set variant attribute */
  const handleSetVariantAttr = (attr: string, value: string) => () => {
    if (variant[attr] === value) {
      return setVariant((prev) => {
        delete prev[attr];
        return { ...prev };
      });
    }

    setVariant((prev) => {
      return { ...prev, [attr]: value };
    });
  };

  /* Handle set variant (consider its variants) */
  useEffect(() => {
    /* Not select enough attributes */
    if (Object.keys(variant).length !== Object.keys(attributes).length) {
      return handleSetVariantId('');
    }

    /* Find the variant by selected attributes */
    const chosenVariant = variants.find((v) =>
      Object.keys(v.options).every((attr) => v.options[attr] === variant[attr]),
    );

    /* Set id of chosen variant */
    handleSetVariantId(chosenVariant?._id ?? '');

    /* Send event to active thumb */
    sendEvent('variant::thumb', { url: chosenVariant?.thumb_url });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, variants, variant]);

  return (
    <>
      {Object.keys(attributes).map((attr) => (
        <div
          className={productStyles['attribute']}
          key={attr}>
          <Flex align='flex-start'>
            <span className={productStyles['attribute-title']}>{attr}</span>
            <div className={productStyles['attribute-list']}>
              {attributes[attr].map((value) => (
                <button
                  onClick={handleSetVariantAttr(attr, value)}
                  key={value}
                  className={classNames(productStyles['attribute-item'], {
                    [productStyles['attribute-item--active']]: variant[attr] === value,
                  })}>
                  {value}
                </button>
              ))}
            </div>
          </Flex>
        </div>
      ))}
    </>
  );
}

export default ProductVariants;
