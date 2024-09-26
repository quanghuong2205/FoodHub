import { create } from 'zustand';

interface ICartDrawerState {
  isOpen: boolean;
  products: [];
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartDrawerStore = create<ICartDrawerState>()((set) => ({
  isOpen: false,
  products: [],
  openDrawer: () => set(() => ({ isOpen: true })),
  closeDrawer: () => set(() => ({ isOpen: false })),
}));
