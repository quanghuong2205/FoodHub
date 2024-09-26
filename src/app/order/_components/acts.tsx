import { Flex } from 'antd';
import Button from '@/shared/button';
import orderStyles from '../order.module.scss';
import { OrderStateType } from '@/entities/order.entity';

function OrderActs({ state }: { state: OrderStateType }) {
  return (
    <Flex
      justify='flex-end'
      gap={16}
      className={orderStyles['item-acts']}>
      {state === 'pending' && (
        <>
          <Button
            title='Chờ duyệt'
            variant='primary'
            disabled
          />

          <Button
            title='Hủy'
            variant='outline'
          />
        </>
      )}

      {state === 'delivered' && (
        <>
          <Button
            title='Chờ giao hàng'
            variant='primary'
            disabled
          />
        </>
      )}

      {state === 'completed' && (
        <>
          <Button
            title='Mua lại'
            variant='primary'
          />

          <Button
            title='Xem chi tiết đơn hàng'
            variant='outline'
          />
        </>
      )}

      {state === 'cancelled' && (
        <Button
          title='Xem chi tiết đơn hàng'
          variant='outline'
        />
      )}
    </Flex>
  );
}

export default OrderActs;
