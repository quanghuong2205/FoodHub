import CustomError from '@/configs/error.config';
import { useCallback, useEffect, useState } from 'react';

function useFetch<A, R>(args: A, asyncRequest: (args: A) => Promise<R>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<CustomError | undefined>(undefined);

  const asyncRequestMemo = useCallback(async () => {
    console.log('hello run callback again');
    return await asyncRequest(args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(args), asyncRequest]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const data = await asyncRequestMemo();
        setData(data);
      } catch (error) {
        setError(() => {
          if (error instanceof CustomError) {
            return error;
          }
          return new CustomError('something went wrong', undefined, -1);
        });
      } finally {
        setIsLoading(false);
      }
    };

    sendRequest();
  }, [asyncRequestMemo]);

  return { isLoading, data, error };
}

export default useFetch;
