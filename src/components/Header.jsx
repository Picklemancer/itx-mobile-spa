import { useShoppingCart } from "~/contexts/ShoppingCartContext";
import Button from "~/components/Button";
import ShoppingCart from "~/components/icons/ShoppingCart";

const Header = (props) => {

  const shoppingCart = useShoppingCart();

  return (
    <header className="bg-theme-100 dark:bg-theme-900">

      <nav>

        <ul className="p-4 flex justify-between items-center">

          <li>
            <Button
              variant="link"
              onClick={props.onClickHome}
            >
              Home
            </Button>
          </li>

          <li>Breadcrum</li>

          <li className="flex gap-2">
            <ShoppingCart />
            <span>{shoppingCart.cartCount}</span>
          </li>

        </ul>

      </nav>

    </header>
  );
};

export default Header;