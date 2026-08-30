import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../components/Button';
import { registerUser } from '../../services/UserService.js';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

  const [fieldErrors, setFieldErrors] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const handleChange = (event) => {
    const {
      name,
      value
    } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setFieldErrors({
      ...fieldErrors,
      [name]: ''
    });

    setError('');
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    if (!formData.firstName.trim()) {
      errors.firstName =
        'First name is required.';
    }

    if (!formData.lastName.trim()) {
      errors.lastName =
        'Last name is required.';
    }

    if (!formData.email.trim()) {
      errors.email =
        'Email address is required.';
    }

    if (!formData.password.trim()) {
      errors.password =
        'Password is required.';
    } else if (
      formData.password.length < 8
    ) {
      errors.password =
        'Password must contain at least 8 characters.';
    }

    if (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.password
    ) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser(
        formData
      );

      navigate(
        '/auth/signin'
      );
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Sign Up
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-800">
        Create a store account for
        faster checkout, order updates,
        and pickup details.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-zinc-700"
            >
              First Name
            </label>

            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={
                formData.firstName
              }
              onChange={
                handleChange
              }
              className={[
                inputClasses,
                fieldErrors.firstName
                  ? 'border-red-500 bg-red-50'
                  : ''
              ].join(' ')}
            />

            {fieldErrors.firstName && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {
                  fieldErrors
                    .firstName
                }
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-zinc-700"
            >
              Last Name
            </label>

            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={
                formData.lastName
              }
              onChange={
                handleChange
              }
              className={[
                inputClasses,
                fieldErrors.lastName
                  ? 'border-red-500 bg-red-50'
                  : ''
              ].join(' ')}
            />

            {fieldErrors.lastName && (
              <p className="mt-2 text-sm font-medium text-red-600">
                {
                  fieldErrors
                    .lastName
                }
              </p>
            )}
          </div>

        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-zinc-700"
          >
            Email
          </label>

          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="user@example.com"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className={[
              inputClasses,
              fieldErrors.email
                ? 'border-red-500 bg-red-50'
                : ''
            ].join(' ')}
          />

          {fieldErrors.email && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {
                fieldErrors.email
              }
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <div className="relative mt-2">
            <input
              id="signup-password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              name="password"
              placeholder="Enter password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className={[
                'w-full rounded-xl border bg-zinc-100 px-4 py-3 pr-12 text-sm text-zinc-900 outline-none transition',
                'focus:border-zinc-900 focus:bg-zinc-50',
                fieldErrors.password
                  ? 'border-red-500 bg-red-50'
                  : 'border-zinc-300'
              ].join(' ')}
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

          {fieldErrors.password && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {
                fieldErrors.password
              }
            </p>
          )}

          <p className="mt-2 text-xs leading-5 text-zinc-700">
            Password must contain at
            least 8 characters.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className={
            actionButtonClassName
          }
        >
          {loading
            ? 'Creating Account...'
            : 'Create Account'}
        </Button>
      </form>

      <div className="mt-8 border-t border-blue-800 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}

        <Link
          to="/auth/signin"
          className="font-semibold text-zinc-900 transition hover:text-zinc-600"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;