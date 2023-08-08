import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


// Retrieved from https://stackoverflow.com/questions/58598637/why-react-new-page-render-from-the-bottom-of-the-screen