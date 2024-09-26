import { instance } from '@/configs/axios.config';
import { IOrderEntity, OrderStateType } from '@/entities/order.entity';
import useSWR from 'swr';

export const GET_ORDER_API = '/orders';

/**
 * [GET] /checkout
 */
export function useOrders(status?: OrderStateType) {
  const url = status ? `${GET_ORDER_API}?state=${status}` : GET_ORDER_API;
  return useSWR(url, async (url): Promise<{ orders: IOrderEntity[] }> => await instance.get(url), {
    revalidateOnFocus: false,
  });
}
