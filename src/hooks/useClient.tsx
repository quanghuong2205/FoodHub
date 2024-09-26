import { useEffect, useState } from 'react';

function useClient() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient };
}

export default useClient;
