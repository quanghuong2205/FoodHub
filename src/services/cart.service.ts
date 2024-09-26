import { instance } from '@/configs/axios.config';
import { ICartProductEntity } from '@/entities/cart.entity';
import { ILocalCartProduct } from '@/providers/cart/local-cart.hook';
import useSWR from 'swr';

export const PUT_CART_API = '/cart';
export const GET_CART_API = '/cart';
export const SYNC_CART_API = '/cart/sync';

/**
 * [PUT] /cart
 */
export interface IUpdateCartApiArgs {
  product_id: string;
  variant_id: string;
  quantity: number;
  checkout?: boolean;
}

export const updateCartApi = async ({
  product_id,
  variant_id,
  quantity,
  checkout = true,
}: IUpdateCartApiArgs): Promise<{ product: ICartProductEntity }> => {
  return await instance.put(PUT_CART_API, {
    product_id,
    variant_id,
    quantity,
    checkout,
  });
};

/**
 * [GET] /cart
 */

export const getCartApi = async (): Promise<{ products: ICartProductEntity[] }> => {
  return await instance.get(GET_CART_API);
};

export function useProductsByCat() {
  return useSWR(
    GET_CART_API,
    async (url): Promise<{ products: ICartProductEntity[] }> => await instance.get(url),
    {
      revalidateOnFocus: false,
    },
  );
}

/**
 * [POST] /cart/sync
 */
export const syncCartApi = async (products: ILocalCartProduct[]) => {
  return await instance.post(SYNC_CART_API, { products });
};
