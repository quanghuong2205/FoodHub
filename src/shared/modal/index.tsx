'use client';
import useClient from '@/hooks/useClient';
import { Modal as AntdModal } from 'antd';

interface IModalProps {
  children: React.ReactNode;
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  hasFooter?: boolean;
}

function Modal({ title, isOpen, onClose, onOk, children, hasFooter }: IModalProps) {
  const { isClient } = useClient();

  if (isClient) {
    if (hasFooter) {
      return (
        <AntdModal
          title={title}
          open={isOpen}
          onOk={onOk}
          onCancel={onClose}
          onClose={onClose}>
          {children}
        </AntdModal>
      );
    } else {
      return (
        <AntdModal
          title={title}
          open={isOpen}
          onOk={onOk}
          onCancel={onClose}
          onClose={onClose}
          footer={null}>
          {children}
        </AntdModal>
      );
    }
  }
}

export default Modal;
