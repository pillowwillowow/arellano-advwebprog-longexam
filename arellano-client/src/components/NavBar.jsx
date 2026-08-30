import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/nubdexchange_logo.png';

const navLinkClassName = ({ isActive }) =>
  [
    'relative px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition',
    'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:scale-x-0 after:bg-yellow-400 after:transition-transform',
    'hover:text-yellow-400 hover:after:scale-x-100',
    isActive
      ? 'text-white after:scale-x-100'
      : 'text-white'
  ].join(' ');

const NavBar = () => { const navigate = useNavigate();
const storedUser = localStorage.getItem('user');
  const user = storedUser
    ? JSON.parse(storedUser)
    : null;
const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user');
    navigate('/auth/signin');
    window.location.reload();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-1 border-zinc-900 bg-blue-900 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">

        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-3"
        >
          <img
            src={logo}
            alt="BulldogEx"
            className="h-10 w-10 rounded-full border-1 border-zinc-900 bg-white object-contain"
          />

          <span className="text-lg font-bold text-white font-unbounded">
            BulldogEx Shop
          </span>
        </NavLink>

        <nav className="hidden flex-1 items-center justify-end gap-1 md:flex">

          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              className={navLinkClassName}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClassName}
            >
              About
            </NavLink>

            <NavLink
              to="/products"
              className={navLinkClassName}
            >
              Products
            </NavLink>

            {user && (
              <NavLink
                to="/orders"
                className={navLinkClassName}
              >
                Orders
              </NavLink>
            )}

            {user?.role === 'customer' && (
              <NavLink
                to="/profile"
                className={navLinkClassName}
              >
                Profile
              </NavLink>
            )}

            {user?.role === 'admin' && (
              <NavLink
                to="/manage-users"
                className={navLinkClassName}
              >
                Manage Users
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-2 border-l border-yellow-400 pl-5">
            {!user ? (
              <>
                <NavLink
                  to="/auth/signin"
                  className="rounded-full px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-blue-100 hover:text-zinc-900"
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/auth/signup"
                  className="rounded-full border-1 border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-900"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <div className="flex min-w-[90px] flex-col items-start">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    {user.role}
                  </p>

                  <p className="text-md font-semibold text-yellow-300">
                    {user.firstName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border-1 border-zinc-900 bg-white px-5 py-3 text-xs font-semibold text-zinc-900 transition hover:bg-yellow-300 hover:text-zinc-900"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </nav>
      </div>
    </header>
  );
};

export default NavBar;