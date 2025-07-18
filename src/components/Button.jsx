import clsx from "clsx";

const variants = {
  solid: {
    theme: "bg-theme-400 dark:bg-theme-600",
    primary: "bg-primary-300 dark:bg-primary-700",
  },
  // faded
  // bordered/outline
  // light
  flat: {
    theme: "text-theme-800 bg-theme-200 dark:text-theme-200 dark:bg-theme-800",
    primary: "text-primary-800 bg-primary-200 dark:text-primary-200 dark:bg-primary-800",
  },
  link: {
    theme: "text-theme-950 dark:text-theme-50 bg-transparent",
    primary: "text-primary-950 dark:text-primary-50 bg-transparent",
  },
  // ghost
  // shadow
}

const Button = ({
  variant = "solid",
  color = "theme",
  ...props
}) => {
  // ...
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "py-2 px-3 rounded-xl cursor-pointer",
        variants[variant][color],
        "transition duration-200 active:scale-95",
        props.disabled && "opacity-50 pointer-events-none",
        props.className,
      )}
    />
  );
};

export default Button;