'use client';
import Modal from '@/shared/modal';
import { useState } from 'react';
import productStyles from './product.module.scss';

interface IModalInfor {
  title: string;
  desc: string;
}

function useInforModal(title: string, desc: string) {
  const [infor, setInfor] = useState<IModalInfor>({ title, desc });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (title: string, desc: string) => {
    setInfor({ title, desc });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setInfor({ title: '', desc: '' });
    setIsOpen(false);
  };

  return {
    InforModal: () => (
      <Modal
        title={infor.title}
        isOpen={isOpen}
        onClose={handleCloseModal}
        hasFooter
        onOk={handleCloseModal}>
        <p className={productStyles['infor-modal__desc']}>{infor.desc}</p>
      </Modal>
    ),
    handleOpenModal,
  };
}

export default useInforModal;
