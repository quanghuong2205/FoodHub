import { instance } from '@/configs/axios.config';
import { ICheckoutEntity } from '@/entities/checkout.entity';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const GET_CHECKOUT_API = '/checkout';
export const CHECKOUT_API = '/checkout';

/**
 * [GET] /checkout
 */
export function useCheckoutInfor() {
  return useSWR(
    GET_CHECKOUT_API,
    async (url): Promise<ICheckoutEntity> => await instance.get(url),
    {
      revalidateOnFocus: false,
    },
  );
}

/**
 * [POST] /checkout
 */
export function useCheckout() {
  return useSWRMutation(CHECKOUT_API, async (url, {}): Promise<void> => await instance.post(url));
}
