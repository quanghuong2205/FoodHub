'use client';
import useNotify, { NotifyType } from '@/hooks/useNotify';
import { createContext } from 'react';

interface INotifyContextProps {
  sendNotify: (message: string, type: NotifyType, desc?: string) => void;
}
export const NotifyContext = createContext<INotifyContextProps>({} as INotifyContextProps);

interface TodoProviderProps {
  children: React.ReactNode;
}

function NotifyProvider({ children }: TodoProviderProps) {
  const { sendNotify, contextHolder } = useNotify({ duration: 2 });

  return (
    <NotifyContext.Provider value={{ sendNotify }}>
      <>
        {contextHolder}
        {children}
      </>
    </NotifyContext.Provider>
  );
}

export default NotifyProvider;
