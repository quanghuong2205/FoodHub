import CustomError from '@/configs/error.config';
import { useState } from 'react';

function useRequest<A, R>(asyncRequest: (arg: A) => Promise<R>) {
  const [error, setError] = useState<CustomError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async (args: A): Promise<R | undefined> => {
    try {
      setIsLoading(true);
      return await asyncRequest(args);
    } catch (error) {
      setError(() => {
        if (error instanceof CustomError) {
          return error;
        }
        return new CustomError('Something went wrong', undefined, -1);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendRequest, error };
}

export default useRequest;
