import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-violet-200">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">

        {/* Enhancement 2: Create a customized footer and notfoundpage that aligns with the website theme and ensure that all links function correctly. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-lg font-semibold text-zinc-900 font-unbounded">
              BulldogEx Shop
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Campus essentials, simple ordering.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">

            <Link to="/products" className="hover:text-zinc-900 transition">
              Products
            </Link>

            <span className="text-zinc-900">•</span>

            <Link to="/cart" className="hover:text-zinc-900 transition">
              Cart
            </Link>

            <span className="text-zinc-900">•</span>

            <Link to="/pickup" className="hover:text-zinc-900 transition">
              Pickup
            </Link>

          </div>
        </div>
        <hr className="border-violet-900" />
        <div className="text-center text-xs text-zinc-600 space-y-2">
          <p>
            © 2026 BulldogEx Shop. All Rights Reserved.
          </p>
          <p className="text-violet-900 font-medium">
            Built for campus life ✦
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;