const BASE_URL = "https://itx-frontend-test.onrender.com";

export const getProducts = async () => {
    const url = new URL("api/product", BASE_URL);

    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const getProduct = async (id) => {
    const url = new URL(
        "api/product/:id".replace(":id", id),
        BASE_URL,
    );

    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const addProductToCart = async (id, colorCode, storageCode) => {
    const url = new URL("api/cart", BASE_URL);
    const body = { id, colorCode, storageCode };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });

    const data = await response.json();
    return data.count;
};