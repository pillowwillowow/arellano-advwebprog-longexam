import { useEffect, useState } from "react";

import { Eye, EyeOff, UserRound, ShieldCheck, Save } from "lucide-react";

import Button from "../../components/Button.jsx";

import { getUserById, updateUser } from "../../services/UserService.js";

const inputClasses =
  "mt-2 w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white";

const ProfilePage = () => {
  const storedUser = localStorage.getItem("user");

  const loggedUser = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!loggedUser) {
        setError("You must be logged in to view your profile.");

        setLoading(false);

        return;
      }

      try {
        const user = await getUserById(loggedUser.id);

        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let newError = "";

    if (name === "firstName" && !value.trim()) {
      newError = "First name is required.";
    }

    if (name === "lastName" && !value.trim()) {
      newError = "Last name is required.";
    }

    if (name === "email") {
      if (!value.trim()) {
        newError = "Email address is required.";
      } else if (!value.includes("@")) {
        newError = "Please enter a valid email address.";
      }
    }

    if (name === "password" && value && value.length < 8) {
      newError = "Password must contain at least 8 characters.";
    }

    setFieldErrors({
      ...fieldErrors,
      [name]: newError,
    });

    setError("");
    setMessage("");
  };

  const validateForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.password && formData.password.length < 8) {
      errors.password = "Password must contain at least 8 characters.";
    }

    setFieldErrors(errors);

    return !Object.values(errors).some((value) => value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setError("Please correct the highlighted fields before saving.");

      return;
    }

    try {
      setError("");
      setMessage("");

      const updateData = {
        firstName: formData.firstName.trim(),

        lastName: formData.lastName.trim(),

        email: formData.email.trim(),
      };

      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      const updatedUser = await updateUser(loggedUser.id, updateData);

      const savedUser = {
        ...loggedUser,

        firstName: updatedUser.firstName,

        lastName: updatedUser.lastName,

        email: updatedUser.email,
      };

      localStorage.setItem("user", JSON.stringify(savedUser));

      setFormData({
        firstName: updatedUser.firstName,

        lastName: updatedUser.lastName,

        email: updatedUser.email,

        password: "",
      });

      setFieldErrors({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setMessage(
        formData.password
          ? "Profile and password updated successfully."
          : "Profile updated successfully.",
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const isFormIncomplete =
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 p-8">
        <p className="text-sm text-zinc-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
              <UserRound size={20} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                Customer Account
              </p>

              <h1 className="text-2xl font-bold text-zinc-900">Profile</h1>
            </div>
          </div>

          <p className="mt-3 max-w-xl text-sm text-zinc-500">
            Manage your personal information and account security.
          </p>
        </header>

        {message && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <UserRound size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Account Information
                  </p>

                  <h2 className="text-lg font-bold text-zinc-900">
                    Personal Information
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-zinc-700"
                  >
                    First Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={[
                      inputClasses,
                      fieldErrors.firstName
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-200 focus:border-blue-700",
                    ].join(" ")}
                  />

                  {fieldErrors.firstName && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-zinc-700"
                  >
                    Last Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={[
                      inputClasses,
                      fieldErrors.lastName
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-200 focus:border-blue-700",
                    ].join(" ")}
                  />

                  {fieldErrors.lastName && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-700"
                  >
                    Email Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={[
                      inputClasses,
                      fieldErrors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-200 focus:border-blue-700",
                    ].join(" ")}
                  />

                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                    Account Role
                  </p>

                  <p className="mt-1 text-sm font-semibold capitalize text-zinc-800">
                    {loggedUser?.role}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Security
                  </p>

                  <h2 className="text-lg font-bold text-zinc-900">
                    Change Password
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Leave this field blank if you do not want to change your
                password.
              </p>

              <div className="mt-5">
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
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className={[
                      "w-full rounded-lg border bg-zinc-50 px-3 py-2.5 pr-11 text-sm outline-none transition focus:bg-white",
                      fieldErrors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-200 focus:border-blue-700",
                    ].join(" ")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {fieldErrors.password ? (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {fieldErrors.password}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-zinc-400">
                    Minimum of 8 characters.
                  </p>
                )}
              </div>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-sm font-semibold text-blue-900">
                  Password update is optional
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Your profile can be updated without changing your password.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs text-zinc-400">
              <span className="text-red-500">*</span> Required fields must be
              completed.
            </p>

            <Button type="submit" variant="primary" disabled={isFormIncomplete}>
              <span className="flex items-center gap-2">
                <Save size={15} />
                Save Changes
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
