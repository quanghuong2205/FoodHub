'use client';
import { IVariant } from '@/entities/product.entity';
import productStyles from '../product.module.scss';
import { Flex } from 'antd';
import classNames from 'classnames';
import ServerImage from '@/components/server-image';
import { useEffect, useRef, useState } from 'react';

interface IThumbSliderProps {
  productThumb: string;
  variants: IVariant[];
}

function ThumbSlider({ productThumb, variants }: IThumbSliderProps) {
  const urls = [productThumb, ...variants.map((v) => v.thumb_url)];
  const [activeThumb, setActiveThumb] = useState<string>(productThumb);
  const variantThumb = useRef<string>(productThumb);

  /* Handle set active thumb */
  const handleSetActiveThumb = (url: string) => {
    setActiveThumb(url);
  };

  /* Listen event to active thumb from variant */
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setActiveThumb(detail.url);
      variantThumb.current = detail.url;
    };
    document.addEventListener('variant::thumb', handler);

    return () => {};
  }, []);

  return (
    <div className={productStyles['thumb-slider']}>
      <Flex
        vertical
        gap={20}>
        <div className={productStyles['thumb-big']}>
          <div className={productStyles['thumb-big__inner']}>
            <ServerImage
              url={activeThumb}
              alt=''
            />
          </div>
        </div>

        <div className={productStyles['thumb-mini']}>
          <div className='row row-cols-5 gx-1'>
            {urls.map((url) => (
              <div
                className='col'
                key={url}>
                <div
                  className={classNames(
                    productStyles['thumb-mini__item'],
                    url === activeThumb && productStyles['thumb-mini__item--active'],
                  )}
                  onMouseEnter={() => {
                    handleSetActiveThumb(url);
                  }}
                  onMouseLeave={() => {
                    handleSetActiveThumb(variantThumb.current);
                  }}>
                  <ServerImage
                    url={url}
                    alt=''
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Flex>
    </div>
  );
}

export default ThumbSlider;
