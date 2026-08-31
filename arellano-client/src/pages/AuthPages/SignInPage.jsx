import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Dog, PawPrint} from "lucide-react";

import Button from "../../components/Button";
import { loginUser } from "../../services/UserService.js";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFieldErrors({
      ...fieldErrors,
      [name]: "",
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }

    if (errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await loginUser(formData);

      localStorage.setItem("token", result.token);

      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
  Welcome Bark!
  <PawPrint size={30} />
</h1>

      <p className="mt-3 text-sm leading-6 text-zinc-800">
        Access your store account to review orders, saved items, and pickup
        details.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-zinc-700"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            name="email"
            type="email"
            placeholder="user@email.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={[
              inputClasses,
              fieldErrors.email ? "border-red-500 bg-red-50" : "",
            ].join(" ")}
          />

          {fieldErrors.email && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <div className="relative mt-2">
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={[
                "w-full rounded-xl border bg-zinc-100 px-4 py-3 pr-12 text-sm text-zinc-900 outline-none transition",
                "focus:border-zinc-900 focus:bg-zinc-50",
                fieldErrors.password
                  ? "border-red-500 bg-red-50"
                  : "border-zinc-300",
              ].join(" ")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-900"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {fieldErrors.password && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {fieldErrors.password}
            </p>
          )}

          <p className="mt-2 text-xs leading-5 text-zinc-800">
            Enter the password you used when creating your account.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>

      <div className="mt-7 border-t-1 border-blue-800 pt-8 text-sm text-zinc-600">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-zinc-900 transition hover:text-zinc-600"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
