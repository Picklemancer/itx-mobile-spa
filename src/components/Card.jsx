import clsx from "clsx";

const Card = ({
  className,
  As = "div",
  isPressable,
  isHoverable,
  ...props
}) => {
  return (
    <As
      {...props}
      className={clsx(
        "bg-theme-100 dark:bg-theme-900",
        "rounded-xl overflow-hidden",
        "transition duration-200",
        isHoverable && "hover:scale-105",
        isPressable && "active:scale-95 cursor-pointer",
        className,
      )}
    />
  )
};

export default Card;