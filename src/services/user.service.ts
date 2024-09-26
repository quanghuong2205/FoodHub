import { instance } from '@/configs/axios.config';
import { IUserEntity } from '@/entities/user.entity';
import useSWR from 'swr';

const GET_USER_INFOR_API = '/user-infor';

/**
 * [GET] /user
 */
export interface IProductsByCatApiData {
  user: IUserEntity;
}
export const getUserInforApi = async (): Promise<IProductsByCatApiData> => {
  return await instance.get(GET_USER_INFOR_API);
};

export function useUserInfor() {
  return useSWR(
    GET_USER_INFOR_API,
    async (url): Promise<IProductsByCatApiData> => await instance.get(url),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );
}
