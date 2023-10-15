import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

export const useWindowResize = (): WindowSize => {
  const initialState = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  const [size, setSize] = useState<WindowSize>(initialState);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};
