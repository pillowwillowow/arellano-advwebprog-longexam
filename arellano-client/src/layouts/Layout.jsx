import { Outlet, useLocation } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <NavBar />

      <main className="pt-15">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;