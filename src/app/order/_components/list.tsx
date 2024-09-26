import { useOrders } from '@/services/order.service';
import { Flex } from 'antd';
import OrderItem from './item';
import { OrderStateType } from '@/entities/order.entity';
import OrderSkeleton from '../skeleton';
import { createRandomArray } from '@/utils/create-random-array';

function OrderList({ status }: { status?: OrderStateType }) {
  const { data, isLoading, isValidating } = useOrders(status);
  return (
    <Flex
      vertical
      gap={14}>
      {(isLoading || isValidating) &&
        !data &&
        createRandomArray(3).map((id) => <OrderSkeleton key={id} />)}

      {!(isLoading || isValidating) &&
        data &&
        data.orders.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
          />
        ))}
    </Flex>
  );
}

export default OrderList;
