const API_URL = "http://localhost:8000/api/v1";

export const getProducts = async (
  page = 1,
  limit = 10,
  search = '',
  category = ''
) => {
  const params = new URLSearchParams({
    page,
    limit
  });

  if (search) {
    params.append('search', search);
  }

  if (category) {
    params.append('category', category);
  }

  const response = await fetch(
    `${API_URL}/product?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(
    `${API_URL}/product/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};


export const registerUser = async (userData) => {
  const response = await fetch(
    "http://localhost:8000/api/user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(
    "http://localhost:8000/api/user/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }

  return data;
};

export const getReviewsByProduct = async (
  productId
) => {
  const response = await fetch(
    `http://localhost:8000/api/review/product/${productId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch reviews"
    );
  }

  return data;
};

export const createReview = async (reviewData) => {
  const response = await fetch(
    "http://localhost:8000/api/review",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create review"
    );
  }

  return data;
};

export const getOrdersByUser = async (userId) => {
  const response = await fetch(
    `http://localhost:8000/api/order/user/${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
};

export const createOrder = async (orderData) => {
  const response = await fetch(
    "http://localhost:8000/api/order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create order"
    );
  }

  return data;
};

export const getUserById = async (id) => {
  const response = await fetch(
    `http://localhost:8000/api/user/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch user"
    );
  }

  return data;
};

export const updateUser = async (
  id,
  userData
) => {
  const response = await fetch(
    `http://localhost:8000/api/user/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update user"
    );
  }

  return data;
};

export const getCategories = async () => {
  const response = await fetch(
    "http://localhost:8000/api/v1/category"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch categories"
    );
  }

  return data;
};

export const createProduct = async (
  productData
) => {
  const response = await fetch(
    "http://localhost:8000/api/v1/product",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create product"
    );
  }

  return data;
};

export const updateProduct = async (
  id,
  productData
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/product/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update product"
    );
  }

  return data;
};

export const addToCart = async (cartData) => {
  const response = await fetch(
    "http://localhost:8000/api/cart",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to add product to cart"
    );
  }

  return data;
};

export const getOrders = async () => {
  const response = await fetch(
    "http://localhost:8000/api/order"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data;
};

export const updateOrder = async (
  id,
  orderData
) => {
  const response = await fetch(
    `http://localhost:8000/api/order/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update order"
    );
  }

  return data;
};

export const updateReview = async (
  id,
  reviewData
) => {
  const response = await fetch(
    `http://localhost:8000/api/review/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update review"
    );
  }

  return data;
};

export const updateUserByAdmin = async (
  id,
  userData
) => {
  const response = await fetch(
    `http://localhost:8000/api/user/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update user"
    );
  }

  return data;
};

export const getUsers = async () => {
  const response = await fetch(
    "http://localhost:8000/api/user"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch users"
    );
  }

  return data;
};

export const removeCartItem = async (
  cartId,
  itemId
) => {
  const response = await fetch(
    `http://localhost:8000/api/cart/${cartId}/item/${itemId}`,
    {
      method: "DELETE"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to remove item"
    );
  }

  return data;
};