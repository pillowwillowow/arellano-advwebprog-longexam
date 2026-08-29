import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import Button from '../../components/Button.jsx';
import { getProductById, updateProduct } from '../../services/ProductService.js';
import { getReviewsByProduct, createReview, updateReview } from '../../services/ReviewService.js';
import { addToCart } from '../../services/CartService.js';
import { getCategories } from '../../services/CategoryService.js';

function ProductPage() {
  const { id } = useParams();
  const storedUser = localStorage.getItem('user');
  const user = storedUser
    ? JSON.parse(storedUser)
    : null;
  const isAdmin = user?.role === 'admin';
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [ editingReviewId, setEditingReviewId ] = useState(null);
  const [ editReviewRating, setEditReviewRating ] = useState(5);
  const [ editReviewComment, setEditReviewComment ] = useState('');
  const [ editReviewError, setEditReviewError ] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [ editProduct, setEditProduct ] = useState({
    productName: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ reviewError, setReviewError ] = useState('');
  const [ cartMessage, setCartMessage ] = useState('');
  const [ cartError, setCartError] = useState('');
  const [ editMessage, setEditMessage ] = useState('');
  const [
    editError,
    setEditError
  ] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productResult =
          await getProductById(id);

        const reviewResult =
          await getReviewsByProduct(id);

        setProduct(
          productResult.data
        );

        setReviews(
          reviewResult
        );

        setEditProduct({
          productName:
            productResult.data
              .productName,
          description: productResult.data
              .description,
          price: productResult.data
              .price,
          stock: productResult.data
              .stock,
          category: productResult.data
              .category?._id || '',
          image: productResult.data
              .image || ''
        });

        if (isAdmin) {
          const categoryResult =
            await getCategories();

          setCategories(
            categoryResult.data
          );
        }
      } catch (error) {
        setError(
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [
    id,
    isAdmin
  ]);

  const renderStars = (
    value,
    onChange = null
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <button
              key={star}
              type="button"
              disabled={!onChange}
              onClick={() =>
                onChange?.(star)
              }
              className={
                onChange
                  ? 'cursor-pointer transition hover:scale-110'
                  : 'cursor-default'
              }
            >
              <Star
                size={22}
                className={
                  star <=
                  Number(value)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-zinc-300'
                }
              />
            </button>
          )
        )}
      </div>
    );
  };

  const handleReviewSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!user) {
      setReviewError(
        'You must be logged in to create a review.'
      );

      return;
    }

    try {
      setReviewError('');

      await createReview({
        user: user.id,
        product: id,
        rating:
          Number(rating),
        comment
      });

      const reviewResult =
        await getReviewsByProduct(id);

      setReviews(
        reviewResult
      );

      setComment('');
      setRating(5);
    } catch (error) {
      setReviewError(
        error.message
      );
    }
  };

  const handleAddToCart =
    async () => {
      if (!user) {
        setCartError(
          'You must be logged in to add products to cart.'
        );

        return;
      }

      try {
        setCartError('');
        setCartMessage('');

        await addToCart({
          user: user.id,
          product:
            product._id,
          quantity: 1,
          price:
            product.price
        });

        setCartMessage(
          'Product added to cart successfully!'
        );
      } catch (error) {
        setCartError(
          error.message
        );
      }
    };

  const handleEditChange = (
    event
  ) => {
    setEditProduct({
      ...editProduct,
      [event.target.name]:
        event.target.value
    });
  };

  const handleEditSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setEditError('');
      setEditMessage('');

      const result =
        await updateProduct(
          id,
          {
            productName:
              editProduct
                .productName,

            description:
              editProduct
                .description,

            price:
              Number(
                editProduct.price
              ),

            stock:
              Number(
                editProduct.stock
              ),

            category:
              editProduct
                .category,

            image:
              editProduct.image
          }
        );

      setProduct(
        result.data
      );

      setEditMessage(
        'Product updated successfully.'
      );

      setIsEditing(false);
    } catch (error) {
      setEditError(
        error.message
      );
    }
  };

  const handleEditReview = (
    review
  ) => {
    setEditingReviewId(
      review._id
    );

    setEditReviewRating(
      review.rating
    );

    setEditReviewComment(
      review.comment
    );

    setEditReviewError('');
  };

  const handleUpdateReview =
    async (
      reviewId
    ) => {
      try {
        setEditReviewError('');

        await updateReview(
          reviewId,
          {
            rating:
              Number(
                editReviewRating
              ),

            comment:
              editReviewComment
          }
        );

        const reviewResult =
          await getReviewsByProduct(
            id
          );

        setReviews(
          reviewResult
        );

        setEditingReviewId(
          null
        );

        setEditReviewComment('');
        setEditReviewRating(5);
      } catch (error) {
        setEditReviewError(
          error.message
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-8">
          <p className="text-zinc-600">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (
    error ||
    !product
  ) {
    return (
      <div className="min-h-screen bg-violet-300 px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Product not found
          </h1>

          <div className="mt-6">
            <Button to="/products">
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-300 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">

        <div className="flex flex-wrap gap-3">
          <Button to="/products">
            Back to Products
          </Button>

          {isAdmin && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setIsEditing(
                  !isEditing
                );

                setEditMessage('');
                setEditError('');
              }}
            >
              {isEditing
                ? 'Cancel Edit'
                : 'Edit Product'}
            </Button>
          )}
        </div>

        {isAdmin &&
          isEditing && (
            <section className="rounded-3xl border-1 border-zinc-900 bg-violet-100 p-5 sm:p-7">

              <h2 className="text-2xl font-semibold text-zinc-900">
                Edit Product
              </h2>

              <form
                onSubmit={
                  handleEditSubmit
                }
                className="mt-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="text-sm font-medium text-zinc-700">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="productName"
                      value={
                        editProduct
                          .productName
                      }
                      onChange={
                        handleEditChange
                      }
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-700">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={
                        editProduct
                          .price
                      }
                      onChange={
                        handleEditChange
                      }
                      min="50"
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-700">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      value={
                        editProduct
                          .stock
                      }
                      onChange={
                        handleEditChange
                      }
                      min="0"
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-700">
                      Category
                    </label>

                    <select
                      name="category"
                      value={
                        editProduct
                          .category
                      }
                      onChange={
                        handleEditChange
                      }
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    >
                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (
                          category
                        ) => (
                          <option
                            key={
                              category._id
                            }
                            value={
                              category._id
                            }
                          >
                            {
                              category
                                .categoryName
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-zinc-700">
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      value={
                        editProduct
                          .image
                      }
                      onChange={
                        handleEditChange
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-zinc-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        editProduct
                          .description
                      }
                      onChange={
                        handleEditChange
                      }
                      rows="4"
                      required
                      className="mt-2 w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                </div>

                {editMessage && (
                  <p className="mt-4 text-sm font-medium text-green-800">
                    {editMessage}
                  </p>
                )}

                {editError && (
                  <p className="mt-4 text-sm font-medium text-red-600">
                    {editError}
                  </p>
                )}

                <div className="mt-5">
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </section>
          )}

        <section className="rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-5 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-2">

            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl border-1 border-zinc-900 bg-zinc-200">
              {product.image ? (
                <img
                  src={
                    product.image
                  }
                  alt={
                    product
                      .productName
                  }
                  className="h-full w-full bg-white object-cover"
                />
              ) : (
                <p className="text-sm text-zinc-500">
                  No image available
                </p>
              )}
            </div>

            <div className="flex flex-col">

              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                {
                  product
                    .category
                    ?.categoryName ||
                  'Uncategorized'
                }
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                {
                  product
                    .productName
                }
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">

                <span className="text-2xl font-bold text-zinc-900">
                  ₱{
                    product.price
                  }
                </span>

                <span className="rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                  Stock:{' '}
                  {
                    product.stock
                  }
                </span>
              </div>

              <div className="mt-6 border-t border-zinc-200 pt-5">

                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-700 sm:text-base">
                  {
                    product
                      .description
                  }
                </p>
              </div>

              <div className="mt-auto pt-8">

                <div className="flex flex-wrap gap-3">

                  {!isAdmin && (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={
                        handleAddToCart
                      }
                    >
                      Add to Cart
                    </Button>
                  )}

                  <Button to="/products">
                    Continue Shopping
                  </Button>
                </div>

                {!isAdmin &&
                  cartMessage && (
                    <p className="mt-5 text-sm font-medium text-green-900">
                      {
                        cartMessage
                      }
                    </p>
                  )}

                {!isAdmin &&
                  cartError && (
                    <p className="mt-4 text-sm font-medium text-red-600">
                      {
                        cartError
                      }
                    </p>
                  )}

              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-1 border-zinc-900 bg-zinc-50 p-5 sm:p-7">

          <div
            className={
              isAdmin
                ? ''
                : 'grid gap-8 lg:grid-cols-[1.3fr_0.7fr]'
            }
          >

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Customer Feedback
              </p>

              <div className="mt-2 flex items-center justify-between gap-4">

                <h2 className="text-2xl font-semibold text-zinc-900 font-unbounded">
                  Reviews
                </h2>

                <span className="text-sm text-zinc-500">
                  {reviews.length}{' '}
                  {reviews.length === 1
                    ? 'review'
                    : 'reviews'}
                </span>

              </div>

              {reviews.length ===
              0 ? (
                <div className="mt-6 rounded-2xl border-b-1 border-zinc-300 bg-zinc-100 p-5">
                  <p className="text-sm text-zinc-600">
                    No reviews yet.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">

                  {reviews.map(
                    (
                      review
                    ) => (
                      <article
                        key={
                          review._id
                        }
                        className="rounded-2xl border-b-1 border-zinc-300 bg-zinc-100 p-5"
                      >

                        <div className="flex flex-wrap items-start justify-between gap-4">

                          <div>
                            <p className="font-semibold text-zinc-900">
                              {
                                review
                                  .user
                                  ?.firstName
                              }{' '}
                              {
                                review
                                  .user
                                  ?.lastName
                              }
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              Verified
                              Customer
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-1">

                            {renderStars(
                              review.rating
                            )}

                            <span className="text-xs text-zinc-500">
                              {
                                review.rating
                              }
                              .0 out
                              of 5
                            </span>

                          </div>
                        </div>

                        {isAdmin &&
                        editingReviewId ===
                          review._id ? (
                          <div className="mt-5 space-y-4">

                            <div>
                              <label className="text-sm font-medium text-zinc-700">
                                Rating
                              </label>

                              <div className="mt-2 flex items-center gap-3">

                                {renderStars(
                                  editReviewRating,
                                  setEditReviewRating
                                )}

                                <span className="text-sm font-medium text-zinc-600">
                                  {
                                    editReviewRating
                                  }
                                  /5
                                </span>

                              </div>
                            </div>

                            <div>

                              <label className="text-sm font-medium text-zinc-700">
                                Comment
                              </label>

                              <textarea
                                value={
                                  editReviewComment
                                }
                                onChange={(
                                  event
                                ) =>
                                  setEditReviewComment(
                                    event
                                      .target
                                      .value
                                  )
                                }
                                rows="4"
                                className="mt-2 w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                              />

                            </div>

                            {editReviewError && (
                              <p className="text-sm text-red-600">
                                {
                                  editReviewError
                                }
                              </p>
                            )}

                            <div className="flex gap-3">

                              <Button
                                type="button"
                                variant="primary"
                                onClick={() =>
                                  handleUpdateReview(
                                    review._id
                                  )
                                }
                              >
                                Save Review
                              </Button>

                              <Button
                                type="button"
                                onClick={() =>
                                  setEditingReviewId(
                                    null
                                  )
                                }
                              >
                                Cancel
                              </Button>

                            </div>

                          </div>
                        ) : (
                          <>
                            <p className="mt-4 text-sm leading-6 text-zinc-600">
                              {
                                review.comment
                              }
                            </p>

                            {isAdmin && (
                              <div className="mt-4">
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleEditReview(
                                      review
                                    )
                                  }
                                >
                                  Edit Review
                                </Button>
                              </div>
                            )}
                          </>
                        )}

                      </article>
                    )
                  )}

                </div>
              )}

            </div>

            {!isAdmin && (
              <div className="rounded-2xl border-1 border-zinc-900 bg-violet-100 p-5">

                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Your Feedback
                </p>

                <h3 className="mt-2 text-xl font-semibold text-zinc-900">
                  Write a Review
                </h3>

                <form
                  onSubmit={
                    handleReviewSubmit
                  }
                  className="mt-5 space-y-4"
                >

                  <div>

                    <label className="text-sm font-medium text-zinc-700">
                      Rating
                    </label>

                    <div className="mt-2 flex items-center gap-3">

                      {renderStars(
                        rating,
                        setRating
                      )}

                      <span className="text-sm font-medium text-zinc-600">
                        {
                          rating
                        }
                        /5
                      </span>

                    </div>

                  </div>

                  <div>

                    <label
                      htmlFor="comment"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Comment
                    </label>

                    <textarea
                      id="comment"
                      value={
                        comment
                      }
                      onChange={(
                        event
                      ) =>
                        setComment(
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Share your experience with this product..."
                      required
                      rows="5"
                      className="mt-2 w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />

                  </div>

                  {reviewError && (
                    <p className="text-sm text-red-600">
                      {
                        reviewError
                      }
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                  >
                    Submit Review
                  </Button>

                </form>

              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}

export default ProductPage;