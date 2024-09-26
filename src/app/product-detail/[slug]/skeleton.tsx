import { Flex } from 'antd';
import productStyles from './product.module.scss';
import { Skeleton } from 'antd';
import classNames from 'classnames';
import { createRandomArray } from '@/utils/create-random-array';

function ProductDetailPageSkeleton() {
  return (
    <Flex
      className={productStyles.detail}
      gap={30}>
      <div className={productStyles['thumb-slider']}>
        <Flex
          vertical
          gap={20}>
          <div className={productStyles['thumb-big']}>
            <div
              className={classNames(
                productStyles['thumb-big__inner'],
                productStyles['thumb-big__inner--skeleton'],
              )}>
              <Skeleton.Avatar
                active
                size='large'
                shape='square'
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          <div className={productStyles['thumb-mini']}>
            <div className='row row-cols-5 gx-1'>
              {createRandomArray(5).map((id) => (
                <div
                  className='col'
                  key={id}>
                  <div
                    className={classNames(
                      productStyles['thumb-mini__item'],
                      productStyles['thumb-mini__item--skeleton'],
                    )}>
                    <Skeleton.Avatar
                      active
                      size='large'
                      shape='square'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Flex>
      </div>

      <div className={productStyles.infor}>
        <Skeleton active />
        <div
          className={productStyles['infor-attributes']}
          style={{ marginTop: 20 }}>
          <Flex
            vertical
            gap={30}>
            <div className={productStyles['attribute']}>
              <Flex align='flex-start'>
                <Skeleton.Button
                  className={productStyles['attribute-title']}
                  active
                />
                <div className={productStyles['attribute-list']}>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </div>
              </Flex>
            </div>

            <div className={productStyles['attribute']}>
              <Flex align='flex-start'>
                <Skeleton.Button
                  className={productStyles['attribute-title']}
                  active
                />
                <div className={productStyles['attribute-list']}>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </div>
              </Flex>
            </div>

            <div className={productStyles['attribute']}>
              <Flex align='flex-start'>
                <Skeleton.Button
                  className={productStyles['attribute-title']}
                  active
                />
                <div className={productStyles['attribute-list']}>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </div>
              </Flex>
            </div>

            <div className={productStyles['attribute']}>
              <Flex align='flex-start'>
                <Skeleton.Button
                  className={productStyles['attribute-title']}
                  active
                />
                <div className={productStyles['attribute-list']}>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </div>
              </Flex>
            </div>
          </Flex>
        </div>
        <div className={productStyles['ctrls']}>
          <Skeleton.Button
            className={productStyles.ctrl}
            active
            size='large'
          />
          <Skeleton.Button
            className={productStyles.ctrl}
            active
            size='large'
          />
        </div>
      </div>
    </Flex>
  );
}

export default ProductDetailPageSkeleton;
