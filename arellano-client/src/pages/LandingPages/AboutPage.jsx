import Button from "../../components/Button";

import {
  House,
  ShoppingBag,
  Package,
  Tags,
  Clock3,
  Music2,
  CheckCircle2,
  Store,
} from "lucide-react";

import stickerv1 from "../../assets/img/bibadubi.jpg";
import stickerv2 from "../../assets/img/clairo.jpg";
import stickerv3 from "../../assets/img/hayley.jpg";
import baller from "../../assets/img/faye.jpg";
import about from "../../assets/img/about.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-800">
                <Store size={17} />

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  About BulldogEx Shop
                </p>
              </div>

              <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                Music gear made easier for the campus community.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
                BulldogEx Shop provides students with a simple way to browse
                music-related products, place orders, and keep track of their
                purchases in one convenient platform.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                The store focuses on a straightforward shopping experience so
                users can quickly find products, check available items, and
                manage their orders without unnecessary steps.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button to="/" variant="primary">
                  <span className="flex items-center gap-2">
                    <House size={15} />
                    Back Home
                  </span>
                </Button>

                <Button to="/products">
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={15} />
                    Browse Products
                  </span>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-blue-800 bg-blue-800 p-2">
              <img
                src={about}
                alt="BulldogEx Shop"
                className="aspect-[16/10] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Store Overview
              </p>

              <h2 className="mt-1 text-xl font-bold text-zinc-900">
                BulldogEx Shop at a glance
              </h2>
            </div>

            <p className="max-w-lg text-sm text-zinc-500">
              A quick overview of the store, available products, and order
              activity.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200 bg-yellow-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <ShoppingBag size={18} />
                </div>

                <span className="text-2xl font-bold text-zinc-900">10</span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                Products
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-blue-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Tags size={18} />
                </div>

                <span className="text-2xl font-bold text-white">03</span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white">
                Categories
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-yellow-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Clock3 size={18} />
                </div>

                <span className="text-2xl font-bold text-zinc-900">03</span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                Pickup Slots
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-blue-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Package size={18} />
                </div>

                <span className="text-2xl font-bold text-white">24</span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white">
                Orders
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <Music2 size={18} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Shopping Experience
                </p>

                <h2 className="text-xl font-bold text-zinc-900">
                  Simple from browsing to claiming.
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <article className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-900">
                  <ShoppingBag size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    Browse Products
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    Customers can search products, filter by category, and view
                    product details and reviews.
                  </p>
                </div>
              </article>

              <article className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-900">
                  <Package size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    Place an Order
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    Products can be added to the cart and submitted as an order
                    for processing.
                  </p>
                </div>
              </article>

              <article className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-900">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    Track Order Status
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    Customers can check whether their order is ongoing,
                    confirmed, or ready for claiming.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-blue-800 p-5 shadow-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Bulldog Collection
              </p>

              <h2 className="mt-1 text-xl font-bold text-yellow-300">
                Bulldog Music Collection
              </h2>

              <p className="mt-2 text-sm leading-6 text-white">
                A selection of music artists and designs featured throughout the
                shop.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5">
                <img
                  src={stickerv1}
                  alt="Bulldog Music Collection"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5">
                <img
                  src={stickerv2}
                  alt="Bulldog Music Collection"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5">
                <img
                  src={stickerv3}
                  alt="Bulldog Music Collection"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              <div className="aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5">
                <img
                  src={baller}
                  alt="Bulldog Music Collection"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="mt-5">
              <Button to="/products">
                <span className="flex items-center gap-2">
                  <ShoppingBag size={15} />
                  View Products
                </span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
