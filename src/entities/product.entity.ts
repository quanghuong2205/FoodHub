export interface IVariant {
  _id: string;
  options: Record<string, string>;
  thumb_url: string;
  price: number;
  product?: string;
}

export interface IVariantStock {
  variant_id: string;
  stock: number;
}

export interface IProductEntity {
  _id: string;
  name: string;
  desc: string;
  category: string;
  min_price: number;
  max_price: number;
  stock: number;
  rating: number;
  thumb_url: string;
  attributes: Record<string, string[]>;
  variants: IVariant[];
  likers: string[];
}

export interface IProductDetailEntity extends IProductEntity {
  stock_details: {
    total: number;
    variant_stocks: IVariantStock[];
  };
}

export const devProducts: IProductEntity[] = [
  {
    _id: 'táo-fuji',
    name: 'Táo Fuji',
    desc: 'Táo Fuji giòn, ngọt và giàu vitamin, rất thích hợp cho sức khỏe.',
    category: 'Trái cây',
    min_price: 45000,
    max_price: 50000,
    likers: [],
    stock: 500,
    rating: 4.9,
    thumb_url: '/product-img/tao-fuji.jpg',
    attributes: {
      colors: ['Đỏ', 'Xanh'],
      sizes: ['Nhỏ', 'Vừa', 'Lớn'],
    },
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
  },

  {
    _id: 'chuoi-cavendish',
    name: 'Chuối Cavendish',
    desc: 'Chuối Cavendish ngọt, mềm, và rất bổ dưỡng, thích hợp cho bữa sáng.',
    category: 'Trái cây',
    min_price: 30000,
    max_price: 35000,
    likers: [],
    stock: 1000,
    rating: 4.7,
    thumb_url: '/product-img/chuoi.png',
    attributes: {
      colors: ['Vàng'],
      sizes: ['Nhỏ', 'Vừa'],
    },
    variants: [
      {
        _id: 'chuoi-cavendish-v1',
        price: 30000,
        options: {
          color: 'Vàng',
          size: 'Nhỏ',
        },
        thumb_url: '/product-img/chuoi.png',
      },
      {
        _id: 'chuoi-cavendish-v2',
        price: 35000,
        options: {
          color: 'Vàng',
          size: 'Vừa',
        },
        thumb_url: '/product-img/chuoi.png',
      },
    ],
  },

  {
    _id: 'nho-khong-hat',
    name: 'Nho Không Hạt',
    desc: 'Nho không hạt, tươi ngon, mọng nước, rất tốt cho sức khỏe và dễ ăn.',
    category: 'Trái cây',
    min_price: 80000,
    max_price: 85000,
    likers: [],
    stock: 300,
    rating: 4.8,
    thumb_url: '/product-img/nho.jpg',
    attributes: {
      colors: ['Xanh', 'Đỏ'],
      sizes: ['Vừa', 'Lớn'],
    },
    variants: [
      {
        _id: 'nho-khong-hat-v1',
        price: 80000,
        options: {
          color: 'Xanh',
          size: 'Vừa',
        },
        thumb_url: '/product-img/nho.jpg',
      },
      {
        _id: 'nho-khong-hat-v2',
        price: 85000,
        options: {
          color: 'Đỏ',
          size: 'Lớn',
        },
        thumb_url: '/product-img/nho.jpg',
      },
    ],
  },

  {
    _id: 'cam-navel',
    name: 'Cam Navel',
    desc: 'Cam Navel mọng nước, ngọt và không có hạt, lý tưởng cho mùa hè.',
    category: 'Trái cây',
    min_price: 55000,
    max_price: 60000,
    likers: [],
    stock: 600,
    rating: 4.6,
    thumb_url: '/product-img/cam.jpg',
    attributes: {
      colors: ['Cam'],
      sizes: ['Nhỏ', 'Vừa', 'Lớn'],
    },
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
  },

  {
    _id: 'du-du',
    name: 'Đu Đủ',
    desc: 'Đu đủ chín mọng, ngọt và giàu vitamin C, rất tốt cho tiêu hóa.',
    category: 'Trái cây',
    min_price: 35000,
    max_price: 40000,
    likers: [],
    stock: 400,
    rating: 4.5,
    thumb_url: '/product-img/dudu.jpg',
    attributes: {
      colors: ['Vàng', 'Xanh'],
      sizes: ['Nhỏ', 'Lớn'],
    },
    variants: [
      {
        _id: 'du-du-v1',
        price: 40000,
        options: {
          color: 'Vàng',
          size: 'Lớn',
        },
        thumb_url: '/product-img/dudu.jpg',
      },
      {
        _id: 'du-du-v2',
        price: 35000,
        options: {
          color: 'Xanh',
          size: 'Nhỏ',
        },
        thumb_url: '/product-img/dudu.jpg',
      },
    ],
  },

  {
    _id: 'xoi-gac',
    name: 'Xôi Gấc',
    desc: 'Xôi gấc thơm ngon, màu sắc bắt mắt, chứa nhiều vitamin A, rất tốt cho sức khỏe.',
    category: 'Đồ ăn',
    min_price: 30000,
    max_price: 40000,
    likers: [],
    stock: 200,
    rating: 4.9,
    thumb_url: '/product-img/xoi-gac.png',
    attributes: {
      flavors: ['Ngọt', 'Mặn'],
      sizes: ['Nhỏ', 'Vừa', 'Lớn'],
    },
    variants: [
      {
        _id: 'xoi-gac-v1',
        price: 40000,
        options: {
          flavor: 'Ngọt',
          size: 'Lớn',
        },
        thumb_url: '/product-img/xoi-gac.png',
      },
      {
        _id: 'xoi-gac-v2',
        price: 30000,
        options: {
          flavor: 'Ngọt',
          size: 'Vừa',
        },
        thumb_url: '/product-img/xoi-gac.png',
      },
    ],
  },
];
