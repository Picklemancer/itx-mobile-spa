import clsx from "clsx";

const Image = (props) => {
  // ...
  return (
    <img
      {...props}
      className={clsx(
        "bg-theme-200 dark:bg-theme-800",
        props.className,
      )}
    />
  );
};

export default Image;