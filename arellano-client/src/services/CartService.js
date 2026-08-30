const BASE_URL = "http://localhost:8000/api/cart";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getCartByUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load cart");
  }

  return data;
};

export const addToCart = async (cartData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cartData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add item to cart");
  }

  return data;
};

export const removeCartItem = async (cartId, itemId) => {
  const response = await fetch(`${BASE_URL}/${cartId}/item/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove item from cart");
  }

  return data;
};
