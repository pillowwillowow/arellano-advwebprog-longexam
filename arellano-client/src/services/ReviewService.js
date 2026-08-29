const BASE_URL =
  'http://localhost:8000/api/review';

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

export const getReviews =
  async () => {
    const response =
      await fetch(
        BASE_URL
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to load reviews'
      );
    }

    return data;
  };

export const getReviewsByProduct =
  async (productId) => {
    const response =
      await fetch(
        `${BASE_URL}/product/${productId}`
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to load reviews'
      );
    }

    return data;
  };

export const createReview =
  async (reviewData) => {
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
              reviewData
            )
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to create review'
      );
    }

    return data;
  };

export const updateReview =
  async (
    id,
    reviewData
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
              reviewData
            )
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        'Failed to update review'
      );
    }

    return data;
  };