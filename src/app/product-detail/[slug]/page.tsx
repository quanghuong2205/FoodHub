'use client';
import productStyles from './product.module.scss';
import ThumbSlider from './_components/thumb-slider';
import { Flex } from 'antd';
import classNames from 'classnames';
import ProductRating from '@/components/product-rating';
import { useProductDetail } from '@/services/product.service';
import ProductDetailPageSkeleton from './skeleton';
import ProductOptions from './_components/options';

function ProductDetail({ params: { slug } }: { params: { slug: string } }) {
  const { data, isLoading, isValidating } = useProductDetail(slug);

  if (isLoading || isValidating) return <ProductDetailPageSkeleton />;
  if (!data) return <></>;
  const product = data.product;
  console.log(product);
  return (
    <div className='page'>
      <Flex
        className={productStyles.detail}
        gap={30}>
        <ThumbSlider
          productThumb={product.thumb_url}
          variants={product.variants}
        />
        <div className={productStyles.infor}>
          <h3 className={classNames(productStyles['infor-title'], 'line-clamp')}>{product.name}</h3>
          <p className={classNames(productStyles['infor-desc'], 'line-clamp')}>{product.desc}</p>

          <div className={productStyles['infor-rating']}>
            <ProductRating
              rating={product.rating}
              iconSize={18}
            />
          </div>

          <ProductOptions
            productId={product._id}
            attributes={product.attributes}
            variants={product.variants}
            totalStock={product.stock_details.total}
            variantStocks={product.stock_details.variant_stocks}
            minPrice={product.min_price}
            maxPrice={product.max_price}
            productDetail={product}
          />
        </div>
      </Flex>
    </div>
  );
}

export default ProductDetail;
