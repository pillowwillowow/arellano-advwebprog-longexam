import { useEffect, useState } from 'react';

import Button from '../../components/Button.jsx';
import { getUsers, updateUserByAdmin } from '../../services/UserService.js';
import { Users, Pencil, Save, UserCheck, UserX } from 'lucide-react';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      role: 'customer'
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const loadUsers = async () => {
    try {
      setError('');

      const result =
        await getUsers();

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
    setEditingUserId(
      user._id
    );

    setFormData({
      firstName:
        user.firstName,
      lastName:
        user.lastName,
      email:
        user.email,
      role:
        user.role
    });

    setError('');
    setMessage('');
  };

  const handleChange = (
    event
  ) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value
    });
  };

  const handleSave = async (
    userId
  ) => {
    try {
      setError('');
      setMessage('');

      await updateUserByAdmin(
        userId,
        formData
      );

      setMessage(
        'User updated successfully.'
      );

      setEditingUserId(
        null
      );

      await loadUsers();
    } catch (error) {
      setError(
        error.message
      );
    }
  };

  const handleToggleStatus =
    async (
      userId,
      newStatus
    ) => {
      try {
        setError('');
        setMessage('');

        await updateUserByAdmin(
          userId,
          {
            isActive:
              newStatus
          }
        );

        setMessage(
          newStatus
            ? 'User set to active.'
            : 'User set to inactive.'
        );

        await loadUsers();
      } catch (error) {
        setError(
          error.message
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-300 px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-6">
          <p className="text-zinc-600">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-300 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-5 sm:p-7">

      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Admin Account
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
            <Users size={22} />
          </div>

          <h1 className="text-3xl font-bold text-zinc-900">
            Manage Users
          </h1>
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          View, edit, and manage user account status.
        </p>
      </div>

        {message && (
          <div className="mb-5 rounded-xl border border-green-300 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-800">
              {message}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-zinc-300">

          {users.map(
            (
              user,
              index
            ) => (
              <div
                key={user._id}
                className={[
                  'p-5',
                  index !==
                  users.length - 1
                    ? 'border-b border-zinc-300'
                    : ''
                ].join(' ')}
              >

                {editingUserId ===
                user._id ? (
                  <div className="space-y-5">

                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                          Editing User
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-zinc-900">
                          {user.firstName}{' '}
                          {user.lastName}
                        </h2>
                      </div>

                      <span
                        className={[
                          'rounded-full border px-3 py-1 text-xs font-semibold uppercase',
                          user.isActive !== false
                            ? 'border-green-300 bg-green-50 text-green-700'
                            : 'border-red-300 bg-red-50 text-red-700'
                        ].join(' ')}
                      >
                        {user.isActive !== false
                          ? 'Active'
                          : 'Inactive'}
                      </span>

                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">

                      <div>
                        <label className="text-sm font-medium text-zinc-700">
                          First Name
                        </label>

                        <input
                          type="text"
                          name="firstName"
                          value={
                            formData.firstName
                          }
                          onChange={
                            handleChange
                          }
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-zinc-700">
                          Last Name
                        </label>

                        <input
                          type="text"
                          name="lastName"
                          value={
                            formData.lastName
                          }
                          onChange={
                            handleChange
                          }
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-zinc-700">
                          Email
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={
                            formData.email
                          }
                          onChange={
                            handleChange
                          }
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-zinc-700">
                          Role
                        </label>

                        <select
                          name="role"
                          value={
                            formData.role
                          }
                          onChange={
                            handleChange
                          }
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        >
                          <option value="customer">
                            Customer
                          </option>

                          <option value="admin">
                            Admin
                          </option>
                        </select>
                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3">

                    <Button
                      type="button"
                      variant="primary"
                      onClick={() =>
                        handleSave(user._id)
                      }
                    >
                      <span className="flex items-center gap-2">
                        <Save size={16} />
                        Save Changes
                      </span>
                    </Button>

                      <Button
                        type="button"
                        onClick={() =>
                          setEditingUserId(
                            null
                          )
                        }
                      >
                        Cancel
                      </Button>

                    </div>

                  </div>
                ) : (
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">
                      {user.firstName}{' '}
                      {user.lastName}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-600">
                      {user.email}
                    </p>

                    <div className="mt-2 grid grid-cols-[100px_110px] items-center gap-2">

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600">
                        Role:
                      </span>

                      <span className="text-sm font-semibold capitalize text-zinc-900">
                        {user.role}
                      </span>
                    </div>

                    <span
                      className={[
                        'inline-flex w-[110px] items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase',
                        user.isActive !== false
                          ? 'border-green-300 bg-green-50 text-green-700'
                          : 'border-red-300 bg-red-50 text-red-700'
                      ].join(' ')}
                    >
                      {user.isActive !== false ? (
                        <UserCheck size={14} />
                      ) : (
                        <UserX size={14} />
                      )}

                      {user.isActive !== false
                        ? 'Active'
                        : 'Inactive'}
                    </span>

                  </div>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    <Button
                      type="button"
                      onClick={() =>
                        handleEdit(user)
                      }
                    >
                      <span className="flex items-center gap-2">
                        <Pencil size={16} />
                        Edit
                      </span>
                    </Button>

                    {user.isActive !== false ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleStatus(
                            user._id,
                            false
                          )
                        }
                        className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        <UserX size={16} />
                        Set Inactive
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleStatus(
                            user._id,
                            true
                          )
                        }
                        className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <UserCheck size={16} />
                        Set Active
                      </button>
                    )}

                  </div>

                </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;