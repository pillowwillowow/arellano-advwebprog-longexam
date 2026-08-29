const BASE_URL =
  'http://localhost:8000/api/v1/product';

const getAuthHeaders = () => {
  const token =
    localStorage.getItem(
      'token'
    );

  return {
    'Content-Type':
      'application/json',
    Authorization:
      `Bearer ${token}`
  };
};

export const getProducts =
  async (
    page = 1,
    limit = 10,
    search = '',
    category = ''
  ) => {
    const params =
      new URLSearchParams();

    params.append(
      'page',
      page
    );

    params.append(
      'limit',
      limit
    );

    if (search) {
      params.append(
        'search',
        search
      );
    }

    if (category) {
      params.append(
        'category',
        category
      );
    }

    const response =
      await fetch(
        `${BASE_URL}?${params.toString()}`
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to load products'
      );
    }

    return data;
  };

export const getProductById =
  async (id) => {
    const response =
      await fetch(
        `${BASE_URL}/${id}`
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to load product'
      );
    }

    return data;
  };

export const createProduct =
  async (productData) => {
    const response =
      await fetch(
        BASE_URL,
        {
          method:
            'POST',
          headers:
            getAuthHeaders(),
          body:
            JSON.stringify(
              productData
            )
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to create product'
      );
    }

    return data;
  };

export const updateProduct =
  async (
    id,
    productData
  ) => {
    const response =
      await fetch(
        `${BASE_URL}/${id}`,
        {
          method:
            'PUT',
          headers:
            getAuthHeaders(),
          body:
            JSON.stringify(
              productData
            )
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to update product'
      );
    }

    return data;
  };

export const deleteProduct =
  async (id) => {
    const response =
      await fetch(
        `${BASE_URL}/${id}`,
        {
          method:
            'DELETE',
          headers:
            getAuthHeaders()
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to delete product'
      );
    }

    return data;
  };