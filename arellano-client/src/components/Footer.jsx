import {
  ShoppingBag,
  Package,
  Info
} from 'lucide-react';

import {
  Link
} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-y-1 border-zinc-900 bg-blue-900">
      <div className="mx-auto max-w-5xl px-4 py-4">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-unbounded text-lg font-semibold text-white">
              BulldogEx Shop
            </p>

            <p className="mt-1 text-sm text-white">
              Campus essentials, simple ordering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white">

            <Link
              to="/products"
              className="flex items-center gap-2 transition hover:text-yellow-400"
            >
              <ShoppingBag size={15} />
              Products
            </Link>

            <span className="text-white">
              •
            </span>

            <Link
              to="/orders"
              className="flex items-center gap-2 transition hover:text-yellow-400"
            >
              <Package size={15} />
              Orders
            </Link>

            <span className="text-white">
              •
            </span>

            <Link
              to="/about"
              className="flex items-center gap-2 transition hover:text-yellow-400"
            >
              <Info size={15} />
              About
            </Link>

          </div>

        </div>

        <hr className="my-4 border-white" />

        <div className="flex flex-col gap-1 text-center text-xs text-white sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p>
            © 2026 Bulldog Exchange Shop.
            All Rights Reserved.
          </p>

          <p className="font-semibold text-white">
            Built for campus life ✦
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;