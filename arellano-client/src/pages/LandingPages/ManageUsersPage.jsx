import { useEffect, useState } from "react";

import Button from "../../components/Button.jsx";

import { getUsers, updateUserByAdmin } from "../../services/UserService.js";

import { Users, Pencil, Save, UserCheck, UserX, X, Search } from "lucide-react";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "customer",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [formError, setFormError] = useState("");

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const loadUsers = async () => {
    try {
      setError("");

      const result = await getUsers();

      setUsers(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUserId(user._id);

    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    });

    setFormError("");
    setError("");
    setMessage("");
  };

  const closeEditModal = () => {
    setEditingUserId(null);

    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    });

    setFormError("");
  };

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
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        newError = "Please enter a valid email address.";
      }
    }

    if (name === "role" && !value) {
      newError = "Role is required.";
    }

    setFieldErrors({
      ...fieldErrors,
      [name]: newError,
    });

    setFormError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    };

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.role) {
      errors.role = "Role is required.";
    }

    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    try {
      setError("");
      setMessage("");
      setFormError("");

      await updateUserByAdmin(editingUserId, {
        firstName: formData.firstName.trim(),

        lastName: formData.lastName.trim(),

        email: formData.email.trim(),

        role: formData.role,
      });

      setMessage("User updated successfully.");

      setEditingUserId(null);

      await loadUsers();
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleToggleStatus = async (userId, newStatus) => {
    try {
      setError("");
      setMessage("");

      await updateUserByAdmin(userId, {
        isActive: newStatus,
      });

      setMessage(newStatus ? "User set to active." : "User set to inactive.");

      await loadUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const editingUser = users.find((user) => user._id === editingUserId);

  const normalizedSearch = search.toLowerCase().trim();

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${
      user.lastName || ""
    }`.toLowerCase();

    const email = user.email?.toLowerCase() || "";

    const matchesSearch =
      !normalizedSearch ||
      fullName.includes(normalizedSearch) ||
      email.includes(normalizedSearch);

    const matchesRole = !roleFilter || user.role === roleFilter;

    const isActive = user.isActive !== false;

    const matchesStatus =
      !statusFilter || (statusFilter === "active" ? isActive : !isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const pageStart = (currentPage - 1) * usersPerPage;

  const pageEnd = pageStart + usersPerPage;

  const paginatedUsers = filteredUsers.slice(pageStart, pageEnd);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    setCurrentPage(1);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);

    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);

    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
              <Users size={20} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                Admin Account
              </p>

              <h1 className="text-2xl font-bold text-zinc-900">Manage Users</h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-zinc-500">
            View, edit, and manage user account access.
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

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                User Accounts
              </p>

              <h2 className="text-xl font-bold text-zinc-900">All Users</h2>
            </div>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "User" : "Users"}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name or email..."
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
              />
            </div>

            <select
              value={roleFilter}
              onChange={handleRoleFilter}
              className="min-w-[145px] rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
            >
              <option value="">All Roles</option>

              <option value="customer">Customer</option>

              <option value="admin">Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="min-w-[145px] rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
            >
              <option value="">All Statuses</option>

              <option value="active">Active</option>

              <option value="inactive">Inactive</option>
            </select>
          </div>

          {loading ? (
            <div className="mt-4 rounded-xl border border-dashed border-zinc-300 p-8 text-center">
              <p className="text-sm text-zinc-500">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-zinc-300 p-8 text-center">
              <Users size={25} className="mx-auto text-zinc-300" />

              <p className="mt-2 text-sm font-medium text-zinc-600">
                No users found.
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Try changing the search or filters.
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      User
                    </th>

                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Email
                    </th>

                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Role
                    </th>

                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Status
                    </th>

                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {paginatedUsers.map((user) => (
                    <tr key={user._id} className="transition hover:bg-zinc-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold uppercase text-blue-900">
                            {user.firstName?.charAt(0) || "U"}

                            {user.lastName?.charAt(0) || ""}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-zinc-900">
                              {user.firstName} {user.lastName}
                            </p>

                            <p className="mt-0.5 text-xs capitalize text-zinc-400">
                              {user.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm text-zinc-600">{user.email}</p>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold capitalize text-zinc-600">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                            user.isActive !== false
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-red-200 bg-red-50 text-red-700",
                          ].join(" ")}
                        >
                          {user.isActive !== false ? (
                            <UserCheck size={12} />
                          ) : (
                            <UserX size={12} />
                          )}

                          {user.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(user)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>

                          {user.isActive !== false ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleStatus(user._id, false)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >
                              <UserX size={13} />
                              Deactivate
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user._id, true)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                            >
                              <UserCheck size={13} />
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-zinc-400">
                Showing {pageStart + 1}–
                {Math.min(pageEnd, filteredUsers.length)} of{" "}
                {filteredUsers.length}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-xs text-zinc-400">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {editingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Pencil size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Admin Action
                  </p>

                  <h2 className="text-xl font-bold text-zinc-900">Edit User</h2>
                </div>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X size={18} />
              </button>
            </div>

            {editingUser && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {editingUser.firstName} {editingUser.lastName}
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-400">
                    {editingUser.email}
                  </p>
                </div>

                <span
                  className={[
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                    editingUser.isActive !== false
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700",
                  ].join(" ")}
                >
                  {editingUser.isActive !== false ? (
                    <UserCheck size={12} />
                  ) : (
                    <UserX size={12} />
                  )}

                  {editingUser.isActive !== false ? "Active" : "Inactive"}
                </span>
              </div>
            )}

            <form onSubmit={handleSave} className="mt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-zinc-700">
                    First Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={[
                      "mt-2 w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white",
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
                  <label className="text-sm font-medium text-zinc-700">
                    Last Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={[
                      "mt-2 w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white",
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
                  <label className="text-sm font-medium text-zinc-700">
                    Email Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={[
                      "mt-2 w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white",
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

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-zinc-700">
                    Role
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={[
                      "mt-2 w-full rounded-lg border bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white",
                      fieldErrors.role
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-200 focus:border-blue-700",
                    ].join(" ")}
                  >
                    <option value="customer">Customer</option>

                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {formError}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" onClick={closeEditModal}>
                  Cancel
                </Button>

                <Button type="submit" variant="primary">
                  <span className="flex items-center gap-2">
                    <Save size={14} />
                    Save Changes
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersPage;
