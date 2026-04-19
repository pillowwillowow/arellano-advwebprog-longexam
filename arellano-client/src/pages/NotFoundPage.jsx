import Button from '../components/Button';
import notfoundBg from '../assets/img/bulldog.jpg'; 
const NotFoundPage = () => {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${notfoundBg})` }}
    >
      <div className="absolute inset-0 bg-black/40 overlay blur-md scale-100" />

      {/* Enhancement 2: Create a customized footer and notfoundpage that aligns with the website theme and ensure that all links function correctly. */}
      <div className="relative z-10 text-center text-white max-w-xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-100">
          Page not found
        </p>

        <h1 className="text-6xl font-bold sm:text-7xl font-unbounded">
          404
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-100">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Back Home
          </Button>
          <Button to="/products" variant="secondary">
            View Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;