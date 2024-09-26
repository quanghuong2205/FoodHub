import { create } from 'zustand';

export type AuthModeType = 'sign-in' | 'sign-up';
interface IAuthModalState {
  isOpen: boolean;
  authMode: AuthModeType;
  open: () => void;
  close: () => void;
  switchAuthMode: () => void;
  setAuthMode: (mode: AuthModeType) => void;
}

export const useAuthModalStore = create<IAuthModalState>()((set) => ({
  isOpen: false,
  authMode: 'sign-in',
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false, authMode: 'sign-in' })),
  switchAuthMode: () =>
    set((state) => ({ authMode: state.authMode === 'sign-in' ? 'sign-up' : 'sign-in' })),
  setAuthMode: (mode) => set(() => ({ authMode: mode })),
}));
