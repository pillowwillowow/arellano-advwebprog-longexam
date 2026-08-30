import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-blue-900 text-white border-blue-900 hover:bg-blue-800 hover:border-blue-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md",
  secondary:
    "bg-white text-zinc-900 border-zinc-900 hover:bg-yellow-300 hover:text-zinc-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md active:bg-yellow-200",
  tertiary:
    "bg-yellow-300 text-zinc-900 border-zinc-900 hover:bg-blue-800 hover:text-white hover:border-blue-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
  ...props
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-1 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-all duration-200",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
