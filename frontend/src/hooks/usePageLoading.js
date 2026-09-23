import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoading = (duration = 2000) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Tampilkan loading setiap kali location berubah
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [location.pathname, duration]);

  return isLoading;
};