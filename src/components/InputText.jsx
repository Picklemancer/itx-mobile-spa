import clsx from "clsx";

const InputText = ({ className, onChange, onValueChange, ...props }) => {
  // ...
  return (
    <input
      {...props}
      type="text"
      className={clsx(
        "bg-theme-200 dark:bg-theme-800 focus:outline-2 outline-theme-500",
        "rounded-xl py-2 px-3",
        className,
      )}
      onChange={event => {
        if (onChange) onChange(event);
        if (onValueChange) onValueChange(event.target.value);
      }}
    />
  );
};

export default InputText;