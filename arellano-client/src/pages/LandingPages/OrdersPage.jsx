import { useEffect, useState } from "react";

import {
  ShoppingCart,
  Clock3,
  Package,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Trash2,
  Search,
  Eye,
  X,
} from "lucide-react";

import Button from "../../components/Button.jsx";

import {
  getOrdersByUser,
  createOrder,
  getOrders,
  updateOrder,
} from "../../services/OrderService.js";

import { getCartByUser, removeCartItem } from "../../services/CartService.js";

const OrdersPage = () => {
  const [cart, setCart] = useState(null);

  const [orders, setOrders] = useState([]);

  const [shippingAddress, setShippingAddress] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [orderError, setOrderError] = useState("");

  const [orderMessage, setOrderMessage] = useState("");

  const [cartPage, setCartPage] = useState(1);

  const [orderPage, setOrderPage] = useState(1);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const cartItemsPerPage = 3;
  const ordersPerPage = 5;

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";

  const loadOrders = async () => {
    if (!user) {
      return;
    }

    if (isAdmin) {
      const result = await getOrders();

      setOrders(result);
    } else {
      const result = await getOrdersByUser(user.id);

      setOrders(result);
    }
  };

  const loadCart = async () => {
    if (!user || isAdmin) {
      return;
    }

    try {
      const result = await getCartByUser(user.id);

      setCart(result);
    } catch (error) {
      if (!error.message.toLowerCase().includes("not found")) {
        throw error;
      }

      setCart(null);
    }
  };

  useEffect(() => {
    const loadPage = async () => {
      if (!user) {
        setError("You must be logged in to view your orders.");

        setLoading(false);

        return;
      }

      try {
        await loadCart();

        await loadOrders();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) {
      setOrderError("Your cart is empty.");

      return;
    }

    if (!shippingAddress.trim()) {
      setOrderError("Please enter pickup or delivery details.");

      return;
    }

    try {
      setOrderError("");
      setOrderMessage("");

      await createOrder({
        user: user.id,

        items: cart.items
          .filter((item) => item.product)
          .map((item) => ({
            product: item.product._id,

            quantity: item.quantity,

            price: item.price,
          })),

        totalAmount: cart.totalAmount,

        shippingAddress: shippingAddress.trim(),
      });

      for (const item of cart.items) {
        await removeCartItem(cart._id, item._id);
      }

      setCart(null);

      setShippingAddress("");

      setCartPage(1);

      setOrderPage(1);

      setOrderMessage("Order placed successfully.");

      await loadOrders();
    } catch (error) {
      setOrderError(error.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setOrderError("");
      setOrderMessage("");

      const updatedCart = await removeCartItem(cart._id, itemId);

      setCart(updatedCart);

      const remaining = updatedCart?.items?.length || 0;

      const pages = Math.max(1, Math.ceil(remaining / cartItemsPerPage));

      if (cartPage > pages) {
        setCartPage(pages);
      }

      setOrderMessage("Item removed from cart.");
    } catch (error) {
      setOrderError(error.message);
    }
  };

  const handleOrderStatus = async (orderId, status) => {
    try {
      setOrderError("");
      setOrderMessage("");

      await updateOrder(orderId, {
        status,
      });

      setOrderMessage(`Order updated to ${status}.`);

      setSelectedOrder(null);

      await loadOrders();
    } catch (error) {
      setOrderError(error.message);
    }
  };

  const getStatusClasses = (status) => {
    if (status === "Ongoing") {
      return "border-amber-300 " + "bg-amber-50 " + "text-amber-700";
    }

    if (status === "Confirmed") {
      return "border-blue-300 " + "bg-blue-50 " + "text-blue-700";
    }

    if (status === "Ready for Claiming") {
      return "border-green-300 " + "bg-green-50 " + "text-green-700";
    }

    return "border-zinc-300 " + "bg-zinc-100 " + "text-zinc-700";
  };

  const getStatusIcon = (status) => {
    if (status === "Ongoing") {
      return <Clock3 size={13} />;
    }

    if (status === "Confirmed" || status === "Ready for Claiming") {
      return <CheckCircle2 size={13} />;
    }

    return <Package size={13} />;
  };

  const cartStart = (cartPage - 1) * cartItemsPerPage;

  const paginatedCartItems =
    cart?.items?.slice(cartStart, cartStart + cartItemsPerPage) || [];

  const totalCartPages = Math.ceil(
    (cart?.items?.length || 0) / cartItemsPerPage,
  );

  const normalizedSearch = search.toLowerCase().trim();

  const filteredOrders = orders.filter((order) => {
    const id = order._id?.toLowerCase() || "";

    const customer = `${order.user?.firstName || ""} ${
      order.user?.lastName || ""
    }`.toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      id.includes(normalizedSearch) ||
      customer.includes(normalizedSearch);

    const matchesStatus = !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const orderStart = (orderPage - 1) * ordersPerPage;

  const paginatedOrders = filteredOrders.slice(
    orderStart,
    orderStart + ordersPerPage,
  );

  const totalOrderPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    setOrderPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);

    setOrderPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 p-8">
        <p className="text-sm text-zinc-600">Loading orders...</p>
      </div>
    );
  }

  const renderOrders = () => (
    <section className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {isAdmin ? "Customer Orders" : "Order History"}
          </p>

          <h2 className="mt-1 text-xl font-bold text-zinc-900">
            {isAdmin ? "All Orders" : "My Orders"}
          </h2>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "Order" : "Orders"}
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
            placeholder={
              isAdmin ? "Search order or customer..." : "Search order..."
            }
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
          />
        </div>

        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
        >
          <option value="">All Statuses</option>

          <option value="Ongoing">Ongoing</option>

          <option value="Confirmed">Confirmed</option>

          <option value="Ready for Claiming">Ready for Claiming</option>

        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center">
          <Package size={25} className="mx-auto text-zinc-300" />

          <p className="mt-2 text-sm font-medium text-zinc-600">
            No orders found.
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
          <table
            className={[
              "w-full text-left",
              isAdmin ? "min-w-[780px]" : "min-w-[520px]",
            ].join(" ")}
          >
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Order
                </th>

                {isAdmin && (
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    Customer
                  </th>
                )}

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Total
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Status
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {paginatedOrders.map((order) => (
                <tr key={order._id} className="transition hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-zinc-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-0.5 text-xs text-zinc-400">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </td>

                  {isAdmin && (
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-zinc-700">
                        {order.user?.firstName || "Unknown"}{" "}
                        {order.user?.lastName || ""}
                      </p>
                    </td>
                  )}

                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-zinc-900">
                      ₱{Number(order.totalAmount).toFixed(2)}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                        getStatusClasses(order.status),
                      ].join(" ")}
                    >
                      {getStatusIcon(order.status)}

                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalOrderPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            Showing {orderStart + 1}–
            {Math.min(orderStart + ordersPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={orderPage === 1}
              onClick={() => setOrderPage(orderPage - 1)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-xs font-medium text-zinc-500">
              {orderPage} / {totalOrderPages}
            </span>

            <button
              type="button"
              disabled={orderPage === totalOrderPages}
              onClick={() => setOrderPage(orderPage + 1)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
              <ClipboardList size={20} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                {isAdmin ? "Admin Account" : "Customer Account"}
              </p>

              <h1 className="text-2xl font-bold text-zinc-900">
                {isAdmin ? "Manage Orders" : "Orders"}
              </h1>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {orderMessage && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">{orderMessage}</p>
          </div>
        )}

        {orderError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{orderError}</p>
          </div>
        )}

        {!error && !isAdmin && (
          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <section className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <ShoppingCart size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                      Shopping Cart
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900">
                      Current Cart
                    </h2>
                  </div>
                </div>

                <Button to="/products">Continue Shopping</Button>
              </div>

              {!cart || cart.items.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center">
                  <ShoppingCart size={25} className="mx-auto text-zinc-300" />

                  <p className="mt-2 text-sm font-medium text-zinc-600">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
                    {paginatedCartItems.map((item, index) => (
                      <div
                        key={item._id}
                        className={[
                          "flex items-center gap-3 p-3",
                          index !== paginatedCartItems.length - 1
                            ? "border-b border-zinc-100"
                            : "",
                        ].join(" ")}
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
                          {item.product?.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.productName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-zinc-900">
                            {item.product?.productName || "Product unavailable"}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            Qty {item.quantity} · ₱{item.price} each
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-zinc-900">
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item._id)}
                            className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-red-500 transition hover:text-red-700"
                          >
                            <Trash2 size={12} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalCartPages > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={cartPage === 1}
                        onClick={() => setCartPage(cartPage - 1)}
                        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <span className="text-xs text-zinc-400">
                        {cartPage} / {totalCartPages}
                      </span>

                      <button
                        type="button"
                        disabled={cartPage === totalCartPages}
                        onClick={() => setCartPage(cartPage + 1)}
                        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  <div className="mt-5 border-t border-zinc-100 pt-4">
                    <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                      <MapPin size={15} className="text-blue-800" />
                      Pickup / Delivery Details
                    </label>

                    <textarea
                      value={shippingAddress}
                      onChange={(event) => {
                        setShippingAddress(event.target.value);

                        setOrderError("");
                      }}
                      rows="2"
                      placeholder="Enter pickup or delivery details..."
                      className="mt-2 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                        Total
                      </p>

                      <p className="text-xl font-bold text-zinc-900">
                        ₱{Number(cart.totalAmount).toFixed(2)}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="primary"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </section>

            {renderOrders()}
          </div>
        )}

        {!error && isAdmin && renderOrders()}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Order Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-zinc-900">
                  #{selectedOrder._id.slice(-6).toUpperCase()}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
              <span className="text-sm text-zinc-500">Status</span>

              <span
                className={[
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                  getStatusClasses(selectedOrder.status),
                ].join(" ")}
              >
                {getStatusIcon(selectedOrder.status)}

                {selectedOrder.status}
              </span>
            </div>

            {isAdmin && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Customer
                </p>

                <p className="mt-1 text-sm font-semibold text-zinc-900">
                  {selectedOrder.user?.firstName || "Unknown"}{" "}
                  {selectedOrder.user?.lastName || ""}
                </p>
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Products
              </p>

              <div className="mt-2 overflow-hidden rounded-xl border border-zinc-200">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={item._id}
                    className={[
                      "flex items-center justify-between gap-4 px-4 py-3",
                      index !== selectedOrder.items.length - 1
                        ? "border-b border-zinc-100"
                        : "",
                    ].join(" ")}
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {item.product?.productName || "Product unavailable"}
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Qty {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-zinc-900">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                <MapPin size={13} />
                Pickup / Delivery
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-700">
                {selectedOrder.shippingAddress}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-5">
              <span className="text-sm font-medium text-zinc-500">
                Total Amount
              </span>

              <span className="text-xl font-bold text-zinc-900">
                ₱{Number(selectedOrder.totalAmount).toFixed(2)}
              </span>
            </div>

            {isAdmin && (
              <div className="mt-6 flex justify-end">
                {selectedOrder.status === "Ongoing" && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() =>
                      handleOrderStatus(selectedOrder._id, "Confirmed")
                    }
                  >
                    Confirm Order
                  </Button>
                )}

                {selectedOrder.status === "Confirmed" && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() =>
                      handleOrderStatus(selectedOrder._id, "Ready for Claiming")
                    }
                  >
                    Ready for Claiming
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
