import { Skeleton } from 'antd';
import productStyles from './product.module.scss';
import classNames from 'classnames';

function ProductCardSkeleton() {
  return (
    <div className='col col-2 col-md-6'>
      <div className={productStyles.thumb}>
        <div
          className={classNames(
            productStyles['thumb-inner'],
            productStyles['thumb-inner--skeleton'],
          )}>
          <Skeleton.Avatar
            active
            size='large'
            shape='square'
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <Skeleton active />
    </div>
  );
}

export default ProductCardSkeleton;
