import { IUserEntity } from '@/entities/user.entity';
import { create } from 'zustand';

interface IUserStore {
  user: IUserEntity | null;
  setUser: (user: IUserEntity | null) => void;
}

export const useUserStore = create<IUserStore>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
