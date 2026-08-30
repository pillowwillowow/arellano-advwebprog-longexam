import { Outlet } from 'react-router-dom';
import authImage from '../assets/img/auth.png';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-1 border-zinc-300 bg-blue-900 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16">
          <div className="max-w-md overflow-hidden rounded-4xl bg-blue-900 p-3 sm:p-2 ">
            <img
              src={authImage}
              alt="bulldog"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>

        <main className="flex items-center bg-yellow-200 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
