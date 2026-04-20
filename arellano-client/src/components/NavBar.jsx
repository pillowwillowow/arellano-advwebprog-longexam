import { NavLink } from 'react-router-dom';
import logo from '../assets/img/nubdexchange_logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },

  {/*Enhancement 3: Provide accessible navigation links for both Sign In and Sign Up pages.*/},
  { label: 'Sign In', to: '/auth/signin' },
  { label: 'Sign Up', to: '/auth/signup' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-900 after:transition-all after:duration-300',
    'hover:after:w-full',
    isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-violet-300/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="BulldogEx" className="h-9 w-9 rounded-full border-2 border-zinc-900 bg-violet-50 object-contain" />
          <div className="space-y-0.5">

          {/* Enhancement 5: Research and apply a custom font to the web application using an appropriate implementation method. */}
          <p
          className="text-xl font-bold text-zinc-900 font-unbounded">BulldogEx Shop</p>
          </div>
          
        </NavLink>
        <nav className="hidden items-center gap-2 md:flex">
          
         {links.map((link) => {
            let customClass = navLinkClassName;
            if (link.to === '/auth/signup') {
              customClass = () =>
                'flex gap-3 text-black px-4 py-2 text-[13px] hover:text-violet-900 font-semibold lowercase [24-em]';
            }

            if (link.to === '/auth/signin') {
              customClass = () =>
                'ml-16 flex gap text-[13px] border-transparent hover:text-violet-900 font-semibold lowercase [24-em]]';
            }

            return (
              <NavLink key={link.to} to={link.to} className={customClass}>
                {link.label}
              </NavLink>
            );
          })}
        </nav>  
      </div>
    </header>
  );
};

export default NavBar;
