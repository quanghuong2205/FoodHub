export interface ICheckoutProductEntity {
  _id: string;
  name: string;
  desc: string;
  price: number;
  variant: string;
  variant_id: string;
  quantity: number;
  thumb_url: string;
}

export interface ICheckoutInfor {
  total_price: number;
  total_discount: number;
  total_shippment: number;
  final_price: number;
}

export interface ICheckoutEntity {
  checkout_infor: ICheckoutInfor;
  products: ICheckoutProductEntity[];
}
