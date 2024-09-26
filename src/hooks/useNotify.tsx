import { notification } from 'antd';
import { ArgsProps, NotificationPlacement } from 'antd/es/notification/interface';

export type NotifyType = 'success' | 'info' | 'warning' | 'error';

interface IUseNotifyProps {
  duration?: number;
  placement?: NotificationPlacement;
  showProgress?: boolean;
  pauseOnHover?: boolean;
}

function useNotify({
  duration = 3,
  placement = 'topRight',
  showProgress,
  pauseOnHover,
}: IUseNotifyProps) {
  const [api, contextHolder] = notification.useNotification({
    duration,
    showProgress,
    pauseOnHover,
  });

  const getNotifyApi = (type: NotifyType): ((args: ArgsProps) => void) => {
    switch (type) {
      case 'success':
        return api.success;
      case 'info':
        return api.info;
      case 'warning':
        return api.warning;
      case 'error':
        return api.error;
      default:
        return api.info;
    }
  };

  const sendNotify = (message: string, type: NotifyType, desc?: string) => {
    /* Config */
    const config = {
      message: message ?? 'No messages',
      description: desc,
      placement,
    };

    /* Send notify */
    const api = getNotifyApi(type);
    api(config);
  };

  return { sendNotify, contextHolder };
}

export default useNotify;
