import { Flex, Skeleton } from 'antd';
import orderStyles from './order.module.scss';
import classNames from 'classnames';

function OrderSkeleton() {
  return (
    <div className={classNames(orderStyles.item, orderStyles['item-skeleton'])}>
      <Flex gap={12}>
        <div className={orderStyles['product-thumb']}>
          <Skeleton.Avatar
            shape='square'
            className={orderStyles['product-thumb__skeleton']}
            active
          />
        </div>
        <Skeleton
          paragraph={{ rows: 2, width: ['50%', '30%'] }}
          active
        />
      </Flex>
      <Flex
        justify='flex-end'
        gap={16}
        style={{ marginTop: 16 }}>
        <Skeleton.Button
          size='large'
          style={{ width: 140 }}
          active
        />
        <Skeleton.Button
          size='large'
          style={{ width: 140 }}
          active
        />
      </Flex>
    </div>
  );
}

export default OrderSkeleton;
