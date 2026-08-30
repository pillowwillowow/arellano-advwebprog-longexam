import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import Button from "../../components/Button.jsx";
import ProductList from "../../components/ProductList.jsx";

import { getProducts, createProduct } from "../../services/ProductService.js";

import { getCategories } from "../../services/CategoryService.js";

import {
  Plus,
  X,
  PackagePlus,
  Image,
  Tag,
  PhilippinePeso,
  Boxes,
  FileText,
  Search,
  Package,
} from "lucide-react";

const inputClasses =
  "mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white";

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState(categoryFromUrl);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [createError, setCreateError] = useState("");

  const [searchError, setSearchError] = useState("");

  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const isAdmin = user?.role === "admin";

  const loadProducts = async (
    selectedCategory = category,

    searchValue = search,
  ) => {
    try {
      setLoading(true);

      setError("");

      const result = await getProducts(1, 10, searchValue, selectedCategory);

      setProducts(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategories();

        setCategories(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    setCategory(categoryFromUrl);

    loadProducts(categoryFromUrl, search);
  }, [categoryFromUrl]);

  const handleSearch = (event) => {
    event.preventDefault();

    if (!search.trim()) {
      setSearchError("Please enter a product name to search.");

      return;
    }

    setSearchError("");

    loadProducts(category, search);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    setCategory(selectedCategory);

    if (selectedCategory) {
      setSearchParams({
        category: selectedCategory,
      });
    } else {
      setSearchParams({});
    }
  };

  const handleProductChange = (event) => {
    setNewProduct({
      ...newProduct,

      [event.target.name]: event.target.value,
    });

    setCreateError("");
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();

    try {
      setCreateError("");

      await createProduct({
        productName: newProduct.productName,

        description: newProduct.description,

        price: Number(newProduct.price),

        stock: Number(newProduct.stock),

        category: newProduct.category,

        image: newProduct.image,
      });

      setNewProduct({
        productName: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
      });

      await loadProducts(category, search);

      setShowCreateForm(false);
    } catch (error) {
      setCreateError(error.message);
    }
  };

  const closeCreateModal = () => {
    setShowCreateForm(false);

    setCreateError("");

    setNewProduct({
      productName: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
                <Package size={20} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Products
                </p>

                <h1 className="text-2xl font-bold text-zinc-900">
                  Product Catalog
                </h1>
              </div>
            </div>

            {isAdmin && (
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setShowCreateForm(true);

                  setCreateError("");
                }}
              >
                <span className="flex items-center gap-2">
                  <Plus size={15} />
                  Create Product
                </span>
              </Button>
            )}
          </div>

          <p className="mt-3 max-w-xl text-sm text-zinc-500">
            Browse music gear, search products, and filter by category.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Catalog
              </p>

              <h2 className="text-xl font-bold text-zinc-900">All Products</h2>
            </div>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2 lg:flex-row">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);

                    setSearchError("");
                  }}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none transition focus:border-blue-700 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Search
              </button>
            </form>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="min-w-[180px] rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-700 focus:bg-white"
            >
              <option value="">All Categories</option>

              {categories.map((categoryItem) => (
                <option
                  key={categoryItem._id}
                  value={categoryItem.categoryName}
                >
                  {categoryItem.categoryName}
                </option>
              ))}
            </select>
          </div>

          {searchError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">{searchError}</p>
            </div>
          )}

          {category && (
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                {category}
              </span>

              <button
                type="button"
                onClick={() => {
                  setCategory("");

                  setSearchParams({});
                }}
                className="text-xs font-medium text-zinc-400 transition hover:text-red-600"
              >
                Clear filter
              </button>
            </div>
          )}

          <div className="mt-5">
            {loading && (
              <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-8 text-center">
                <p className="text-sm text-zinc-500">Loading products...</p>
              </div>
            )}

            {!loading && error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-8 text-center">
                <Package size={25} className="mx-auto text-zinc-300" />

                <p className="mt-2 text-sm font-medium text-zinc-600">
                  No products found.
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  Try another search or category.
                </p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <ProductList products={products} />
            )}
          </div>
        </section>
      </div>

      {isAdmin && showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <PackagePlus size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Admin Action
                  </p>

                  <h2 className="text-xl font-bold text-zinc-900">
                    Create Product
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCreateModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="productName"
                    className="text-sm font-medium text-zinc-700"
                  >
                    Product Name
                  </label>

                  <input
                    id="productName"
                    type="text"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleProductChange}
                    placeholder="Enter product name"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-700"
                  >
                    <PhilippinePeso size={14} />
                    Price
                  </label>

                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleProductChange}
                    placeholder="Enter price"
                    min="50"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-700"
                  >
                    <Boxes size={14} />
                    Stock
                  </label>

                  <input
                    id="stock"
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleProductChange}
                    placeholder="Enter stock"
                    min="0"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-700"
                  >
                    <Tag size={14} />
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleProductChange}
                    required
                    className={inputClasses}
                  >
                    <option value="">Select Category</option>

                    {categories.map((categoryItem) => (
                      <option key={categoryItem._id} value={categoryItem._id}>
                        {categoryItem.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="image"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-700"
                  >
                    <Image size={14} />
                    Image URL
                  </label>

                  <input
                    id="image"
                    type="text"
                    name="image"
                    value={newProduct.image}
                    onChange={handleProductChange}
                    placeholder="Enter image URL"
                    className={inputClasses}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-700"
                  >
                    <FileText size={14} />
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleProductChange}
                    placeholder="Enter product description"
                    rows="4"
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>
              </div>

              {createError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {createError}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" onClick={closeCreateModal}>
                  Cancel
                </Button>

                <Button type="submit" variant="primary">
                  <span className="flex items-center gap-2">
                    <Plus size={14} />
                    Create Product
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

export default ProductListPage;
