import { create } from 'zustand';

interface IWindowSize {
  width: number;
  height: number;
}

interface IViewportStore {
  windowSize: IWindowSize;
  isMobile: boolean;
  setWindowSize: (size: IWindowSize) => void;
}

export const useViewportStore = create<IViewportStore>()((set) => ({
  windowSize: { width: 0, height: 0 },
  isMobile: false,
  setWindowSize: (size) => set(() => ({ windowSize: size, isMobile: size.width <= 768 })),
}));
