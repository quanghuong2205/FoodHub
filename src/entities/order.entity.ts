export type OrderStateType = 'pending' | 'delivered' | 'completed' | 'cancelled' | 'returned';

export interface IOrderProductEntity {
  _id: string;
  name: string;
  price: number;
  thumb_url: string;
  quantity: number;
  variant: string;
  variant_id: string;
}

export interface IOrderInfor {
  total_price: number;
  total_discount: number;
  total_shippment: number;
  final_price: number;
}

export interface IOrderEntity {
  _id: string;
  address: string;
  total_price: number;
  state: OrderStateType;
  products: IOrderProductEntity[];
}
