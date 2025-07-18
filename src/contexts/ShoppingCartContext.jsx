import { createContext, useContext, useState } from "react";
import { CART_ITEM_COUNT_STORAGE_KEY } from "~/consts";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {
    const [cartCount, setCartCount] = useState(
        localStorage.getItem(CART_ITEM_COUNT_STORAGE_KEY) || 0
    );

    const set = (cartCount) => {
        setCartCount(cartCount);
        localStorage.setItem(CART_ITEM_COUNT_STORAGE_KEY, cartCount);
    };

    return (
        <ShoppingCartContext.Provider value={{ cartCount, setCartCount: set }}>
            {props.children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);