import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">

        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Brand */}
          <div>
            <p className="text-lg font-semibold text-zinc-900">
              BulldogEx Shop
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Campus essentials, simple ordering.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">

            <Link to="/products" className="hover:text-zinc-900 transition">
              Products
            </Link>

            <span className="text-zinc-300">•</span>

            <Link to="/cart" className="hover:text-zinc-900 transition">
              Cart
            </Link>

            <span className="text-zinc-300">•</span>

            <Link to="/pickup" className="hover:text-zinc-900 transition">
              Pickup
            </Link>

            <span className="text-zinc-300">•</span>

            {/* NEW: Auth links */}
            <Link to="/auth/signin" className="hover:text-violet-600 transition">
              Sign In
            </Link>

            <span className="text-zinc-300">•</span>

            <Link to="/auth/signup" className="hover:text-violet-600 transition font-medium text-violet-600">
              Sign Up
            </Link>

          </div>

        </div>

        {/* Divider */}
        <hr className="border-zinc-300" />

        {/* Bottom */}
        <div className="text-center text-xs text-zinc-500 space-y-1">
          <p>
            © {new Date().getFullYear()} BulldogEx Shop. All Rights Reserved.
          </p>
          <p className="text-violet-600 font-medium">
            Built for campus life ✦
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;