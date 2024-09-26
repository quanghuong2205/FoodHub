import debounce from '@/utils/debounce';
import { listenEvent } from '@/utils/event';
import { useViewportStore } from '@/zustand/viewport-store';
import { useEffect } from 'react';

function useViewport() {
  const { windowSize, setWindowSize } = useViewportStore();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const debouncedResize = debounce(handleResize, 1000, false);
    handleResize();

    const event = listenEvent('resize', debouncedResize, window);
    return event;
  }, [setWindowSize]);
  return windowSize;
}

export default useViewport;
