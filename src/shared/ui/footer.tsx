import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTokenStore } from '../store/TokenStore'

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const {role} = useTokenStore()
  const [pages, setPages] = useState([
    { title: 'Home', path: '/', isActive: false },
    { title: 'My Deals', path: '/myads', isActive: false },
    { title: 'Wallet', path: '/wallet', isActive: false },
  ]);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const currentPath = location.pathname;
    setPages(prevPages =>
      prevPages.map(page => ({
        ...page,
        isActive: page.path === currentPath,
      }))
    );
  }, [location.pathname]);

  const handleRedirect = (title: string) => {
    const selectedPage = pages.find(page => page.title === title);
    if (selectedPage) {
      setPages(prevPages =>
        prevPages.map(page =>
          page.title === title
            ? { ...page, isActive: true }
            : { ...page, isActive: false }
        )
      );
      navigate(selectedPage.path);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport)
      setIsVisible(window.visualViewport.height >= window.innerHeight);
    };
    if (window.visualViewport)
      window.visualViewport.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      if (window.visualViewport)
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex justify-center items-center px-3 pb-3 text-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className='bg-crypto-bg-secondary w-full rounded-b-[40px] rounded-t-[16px] flex justify-around items-center h-[83px] shadow-crypto-lg border-t border-crypto-border-primary'>
        {pages.map((page, i) => (
          <button
            key={i}
            className={`w-[70px] rounded-2xl h-[58px] transition-all font-medium ${
              page.isActive ? 'bg-crypto-brand-primary text-crypto-bg-primary' : 'text-crypto-text-secondary hover:text-crypto-text-primary'
            }`}
            onClick={() => handleRedirect(page.title)}
          >
            {page.title}
          </button>
        ))}
      
      </div>
    </div>
  );
}
