import Button from './Button';

const ProductCard = ({ product, index }) => {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-blue-900 p-4">
    <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
      {product.image ? (
        <img
          src={product.image}
          alt={product.productName}
          className="h-full w-full bg-white object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center border-1 border-zinc-300 bg-zinc-100 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Item
        </div>
      )}
    </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-yellow-400">
        {product.category?.categoryName} {String(index + 1).padStart(2, '0')}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {product.productName}
      </h3>

      <p className="mt-2 text-base text-white">
        ₱{product.price}
      </p>

      <p className="mt-3 text-sm leading-6 text-white">
        {product.description}
      </p>

      <Button
        to={`/products/${product._id}`}
        className="mt-auto pt-2 self-start"
        variant="secondary"
      >
        View Product
      </Button>
    </article>
  );
};

export default ProductCard;