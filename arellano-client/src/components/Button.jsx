import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'bg-violet-500 text-white border-violet-900 hover:bg-violet-800 hover:border-violet-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md',
  secondary:
    'bg-white text-zinc-900 border-zinc-900 hover:bg-zinc-200',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-all duration-200',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;