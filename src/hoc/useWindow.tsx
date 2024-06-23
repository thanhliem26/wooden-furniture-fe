import { useEffect, useState } from "react";

const useResizeWindow = () => {
  const [resize, setResize] = useState<resize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setResize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return window.addEventListener('resize', handleResize);
  }, []) 

  return resize;
};

export default useResizeWindow;
