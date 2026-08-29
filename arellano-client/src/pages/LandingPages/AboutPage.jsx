import Button from '../../components/Button';
import stickerv1 from '../../assets/img/nu_classic_v1_sticker.png';
import stickerv2 from '../../assets/img/nu_classic_v2_sticker.png';
import stickerv3 from '../../assets/img/nu_volleyball_sticker.png';
import baller from '../../assets/img/nu_lets-go_baller.png';
import about from '../../assets/img/about.png';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-violet-300">

      <section className="bg-violet-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <img
            src={about}
            alt="about"
            className="aspect-[16/9] w-full rounded-3xl border-1 border-zinc-900 bg-white object-cover"
          />

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-900">
              About Store
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A campus shop focused on useful products and simple ordering.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-900 sm:text-base">
              BulldogEx Shop keeps the low-fidelity layout system while
              presenting clear product categories, quick actions, and
              straightforward store information.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                to="/"
                variant="primary"
              >
                Back Home
              </Button>

              <Button to="/products">
                Open Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-1 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Store Overview
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick store blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-zinc-900 bg-blue-900 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-white">10</p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Items
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-yellow-300 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">03</p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
              Categories
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-blue-900 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-white">03</p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Pickup Slots
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-yellow-300 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">24</p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
              Orders
            </p>
          </div>

        </div>
      </section>

      <section className="border-t-1 border-zinc-900 bg-violet-100 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Store Flow
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 font-unbounded">
              Stacked shopping wireframe
            </h2>

            <div className="mt-6 space-y-4">

              <article className="rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Curated Catalog
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Products are grouped by daily use so students
                  can browse faster and find items easily.
                </p>
              </article>

              <article className="rounded-3xl border-1 border-zinc-900 bg-blue-900 p-5">
                <h3 className="text-lg font-semibold text-white">
                  Simple Checkout
                </h3>

                <p className="mt-3 text-sm leading-6 text-white">
                  Store details stay direct so students can track
                  orders and pickup without confusion.
                </p>
              </article>

              <article className="rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Pickup Ready
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Store information stays direct for students who
                  need quick order updates.
                </p>
              </article>

            </div>
          </div>

          <div className="rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Category Grid
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="border-zinc-900 flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] border border-zinc-300 bg-white">
                <img
                  src={stickerv1}
                  alt="stickerv1"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>

              <div className="border-zinc-900 flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] border border-zinc-300 bg-white">
                <img
                  src={stickerv2}
                  alt="stickerv2"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>

              <div className="border-zinc-900 flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] border border-zinc-300 bg-white">
                <img
                  src={stickerv3}
                  alt="stickerv3"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>

              <div className="border-zinc-900 flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] border border-zinc-300 bg-white">
                <img
                  src={baller}
                  alt="baller"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>

            </div>

            <Button
              to="/products"
              className="mt-5"
            >
              View Products
            </Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;