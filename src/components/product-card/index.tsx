import { IProductEntity } from '@/entities/product.entity';
import productStyles from './product.module.scss';
import { Flex } from 'antd';
import classNames from 'classnames';
import FavouriteButton from './_component/love-button';
import ProductRating from '../product-rating';
import ServerImage from '../server-image';
import Link from 'next/link';

interface IProductCardProps {
  product: IProductEntity;
}

function ProductCard({ product }: IProductCardProps) {
  return (
    <div className='col col-2 col-md-6'>
      <Link
        className={productStyles.product}
        href={`/product-detail/${product._id}`}>
        <div className={productStyles['product-label']}>
          <span>10%</span>
        </div>

        <div className={productStyles.thumb}>
          <div className={productStyles['thumb-inner']}>
            <ServerImage
              url={product.thumb_url}
              alt={product.name}
            />
          </div>
        </div>

        <div className={productStyles['product-infor']}>
          <p className={productStyles['product-name']}>{product.name}</p>
          <p className={classNames(productStyles['product-desc'], 'line-clamp')}>{product.desc}</p>
          <div className={productStyles['product-price']}>
            <strong>${product.min_price}</strong>
            {product.max_price && (
              <>
                <span>~</span>
                <strong>${product.max_price}</strong>
              </>
            )}
          </div>

          <Flex
            justify='space-between'
            align='center'>
            <FavouriteButton />
            <ProductRating rating={4} />
          </Flex>
          <span className={productStyles['product-location']}>Foodhub kitchen</span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
