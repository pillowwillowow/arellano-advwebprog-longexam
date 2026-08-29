import Button from '../../components/Button';

import banner from '../../assets/img/nu_bulldogex_banner.jpg';
import audio from '../../assets/img/audio.jpg';
import keyboards from '../../assets/img/keyboards.jpg';
import guitar from '../../assets/img/guitar.jpg';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col bg-violet-200">

      <section className="relative min-h-[28rem] bg-zinc-900 px-4 py-10 sm:px-6 lg:px-8">
        <img
          src={banner}
          alt="BulldogEx banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-zinc-900/45" />

        <div className="relative z-10 flex min-h-[22rem] items-start justify-end text-right sm:min-h-[24rem]">
          <div className="max-w-xl">

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-200 font-roboto">
              Campus Marketplace
            </p>

            <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">
              Welcome to BulldogEx Shop
            </h1>

            <p className="mt-4 text-sm leading-7 text-zinc-100 sm:text-base">
              Explore our selection of musical instruments
              and audio equipment for practice, performance,
              recording, and everyday use.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Button to="/products">
                Shop Now
              </Button>

              <Button
                to="/about"
                variant="primary"
              >
                About Store
              </Button>
            </div>

          </div>
        </div>
      </section>

      <section className="border-b-1 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Store Overview
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick Shopping Overview
          </h2>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-900 bg-blue-900 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-white">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Products
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
            <p className="text-2xl font-bold text-white">24</p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Orders
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-yellow-300 p-5
            shadow-[0_0_10px_rgba(107,135,84,0.4),0_0_30px_rgba(107,135,84,0.3)]
            hover:shadow-[0_0_20px_rgba(107,135,84,0.7),0_0_50px_rgba(107,135,84,0.5)]
            transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]">
            <p className="text-2xl font-bold text-zinc-900">24</p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
              Pickup Slots
            </p>
          </div>

        </div>
      </section>

      <section className=" border-zinc-900 bg-violet-100 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Shop Categories
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Music Gear & Essentials
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Browse products based on the equipment
            you are looking for.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <article className="overflow-hidden rounded-3xl border-1 border-zinc-900 bg-zinc-50">

            <div className="aspect-4/3 overflow-hidden border-b-1 border-zinc-900 bg-white">
              <img
                src={guitar}
                alt="Guitars"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-800">
                Guitars
              </p>

              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                Guitars
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Explore guitars for practice,
                performance, and everyday playing.
              </p>

              <Button
                to="/products?category=Guitars"
                className="mt-5"
                variant="primary"
              >
                View Guitars
              </Button>

            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border-1 border-zinc-900 bg-zinc-50">

            <div className="aspect-4/3 overflow-hidden border-b-1 border-zinc-900 bg-white">
              <img
                src={keyboards}
                alt="Keyboards"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-800">
                Keyboards
              </p>

              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                Keyboards
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Discover keyboards for learning,
                recording, and live performances.
              </p>

              <Button
                to="/products?category=Keyboards"
                className="mt-5"
                variant="primary"
              >
                View Keyboards
              </Button>

            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border-1 border-zinc-900 bg-zinc-50">

            <div className="aspect-4/3 overflow-hidden border-b-1 border-zinc-900 bg-white">
              <img
                src={audio}
                alt="Audio Equipment"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-800">
                Audio Equipment
              </p>

              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                Audio Equipment
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Shop audio equipment for listening,
                recording, and performance setups.
              </p>

              <Button
                to="/products?category=Audio%20Equipment"
                className="mt-5"
                variant="primary"
              >
                View Audio Equipment
              </Button>

            </div>
          </article>

        </div>
      </section>

    </div>
  );
};

export default HomePage;