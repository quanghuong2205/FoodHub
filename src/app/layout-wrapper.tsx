'use client';
import Loading from '@/components/loading';
import useViewport from '@/hooks/useViewport';
import { getUserInforApi } from '@/services/user.service';
import { useUserStore } from '@/zustand/user.store';
import { useEffect, useState } from 'react';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useViewport();

  /* Request to get user-infor from token */
  useEffect(() => {
    const requestUser = async () => {
      try {
        setIsLoading(true);
        const response = await getUserInforApi();
        setUser(response.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    };

    requestUser();
  }, [setUser]);

  if (isLoading) return <Loading content='Đang tải trang, vui lòng đợi' />;
  if (isMounted) return <>{children}</>;
}

export default LayoutWrapper;
