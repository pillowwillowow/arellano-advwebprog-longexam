import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';

import ProductList from '../../components/ProductList.jsx';
import { getProducts, createProduct } from '../../services/ProductService.js';
import { getCategories } from '../../services/CategoryService.js';

import { Plus, X, PackagePlus, Image, Tag, PhilippinePeso, Boxes, FileText } from 'lucide-react';

const ProductListPage = () => { const [ searchParams, setSearchParams ] = useSearchParams();
const categoryFromUrl = searchParams.get('category') || ''; 
const [products, setProducts] = useState([]);
const [search, setSearch] = useState('');
const [category, setCategory] = useState(categoryFromUrl); const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [categories, setCategories] = useState([]);
const [ showCreateForm, setShowCreateForm ] = useState(false);
const [ createError, setCreateError ] = useState('');
const [ searchError, setSearchError ] = useState('');
const [ newProduct, setNewProduct ] = useState({
    productName: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  });

const storedUser = localStorage.getItem('user');
const user = storedUser
    ? JSON.parse(storedUser)
    : null;
const isAdmin =
    user?.role === 'admin';

  const loadProducts = async (
    selectedCategory = category,
    searchValue = search
  ) => {
    try {
      setLoading(true);
      setError('');

      const result =
        await getProducts(
          1,
          10,
          searchValue,
          selectedCategory
        );

      setProducts(
        result.data
      );
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories =
      async () => {
        try {
          const result =
            await getCategories();

          setCategories(
            result.data
          );
        } catch (error) {
          console.error(
            error
          );
        }
      };

    loadCategories();
  }, []);

  useEffect(() => {
    setCategory(
      categoryFromUrl
    );

    loadProducts(
      categoryFromUrl,
      search
    );
  }, [categoryFromUrl]);

  const handleSearch = (
    event
  ) => {
    event.preventDefault();

    if (!search.trim()) {
      setSearchError(
        'Please enter a product name to search.'
      );

      return;
    }

    setSearchError('');

    loadProducts(
      category,
      search
    );
  };

  const handleCategoryChange = (
    event
  ) => {
    const selectedCategory =
      event.target.value;

    setCategory(
      selectedCategory
    );

    if (selectedCategory) {
      setSearchParams({
        category:
          selectedCategory
      });
    } else {
      setSearchParams({});
    }
  };

  const handleProductChange = (
    event
  ) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]:
        event.target.value
    });

    setCreateError('');
  };

  const handleCreateProduct =
    async (event) => {
      event.preventDefault();

      try {
        setCreateError('');

        await createProduct({
          productName: newProduct.productName,
          description: newProduct.description,
          price: Number( newProduct.price ),
          stock: Number( newProduct.stock ),
          category: newProduct.category,
          image: newProduct.image
        });

        setNewProduct({
          productName: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          image: ''
        });

        await loadProducts(
          category,
          search
        );

        setShowCreateForm(
          false
        );
      } catch (error) {
        setCreateError(
          error.message
        );
      }
    };

  const closeCreateModal = () => {
    setShowCreateForm(false);
    setCreateError('');

    setNewProduct({
      productName: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: ''
    });
  };

  return (
    <div className="flex w-full flex-col bg-violet-300">

      <section className="border-b border-zinc-900 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Products
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Find the right music gear
          in just a click away!
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Browse guitars, keyboards,
          audio equipment, and other
          music essentials all in one
          place.
        </p>

        <div className="mt-6">
          <Button to="/">
            Back Home
          </Button>
        </div>

      </section>

      <section className="bg-zinc-100 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Featured Products
            </p>

            <h2 className="mt-2 font-unbounded text-2xl font-semibold text-zinc-900">
              Products
            </h2>
          </div>

          {isAdmin && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setShowCreateForm(true);
                setCreateError('');
              }}
            >
              <span className="flex items-center gap-2">
                <Plus size={17} />
                Create Product
              </span>
            </Button>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-zinc-900 bg-zinc-200 p-4 sm:flex-row">

          <form
            onSubmit={
              handleSearch
            }
            className="flex flex-1 gap-2"
          >

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value
                );

                setSearchError('');
              }}
              className="w-full rounded-xl border border-zinc-700 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Search
            </button>

          </form>

          <select
            value={category}
            onChange={
              handleCategoryChange
            }
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (
                categoryItem
              ) => (
                <option
                  key={
                    categoryItem._id
                  }
                  value={
                    categoryItem.categoryName
                  }
                >
                  {
                    categoryItem.categoryName
                  }
                </option>
              )
            )}
          </select>

        </div>

        {searchError && (
          <div className="mb-5 rounded-2xl border border-red-300 bg-red-50 px-5 py-4">
            <p className="font-semibold text-red-700">
              {searchError}
            </p>
          </div>
        )}

        {category && (
          <div className="mb-5 flex items-center gap-2">

            <span className="text-sm text-zinc-500">
              Showing:
            </span>

            <span className="rounded-full border border-violet-400 bg-violet-100 px-3 py-1 text-xs font-semibold text-blue-800">
              {category}
            </span>

            <button
              type="button"
              onClick={() => {
                setCategory('');
                setSearchParams({});
              }}
              className="text-xs font-semibold text-zinc-500 hover:text-red-600"
            >
              Clear
            </button>

          </div>
        )}

        {loading && (
          <p className="text-zinc-600">
            Loading products...
          </p>
        )}

        {!loading &&
          error && (
            <div className="mb-5 rounded-2xl border border-red-300 bg-red-50 px-5 py-4">
              <p className="font-semibold text-red-700">
                {error}
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-5 py-4">

              <p className="font-semibold text-red-700">
                No products found.
              </p>

              <p className="mt-1 text-sm text-red-600">
                Try another search or
                category.
              </p>

            </div>
          )}

        {!loading &&
          !error &&
          products.length > 0 && (
            <ProductList
              products={
                products
              }
            />
          )}

      </section>

      {isAdmin &&
        showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-900 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
                <PackagePlus size={20} />
              </div>
              <div>      
                <h3 className="mt-1 text-2xl font-semibold text-zinc-900">
                  Create Product
                </h3>
              </div>
            </div>

              <form
                onSubmit={
                  handleCreateProduct
                }
                className="mt-6"
              >

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
                      value={
                        newProduct.productName
                      }
                      onChange={
                        handleProductChange
                      }
                      placeholder="Enter product name"
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Price
                    </label>

                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={
                        newProduct.price
                      }
                      onChange={
                        handleProductChange
                      }
                      placeholder="Enter price"
                      min="50"
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stock"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Stock
                    </label>

                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      value={
                        newProduct.stock
                      }
                      onChange={
                        handleProductChange
                      }
                      placeholder="Enter stock"
                      min="0"
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Category
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={
                        newProduct.category
                      }
                      onChange={
                        handleProductChange
                      }
                      required
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    >
                      <option value="">
                        Select Category
                      </option>

                      {categories.map(
                        (
                          categoryItem
                        ) => (
                          <option
                            key={
                              categoryItem._id
                            }
                            value={
                              categoryItem._id
                            }
                          >
                            {
                              categoryItem.categoryName
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="sm:col-span-2">

                    <label
                      htmlFor="image"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Image URL
                    </label>

                    <input
                      id="image"
                      type="text"
                      name="image"
                      value={
                        newProduct.image
                      }
                      onChange={
                        handleProductChange
                      }
                      placeholder="Enter image URL"
                      className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />

                  </div>

                  <div className="sm:col-span-2">

                    <label
                      htmlFor="description"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={
                        newProduct.description
                      }
                      onChange={
                        handleProductChange
                      }
                      placeholder="Enter product description"
                      rows="4"
                      required
                      className="mt-2 w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                    />

                  </div>

                </div>

                {createError && (
                  <div className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                      {createError}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">

                  <Button
                    type="button"
                    onClick={
                      closeCreateModal
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Create Product
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