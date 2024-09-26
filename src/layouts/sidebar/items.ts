import { ISidebarItemProps } from './item';

export const items: ISidebarItemProps[] = [
  {
    title: 'Trang chủ',
    iconUrl: '/icon/home.png',
    path: '/',
  },

  {
    title: 'Yêu thích',
    iconUrl: '/icon/love.png',
    path: '/love',
  },

  {
    title: 'Đơn hàng',
    iconUrl: '/icon/cart.png',
    path: '/order',
  },

  {
    title: 'Thông tin',
    iconUrl: '/icon/profile.png',
    path: '/profile',
  },
];
