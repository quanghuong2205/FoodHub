import ServerImage from '@/components/server-image';
import { Flex } from 'antd';
import orderStyles from '../order.module.scss';
import { IOrderEntity } from '@/entities/order.entity';
import { status } from '../const';
import OrderActs from './acts';

function OrderItem({ order }: { order: IOrderEntity }) {
  return (
    <div className={orderStyles.item}>
      <Flex
        justify='space-between'
        className={orderStyles['item-header']}>
        <span className={orderStyles['item-status']}>{status[order.state]}</span>
      </Flex>

      <div className={orderStyles.products}>
        {order.products.map((product) => (
          <Flex
            key={product.variant_id}
            justify='space-between'
            align='center'
            className={orderStyles['product']}>
            <Flex gap={12}>
              <div className={orderStyles['product-thumb']}>
                <ServerImage
                  url={product.thumb_url}
                  alt={product.name}
                />
              </div>
              <div className={orderStyles['product-infor']}>
                <p className={orderStyles['product-name']}>{product.name}</p>
                <p className={orderStyles['product-variant']}>{product.variant}</p>
                <strong className={orderStyles['product-qty']}>x{product.quantity}</strong>
              </div>
            </Flex>

            <div className={orderStyles['product-price']}>
              <strong>{product.quantity * product.price}$</strong>
            </div>
          </Flex>
        ))}
      </div>

      <Flex
        justify='flex-end'
        style={{ padding: '18px 0' }}>
        <div className={orderStyles['item-total-price']}>
          <Flex
            gap={18}
            align='center'>
            <span>Thành tiền:</span>
            <strong>${order.total_price}</strong>
          </Flex>
        </div>
      </Flex>

      <OrderActs state={order.state} />
    </div>
  );
}

export default OrderItem;
