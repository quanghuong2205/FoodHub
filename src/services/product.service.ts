import { IProductDetailEntity } from './../entities/product.entity';
import { instance } from '@/configs/axios.config';
import { IProductEntity } from '@/entities/product.entity';
import useSWR from 'swr';

export const GET_PRODUCTS_BY_CAT_API = '/products';
export const GET_PRODUCT_DETAIL_API = '/product-detail';
export const GET_PRODUCT_BY_IDS_API = '/product-by-ids/?ids=';

/**
 * [GET] /products?category=
 */
export interface IProductsByCatApiData {
  products: IProductEntity[];
}
export function useProductsByCat(category: string) {
  const url = `${GET_PRODUCTS_BY_CAT_API}?category=${category}`;
  return useSWR(url, async (url): Promise<IProductsByCatApiData> => await instance.get(url), {
    revalidateOnFocus: false,
  });
}

/**
 * [GET] /product-detail/[product_id]
 */
export interface IProductDetailApiData {
  product: IProductDetailEntity;
}
export function useProductDetail(id: string) {
  const url = `${GET_PRODUCT_DETAIL_API}/${id}`;
  return useSWR(url, async (url): Promise<IProductDetailApiData> => await instance.get(url), {
    revalidateOnFocus: false,
  });
}

/**
 * [GET] /product-by-ids/?ids=
 */
export interface IProductByIdsApiData {
  products: IProductEntity[];
}
export const getProductByIdsApi = async (ids: string[]): Promise<IProductByIdsApiData> => {
  return await instance.get(`${GET_PRODUCT_BY_IDS_API}${ids.join(',')}`);
};
export function useProductByIds(ids: string[]) {
  const url = `${GET_PRODUCT_BY_IDS_API}${ids.join(',')}`;
  return useSWR(url, async (url): Promise<IProductByIdsApiData> => await instance.get(url), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
}
