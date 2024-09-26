import { IVariant } from './product.entity';

export interface ICartProductEntity {
  product_id: string;
  variant_id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  stock: number;
  thumb_url: string;
  variants: IVariant[];
  checkout: boolean;
}

export interface ICartEntity {
  products: ICartProductEntity[];
}

const devCartProducts: ICartProductEntity[] = [
  {
    product_id: 'táo-fuji',
    name: 'Táo Fuji',
    desc: 'Táo Fuji giòn, ngọt và giàu vitamin, rất thích hợp cho sức khỏe.',
    price: 50000,
    quantity: 100,
    stock: 500,
    thumb_url: '/product-img/tao-fuji.jpg',
    variant_id: 'táo-fuji-v1',
    variants: [
      {
        _id: 'táo-fuji-v1',
        price: 50000,
        options: {
          color: 'Đỏ',
          size: 'Lớn',
        },
        thumb_url: '/product-img/tao-fuji-do.jpg',
      },
      {
        _id: 'táo-fuji-v2',
        price: 45000,
        options: {
          color: 'Xanh',
          size: 'Vừa',
        },
        thumb_url: '/product-img/tao-fuji-xanh.jpg',
      },
    ],
    checkout: true,
  },

  {
    product_id: 'cam-navel',
    name: 'Cam Navel',
    desc: 'Cam Navel mọng nước, ngọt và không có hạt, lý tưởng cho mùa hè.',
    price: 60000,
    quantity: 150,
    stock: 600,
    thumb_url: '/product-img/cam.jpg',
    variant_id: 'cam-navel-v1',
    variants: [
      {
        _id: 'cam-navel-v1',
        price: 60000,
        options: {
          color: 'Cam',
          size: 'Lớn',
        },
        thumb_url: '/product-img/cam.jpg',
      },
      {
        _id: 'cam-navel-v2',
        price: 55000,
        options: {
          color: 'Cam',
          size: 'Vừa',
        },
        thumb_url: '/product-img/cam.jpg',
      },
    ],
    checkout: true,
  },
];

export const devCart: ICartEntity = {
  products: devCartProducts,
};
