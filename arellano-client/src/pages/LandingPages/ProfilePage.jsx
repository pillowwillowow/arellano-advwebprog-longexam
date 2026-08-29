import {  useEffect, useState } from 'react';

import { Eye, EyeOff, UserRound, ShieldCheck } from 'lucide-react';
import Button from '../../components/Button.jsx';
import { getUserById, updateUser } from '../../services/UserService.js';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900';

const ProfilePage = () => {
  const storedUser =
    localStorage.getItem('user');

  const loggedUser = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!loggedUser) {
        setError(
          'You must be logged in to view your profile.'
        );

        setLoading(false);
        return;
      }

      try {
        const user =
          await getUserById(
            loggedUser.id
          );

        setFormData({
          firstName:
            user.firstName,
          lastName:
            user.lastName,
          email:
            user.email,
          password: ''
        });
      } catch (error) {
        setError(
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (
    event
  ) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value
    });

    setError('');
    setMessage('');
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setError(
        'Please fill in all required fields.'
      );

      return;
    }

    if (
      formData.password &&
      formData.password.length < 8
    ) {
      setError(
        'Password must contain at least 8 characters.'
      );

      return;
    }

    try {
      setError('');
      setMessage('');

      const updateData = {
        firstName:
          formData.firstName,
        lastName:
          formData.lastName,
        email:
          formData.email
      };

      if (
        formData.password.trim()
      ) {
        updateData.password =
          formData.password;
      }

      const updatedUser =
        await updateUser(
          loggedUser.id,
          updateData
        );

      const savedUser = {
        ...loggedUser,
        firstName:
          updatedUser.firstName,
        lastName:
          updatedUser.lastName,
        email:
          updatedUser.email
      };

      localStorage.setItem(
        'user',
        JSON.stringify(savedUser)
      );

      setFormData({
        firstName:
          updatedUser.firstName,
        lastName:
          updatedUser.lastName,
        email:
          updatedUser.email,
        password: ''
      });

      setMessage(
        formData.password
          ? 'Profile and password updated successfully.'
          : 'Profile updated successfully.'
      );
    } catch (error) {
      setError(
        error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-300 px-4 py-8">
        <div className="mx-auto max-w-5xl rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-6">
          <p className="text-zinc-600">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-violet-300 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">

      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
          Customer Account
        </p>

        <h1 className="mt-2 text-3xl font-bold text-zinc-900">
          Profile
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-900">
          Manage your personal information and account security.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-zinc-900 bg-zinc-50 p-5 sm:p-7">
           <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
              <UserRound size={20} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800">
                Account Information
              </p>

              <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                Personal Information
              </h2>
            </div>
          </div>

            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Update your basic account details.
            </p>

            <div className="mt-6 space-y-5">

              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-zinc-700"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-zinc-700"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div className="rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
                  Account Role
                </p>

                <p className="mt-1 text-sm font-semibold capitalize text-zinc-900">
                  {loggedUser?.role}
                </p>
              </div>

            </div>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-zinc-50 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800">
                  Security
                </p>

                <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                  Change Password
                </h2>
              </div>
            </div>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Enter a new password only if you want to change your current one.
            </p>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700"
              >
                New Password
              </label>

              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a new password"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-12 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-900"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Password must contain at least 8 characters.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-4">
              <p className="text-sm font-medium text-zinc-800">
                Password Update
              </p>

              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Leave the password field blank if you only want to edit your personal information.
              </p>
            </div>
          </div>

        </div>

        {message && (
          <div className="rounded-2xl border border-green-300 bg-green-50 px-5 py-4">
            <p className="text-sm font-medium text-green-800">
              {message}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      </form>

    </div>
  </div>
);
};

export default ProfilePage;