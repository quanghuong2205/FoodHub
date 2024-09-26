export interface ICategoryEntity {
  id: string;
  name: string;
  thumb_url: string;
}

export const devCategories: ICategoryEntity[] = [
  {
    id: 'traicay',
    name: 'Trái cây',
    thumb_url: '/category-img/trai-cay.jpg',
  },
  {
    id: 'raucu',
    name: 'Rau củ',
    thumb_url: '/category-img/rau-cu.jpg',
  },
  {
    id: 'xoi',
    name: 'Xôi',
    thumb_url: '/category-img/xoi.jpg',
  },
  {
    id: 'banh',
    name: 'Bánh',
    thumb_url: '/category-img/banh-mi.jpg',
  },
];
