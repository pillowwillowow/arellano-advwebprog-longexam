import { useEffect, useState } from 'react';

import { ShoppingCart, House, Clock3, Package, MapPin, ClipboardList, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button.jsx';

import { getOrdersByUser, createOrder, getOrders, updateOrder } from '../../services/OrderService.js';
import { getCartByUser, removeCartItem} from '../../services/CartService.js';

const OrdersPage = () => {
  const [cart, setCart] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [
    shippingAddress,
    setShippingAddress
  ] = useState('');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [
    orderError,
    setOrderError
  ] = useState('');

  const [
    orderMessage,
    setOrderMessage
  ] = useState('');

  const storedUser =
    localStorage.getItem('user');

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const isAdmin =
    user?.role === 'admin';

  const loadOrders = async () => {
    if (!user) {
      return;
    }

    if (isAdmin) {
      const result =
        await getOrders();

      setOrders(result);
    } else {
      const result =
        await getOrdersByUser(
          user.id
        );

      setOrders(result);
    }
  };

  const loadCart = async () => {
    if (!user || isAdmin) {
      return;
    }

    try {
      const result =
        await getCartByUser(
          user.id
        );

      setCart(result);
    } catch (error) {
      if (
        !error.message
          .toLowerCase()
          .includes('not found')
      ) {
        throw error;
      }

      setCart(null);
    }
  };

  useEffect(() => {
    const loadPage = async () => {
      if (!user) {
        setError(
          'You must be logged in to view your orders.'
        );

        setLoading(false);
        return;
      }

      try {
        await loadCart();
        await loadOrders();
      } catch (error) {
        setError(
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  const handlePlaceOrder =
    async () => {
      if (
        !cart ||
        cart.items.length === 0
      ) {
        setOrderError(
          'Your cart is empty.'
        );

        return;
      }

      if (
        !shippingAddress.trim()
      ) {
        setOrderError(
          'Please enter pickup or delivery details.'
        );

        return;
      }

      try {
        setOrderError('');
        setOrderMessage('');

        await createOrder({
          user: user.id,

          items:
            cart.items
              .filter(
                (item) =>
                  item.product
              )
              .map(
                (item) => ({
                  product:
                    item.product._id,
                  quantity:
                    item.quantity,
                  price:
                    item.price
                })
              ),

          totalAmount:
            cart.totalAmount,

          shippingAddress:
            shippingAddress.trim()
        });

        setOrderMessage(
          'Order placed successfully.'
        );

        setShippingAddress('');

        await loadOrders();
      } catch (error) {
        setOrderError(
          error.message
        );
      }
    };

  const handleOrderStatus =
    async (
      orderId,
      status
    ) => {
      try {
        setOrderError('');
        setOrderMessage('');

        await updateOrder(
          orderId,
          {
            status
          }
        );

        setOrderMessage(
          `Order updated to ${status}.`
        );

        await loadOrders();
      } catch (error) {
        setOrderError(
          error.message
        );
      }
    };

  const handleRemoveItem =
    async (itemId) => {
      try {
        setOrderError('');
        setOrderMessage('');

        const updatedCart =
          await removeCartItem(
            cart._id,
            itemId
          );

        setCart(
          updatedCart
        );

        setOrderMessage(
          'Item removed from cart.'
        );
      } catch (error) {
        setOrderError(
          error.message
        );
      }
    };

  const getStatusClasses = (
    status
  ) => {
    if (
      status === 'Ongoing'
    ) {
      return (
        'border-amber-300 ' +
        'bg-amber-50 ' +
        'text-amber-700'
      );
    }

    if (
      status === 'Confirmed'
    ) {
      return (
        'border-blue-300 ' +
        'bg-blue-50 ' +
        'text-blue-700'
      );
    }

    if (
      status ===
      'Ready for Claiming'
    ) {
      return (
        'border-green-300 ' +
        'bg-green-50 ' +
        'text-green-700'
      );
    }

    if (
      status === 'Cancelled'
    ) {
      return (
        'border-red-300 ' +
        'bg-red-50 ' +
        'text-red-700'
      );
    }

    return (
      'border-zinc-300 ' +
      'bg-zinc-100 ' +
      'text-zinc-700'
    );
  };

  const getStatusIcon = (
    status
  ) => {
    if (
      status === 'Ongoing'
    ) {
      return (
        <Clock3 size={14} />
      );
    }

    if (
      status ===
        'Confirmed' ||
      status ===
        'Ready for Claiming'
    ) {
      return (
        <CheckCircle2
          size={14}
        />
      );
    }

    return (
      <Package size={14} />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-100 px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-900 bg-zinc-50 p-6">
          <p className="text-sm text-zinc-600">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-300 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
              {isAdmin
                ? 'Admin Account'
                : 'Customer Account'}
            </p>

            <div className="mt-2 flex items-center gap-3">

              <h1 className="text-3xl font-bold text-zinc-900">
                {isAdmin
                  ? 'Manage Orders'
                  : 'My Orders'}
              </h1>

            </div>

            <p className="mt-2 text-sm leading-6 text-zinc-900">
              {isAdmin
                ? 'Review and update customer order statuses.'
                : 'Manage your cart and track your current orders.'}
            </p>
          </div>

          <Button to="/">
            <span className="flex items-center gap-2">
              <House size={20} />
              Home
            </span>
          </Button>

        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {!error && (
          <div
            className={
              isAdmin
                ? 'space-y-6'
                : 'grid gap-6 lg:grid-cols-2 lg:items-start'
            }
            >

            {!isAdmin && (
              <section className="min-w-0 rounded-3xl border border-zinc-900 bg-zinc-50 p-5 sm:p-6">

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-800 text-white">
                      <ShoppingCart
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-800">
                        Shopping Cart
                      </p>

                      <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                        Current Cart
                      </h2>
                    </div>

                  </div>

                  <Button to="/products">
                    Continue Shopping
                  </Button>

                </div>

                {!cart ||
                cart.items.length ===
                  0 ? (
                  <div className="mt-6 rounded-2xl border border-zinc-300 bg-zinc-100 px-5 py-5">
                    <p className="text-sm font-medium text-zinc-700">
                      Your cart is empty.
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Add products to your
                      cart to place an order.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-300">

                      {cart.items.map(
                        (
                          item,
                          index
                        ) => (
                          <div
                            key={
                              item._id
                            }
                            className={[
                              'flex flex-col gap-4 p-4 sm:flex-row sm:items-center',
                              index !==
                              cart.items
                                .length -
                                1
                                ? 'border-b border-zinc-300'
                                : ''
                            ].join(' ')}
                          >

                            <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl border border-zinc-300 bg-white sm:w-24">

                              {item.product
                                ?.image ? (
                                <img
                                  src={
                                    item
                                      .product
                                      .image
                                  }
                                  alt={
                                    item
                                      .product
                                      .productName
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center px-2 text-center text-xs text-zinc-500">
                                  No Image
                                </div>
                              )}

                            </div>

                            <div className="flex-1">

                              <h3 className="font-semibold text-zinc-900">
                                {item.product
                                  ?.productName ||
                                  'Product no longer available'}
                              </h3>

                              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-500">

                                <span>
                                  Quantity:{' '}
                                  {
                                    item.quantity
                                  }
                                </span>

                                <span>
                                  ₱
                                  {
                                    item.price
                                  }{' '}
                                  each
                                </span>

                              </div>

                            </div>

                            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                              <p className="text-lg font-bold text-zinc-900">
                                ₱
                                {(
                                  item.price *
                                  item.quantity
                                ).toFixed(
                                  2
                                )}
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveItem(
                                    item._id
                                  )
                                }
                                className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                              >
                                Remove
                              </button>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                    <div className="mt-6 grid gap-4">

                      <div className="rounded-2xl border border-zinc-300 bg-white p-5">

                        <div className="flex items-center gap-2">
                          <MapPin
                            size={18}
                            className="text-blue-900"
                          />

                          <h3 className="font-semibold text-zinc-900">
                            Pickup / Delivery Details
                          </h3>
                        </div>

                        <p className="mt-1 text-xs text-zinc-500">
                          Enter where you want to receive or claim your order.
                        </p>

                        <textarea
                          id="shippingAddress"
                          value={shippingAddress}
                          onChange={(event) => {
                            setShippingAddress(
                              event.target.value
                            );

                            setOrderError('');
                          }}
                          placeholder="Enter pickup location or delivery address..."
                          rows="3"
                          className="mt-4 w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                        />

                      </div>

                      <div className="rounded-2xl border border-violet-300 bg-violet-100 p-5">

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">
                            Order Summary
                          </p>

                          <div className="mt-4 flex items-center justify-between gap-4">

                            <span className="text-sm font-medium text-zinc-600">
                              Total Amount
                            </span>

                            <span className="text-2xl font-bold text-zinc-900">
                              ₱
                              {Number(
                                cart.totalAmount
                              ).toFixed(2)}
                            </span>

                          </div>
                        </div>

                        <div className="mt-5">
                          <Button
                            type="button"
                            variant="primary"
                            onClick={handlePlaceOrder}
                          >
                            <span className="flex items-center gap-2">
                              <ShoppingCart size={17} />
                              Place Order
                            </span>
                          </Button>
                        </div>

                      </div>

                    </div>
                  </>
                )}

              </section>
            )}

            <section className="rounded-3xl border border-zinc-900 bg-zinc-50 p-5 sm:p-7">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-800 text-white">
                    <ClipboardList
                      size={20}
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-900">
                      {isAdmin
                        ? 'Customer Orders'
                        : 'Order History'}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                      {isAdmin
                        ? 'All Orders'
                        : 'My Orders'}
                    </h2>
                  </div>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-600">
                  <Clock3 size={16} />

                  {orders.length}{' '}
                  {orders.length === 1
                    ? 'Order'
                    : 'Orders'}
                </div>

              </div>

              {orderMessage && (
                <div className="mt-5 rounded-xl border border-green-300 bg-green-50 px-4 py-3">
                  <p className="text-sm font-medium text-green-800">
                    {orderMessage}
                  </p>
                </div>
              )}

              {orderError && (
                <div className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {orderError}
                  </p>
                </div>
              )}

              {orders.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-zinc-300 bg-zinc-100 px-5 py-5">

                  <p className="text-sm font-medium text-zinc-700">
                    No orders found.
                  </p>

                  {!isAdmin && (
                    <p className="mt-1 text-sm text-zinc-500">
                      Add products to your
                      cart and place an order
                      to see it here.
                    </p>
                  )}

                </div>
              ) : (
                <div className="mt-6 space-y-4">

                  {orders.map(
                    (order) => (
                      <div
                        key={order._id}
                        className="rounded-2xl border border-zinc-300 bg-white p-5"
                      >

                        <div className="flex flex-wrap items-start justify-between gap-4">

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                              Order ID
                            </p>

                            <p className="mt-1 break-all text-sm font-semibold text-zinc-900">
                              {order._id}
                            </p>

                            {isAdmin && (
                              <p className="mt-3 text-sm text-zinc-600">
                                Customer:{' '}

                                <span className="font-semibold text-zinc-900">
                                  {order.user
                                    ?.firstName ||
                                    'Unknown'}{' '}
                                  {order.user
                                    ?.lastName ||
                                    ''}
                                </span>
                              </p>
                            )}

                          </div>

                          <span
                            className={[
                              'inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase',
                              getStatusClasses(
                                order.status
                              )
                            ].join(' ')}
                          >
                            {getStatusIcon(
                              order.status
                            )}

                            {order.status}
                          </span>

                        </div>

                        <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">

                          {order.items.map(
                            (
                              item,
                              index
                            ) => (
                              <div
                                key={
                                  item._id
                                }
                                className={[
                                  'flex items-center justify-between gap-4 px-4 py-3',
                                  index !==
                                  order.items
                                    .length -
                                    1
                                    ? 'border-b border-zinc-200'
                                    : ''
                                ].join(' ')}
                              >

                                <div>
                                  <p className="font-medium text-zinc-900">
                                    {item.product
                                      ?.productName ||
                                      'Product no longer available'}
                                  </p>

                                  <p className="mt-1 text-xs text-zinc-500">
                                    Quantity:{' '}
                                    {
                                      item.quantity
                                    }
                                  </p>
                                </div>

                                <p className="font-semibold text-zinc-900">
                                  ₱
                                  {(
                                    item.price *
                                    item.quantity
                                  ).toFixed(
                                    2
                                  )}
                                </p>

                              </div>
                            )
                          )}

                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">

                          <div className="rounded-xl bg-zinc-100 px-4 py-3">

                            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                              <MapPin
                                size={14}
                              />
                              Pickup /
                              Delivery
                            </p>

                            <p className="mt-2 text-sm font-medium text-zinc-900">
                              {
                                order.shippingAddress
                              }
                            </p>

                          </div>

                          <div className="rounded-xl bg-zinc-100 px-4 py-3">

                            <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                              Total Amount
                            </p>

                            <p className="mt-2 text-xl font-bold text-zinc-900">
                              ₱
                              {Number(
                                order.totalAmount
                              ).toFixed(
                                2
                              )}
                            </p>

                          </div>

                        </div>

                        {isAdmin && (
                          <div className="mt-5 flex flex-wrap justify-end gap-3">

                            {order.status ===
                              'Ongoing' && (
                              <Button
                                type="button"
                                variant="primary"
                                onClick={() =>
                                  handleOrderStatus(
                                    order._id,
                                    'Confirmed'
                                  )
                                }
                              >
                                Confirm Order
                              </Button>
                            )}

                            {order.status ===
                              'Confirmed' && (
                              <Button
                                type="button"
                                variant="primary"
                                onClick={() =>
                                  handleOrderStatus(
                                    order._id,
                                    'Ready for Claiming'
                                  )
                                }
                              >
                                Ready for Claiming
                              </Button>
                            )}

                          </div>
                        )}

                      </div>
                    )
                  )}

                </div>
              )}

            </section>

          </div>
        )}

      </div>
    </div>
  );
};

export default OrdersPage;