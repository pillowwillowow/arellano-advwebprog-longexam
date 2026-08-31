import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Star, ShoppingCart, X, PawPrint, Dog, ClipboardPen } from "lucide-react";

import Button from "../../components/Button.jsx";

import {
  getProductById,
  updateProduct,
} from "../../services/ProductService.js";

import {
  getReviewsByProduct,
  createReview,
  updateReview,
} from "../../services/ReviewService.js";

import { addToCart } from "../../services/CartService.js";

import { getCategories } from "../../services/CategoryService.js";

function ProductPage() {
  const { id } = useParams();

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [editingReviewId, setEditingReviewId] = useState(null);

  const [editReviewRating, setEditReviewRating] = useState(5);

  const [editReviewComment, setEditReviewComment] = useState("");

  const [editReviewError, setEditReviewError] = useState("");

  const [categories, setCategories] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [editProduct, setEditProduct] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [reviewError, setReviewError] = useState("");

  const [cartMessage, setCartMessage] = useState("");

  const [cartError, setCartError] = useState("");

  const [editMessage, setEditMessage] = useState("");

  const [editError, setEditError] = useState("");

  const [reviewPage, setReviewPage] = useState(1);

  const reviewsPerPage = 2;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productResult = await getProductById(id);

        const reviewResult = await getReviewsByProduct(id);

        setProduct(productResult.data);

        setReviews(reviewResult);

        setEditProduct({
          productName: productResult.data.productName,

          description: productResult.data.description,

          price: productResult.data.price,

          stock: productResult.data.stock,

          category: productResult.data.category?._id || "",

          image: productResult.data.image || "",
        });

        if (isAdmin) {
          const categoryResult = await getCategories();

          setCategories(categoryResult.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isAdmin]);

  const renderStars = (value, onChange = null) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!onChange}
            onClick={() => onChange?.(star)}
            className={
              onChange
                ? "cursor-pointer transition hover:scale-110"
                : "cursor-default"
            }
          >
            <Star
              size={18}
              className={
                star <= Number(value)
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-300"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setReviewError("You must be logged in to create a review.");

      return;
    }

    try {
      setReviewError("");

      await createReview({
        user: user.id,

        product: id,

        rating: Number(rating),

        comment,
      });

      const reviewResult = await getReviewsByProduct(id);

      setReviews(reviewResult);

      setReviewPage(1);

      setComment("");
      setRating(5);
    } catch (error) {
      setReviewError(error.message);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      setCartError("You must be logged in to add products to cart.");

      return;
    }

    try {
      setCartError("");
      setCartMessage("");

      await addToCart({
        user: user.id,

        product: product._id,

        quantity: 1,

        price: product.price,
      });

      setCartMessage("Product added to cart successfully!");
    } catch (error) {
      setCartError(error.message);
    }
  };

  const handleEditChange = (event) => {
    setEditProduct({
      ...editProduct,

      [event.target.name]: event.target.value,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      setEditError("");
      setEditMessage("");

      const result = await updateProduct(id, {
        productName: editProduct.productName,

        description: editProduct.description,

        price: Number(editProduct.price),

        stock: Number(editProduct.stock),

        category: editProduct.category,

        image: editProduct.image,
      });

      setProduct(result.data);

      setEditMessage("Product updated successfully.");

      setIsEditing(false);
    } catch (error) {
      setEditError(error.message);
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);

    setEditReviewRating(review.rating);

    setEditReviewComment(review.comment);

    setEditReviewError("");
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      setEditReviewError("");

      await updateReview(reviewId, {
        rating: Number(editReviewRating),

        comment: editReviewComment,
      });

      const reviewResult = await getReviewsByProduct(id);

      setReviews(reviewResult);

      setReviewPage(1);

      setEditingReviewId(null);

      setEditReviewComment("");

      setEditReviewRating(5);
    } catch (error) {
      setEditReviewError(error.message);
    }
  };

  const reviewStart = (reviewPage - 1) * reviewsPerPage;

  const reviewEnd = reviewStart + reviewsPerPage;

  const paginatedReviews = reviews.slice(reviewStart, reviewEnd);

  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-900 bg-zinc-50 p-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            Product not found
          </h1>

          <div className="mt-6">
            <div className="mt-6">
              <Button to="/products">
                <span className="flex items-center gap-2">
                  <PawPrint size={15} />
                  Back to Products
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          <div className="mt-6">
            <Button to="/products">
              <span className="flex items-center gap-2">
                <PawPrint size={15} />
                Back to Products
              </span>
            </Button>
          </div>
        </div>

        {isAdmin && isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-800">
                    Admin Action
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-zinc-900">
                    Edit Product
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Update the product information below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditError("");
                    setEditMessage("");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="mt-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="editProductName"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Product Name
                    </label>

                    <input
                      id="editProductName"
                      type="text"
                      name="productName"
                      value={editProduct.productName}
                      onChange={handleEditChange}
                      required
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="editPrice"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Price
                    </label>

                    <input
                      id="editPrice"
                      type="number"
                      name="price"
                      value={editProduct.price}
                      onChange={handleEditChange}
                      min="50"
                      required
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="editStock"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Stock
                    </label>

                    <input
                      id="editStock"
                      type="number"
                      name="stock"
                      value={editProduct.stock}
                      onChange={handleEditChange}
                      min="0"
                      required
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="editCategory"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Category
                    </label>

                    <select
                      id="editCategory"
                      name="category"
                      value={editProduct.category}
                      onChange={handleEditChange}
                      required
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="editImage"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Image URL
                    </label>

                    <input
                      id="editImage"
                      type="text"
                      name="image"
                      value={editProduct.image}
                      onChange={handleEditChange}
                      placeholder="Enter image URL"
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="editDescription"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="editDescription"
                      name="description"
                      value={editProduct.description}
                      onChange={handleEditChange}
                      rows="4"
                      required
                      className="mt-2 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
                    />
                  </div>
                </div>

                {editError && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                      {editError}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditError("");
                      setEditMessage("");
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="rounded-3xl bg-zinc-50 p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr_1fr]">
            <div className="flex flex-col">
              <div className="flex aspect-[6/7] items-center justify-center overflow-hidden rounded-2xl">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="h-full w-full bg-white object-cover"
                  />
                ) : (
                  <p className="text-sm text-zinc-500">No image available</p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                {product.category?.categoryName || "Uncategorized"}
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                {product.productName}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-zinc-900">
                  ₱{product.price}
                </span>

                <span className="rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                  Stock: {product.stock}
                </span>

                {isAdmin && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      setIsEditing(true);
                      setEditMessage("");
                      setEditError("");
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <ClipboardPen size={15} />
                      Edit Product
                    </span>
                  </Button>
                )}

                {!isAdmin && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleAddToCart}
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingCart size={15} />
                      Add to Cart
                    </span>
                  </Button>
                )}
              </div>

              <div className="mt-6 border-t border-zinc-200 pt-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Description
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-4">
                {!isAdmin && cartMessage && (
                  <p className="text-sm font-medium text-green-900">
                    {cartMessage}
                  </p>
                )}

                {!isAdmin && cartError && (
                  <p className="text-sm font-medium text-red-600">
                    {cartError}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-600 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    Customer Feedback
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-zinc-900">
                    Reviews
                  </h2>
                </div>

                <span className="text-xs text-zinc-500">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </span>
              </div>

              {reviews.length === 0 ? (
                <div className="mt-4 rounded-xl bg-zinc-100 p-4">
                  <p className="text-sm text-zinc-600">No reviews yet.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {paginatedReviews.map((review) => (
                    <article
                      key={review._id}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">
                            {review.user?.firstName} {review.user?.lastName}
                          </p>

                          <p className="mt-1 text-[11px] text-zinc-500">
                            Verified Customer
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          {renderStars(review.rating)}

                          <span className="text-[11px] text-zinc-500">
                            {review.rating}
                            /5
                          </span>
                        </div>
                      </div>

                      {isAdmin && editingReviewId === review._id ? (
                        <div className="mt-4 space-y-3">
                          <div>
                            <label className="text-xs font-medium text-zinc-700">
                              Rating
                            </label>

                            <div className="mt-2">
                              {renderStars(
                                editReviewRating,
                                setEditReviewRating,
                              )}
                            </div>
                          </div>

                          <textarea
                            value={editReviewComment}
                            onChange={(event) =>
                              setEditReviewComment(event.target.value)
                            }
                            rows="3"
                            className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
                          />

                          {editReviewError && (
                            <p className="text-xs text-red-600">
                              {editReviewError}
                            </p>
                          )}

                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="primary"
                              onClick={() => handleUpdateReview(review._id)}
                            >
                              Save
                            </Button>

                            <Button
                              type="button"
                              onClick={() => setEditingReviewId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="mt-3 text-sm leading-5 text-zinc-600">
                            {review.comment}
                          </p>

                          {isAdmin && (
                            <div className="mt-3">
                              <Button
                                type="button"
                                onClick={() => handleEditReview(review)}
                              >
                                Edit Review
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {totalReviewPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={reviewPage === 1}
                    onClick={() => setReviewPage(reviewPage - 1)}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-xs text-zinc-500">
                    {reviewPage} of {totalReviewPages}
                  </span>

                  <button
                    type="button"
                    disabled={reviewPage === totalReviewPages}
                    onClick={() => setReviewPage(reviewPage + 1)}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}

              {!isAdmin && (
                <div className="mt-5 border-t border-zinc-200 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Your Feedback
                  </p>

                  <form
                    onSubmit={handleReviewSubmit}
                    className="mt-3 space-y-3"
                  >
                    <div>
                      <label className="text-xs font-medium text-zinc-700">
                        Rating
                      </label>

                      <div className="mt-2 flex items-center gap-2">
                        {renderStars(rating, setRating)}

                        <span className="text-xs text-zinc-500">
                          {rating}
                          /5
                        </span>
                      </div>
                    </div>

                    <textarea
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      placeholder="Write your review..."
                      required
                      rows="3"
                      className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
                    />

                    {reviewError && (
                      <p className="text-xs text-red-600">{reviewError}</p>
                    )}

                    <Button type="submit" variant="primary">
                      <span className="flex items-center gap-2">
                        <PawPrint size={15} />
                        Submit Review
                      </span>
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductPage;
