import { Toaster } from "react-hot-toast";
import { ShoppingCartProvider } from "~/contexts/ShoppingCartContext";

const Providers = (props) => {
  return (
    <>
      <ShoppingCartProvider>
        {props.children}
      </ShoppingCartProvider>

      <Toaster
        toastOptions={{
          position: "top-left",
          className: "text-theme-950 !bg-theme-200 dark:!text-theme-50 dark:!bg-theme-800",
        }}
      />

    </>
  )
};

export default Providers;