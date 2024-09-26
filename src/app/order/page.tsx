'use client';
import classNames from 'classnames';
import orderStyles from './order.module.scss';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import OrderList from './_components/list';
import './styles/tab.scss';
import { status } from './const';

function OrderPage() {
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: <span>Tất cả</span>,
      children: <OrderList />,
    },
    {
      key: 'pending',
      label: <span>{status['pending']}</span>,
      children: <OrderList status='pending' />,
    },
    {
      key: 'delivered',
      label: <span>{status['delivered']}</span>,
      children: <OrderList status='delivered' />,
    },
    {
      key: 'completed',
      label: <span>{status['completed']}</span>,
      children: <OrderList status='completed' />,
    },
    {
      key: 'cancelled',
      label: <span>{status['cancelled']}</span>,
      children: <OrderList status='cancelled' />,
    },
    {
      key: 'returned',
      label: <span>{status['returned']}</span>,
      children: <OrderList status='returned' />,
    },
  ];

  return (
    <div className={classNames('page', orderStyles['order-page'])}>
      <div className='container'>
        <Tabs
          className='order-tab'
          defaultActiveKey='1'
          items={items}
        />
      </div>
    </div>
  );
}

export default OrderPage;
