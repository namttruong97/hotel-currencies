import { useEffect, useState } from 'react';

//  BREAK POINT FROM ANT DESIGN
const MOBILE_WIDTH = 576;
const DESKTOP_WIDTH = 1200;

interface IScreen {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IScreen>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowSize.width <= MOBILE_WIDTH;
  const isTablet = windowSize.width > MOBILE_WIDTH && windowSize.width < DESKTOP_WIDTH;
  const isDesktop = windowSize.width >= DESKTOP_WIDTH;

  return { width: windowSize.width, height: windowSize.height, isMobile, isTablet, isDesktop };
}

export default useWindowSize;
