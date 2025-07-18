import { useState } from "react";
import toast from "react-hot-toast";
import { PRODUCTS_STORAGE_KEY, PRODUCT_STORAGE_KEY } from "~/consts";
import { cacheWrapper } from "~/utils/storage";
import { debounce } from "~/utils/functions";
import { t } from "~/utils/i18n";
import { getProducts, getProduct, addProductToCart } from "~/services";
import useAsync, { UseAsyncStatus } from "~/hooks/useAsync";
import { useShoppingCart } from "~/contexts/ShoppingCartContext";
import Layout from "~/components/Layout";
import Card from "~/components/Card";
import Image from "~/components/Image";
import InputText from "~/components/InputText";
import Button from "~/components/Button";
import Error from "~/components/Error";
import Loading from "~/components/Loading";

const Products = (props) => {
  const [query, setQuery] = useState("");

  const products = useAsync(
    () => cacheWrapper(getProducts, PRODUCTS_STORAGE_KEY, 1_000 * 60 * 60),
    { initialState: [] },
  );

  // No es necesario useMemo
  // El filtro no es lo suficientemente costoso para que valga la pena memoizarlo
  const filteredProducts = products.state.filter(product =>
    product.brand.includes(query)
    || product.model.includes(query)
  );

  // No es necesario useCallback
  // El componente que recibe la funcion es muy sencillo, no vale la pena memoizarla para evitar renderizados del mismo
  // Tampoco hay ningun problema con un cambio de referencia de la misma para el wrapper del debounce
  const onQueryChange = debounce(setQuery, 150);

  return (
    <section className="m-4">

      <header className="flex justify-end my-4">

        <InputText
          placeholder={t("products.input.placeholder")}
          onValueChange={onQueryChange}
        />

      </header>

      {products.status === UseAsyncStatus.Error && <Error />}

      {products.status === UseAsyncStatus.Pending && <Loading />}

      {products.status === UseAsyncStatus.Success &&

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <li key={product.id}>
              <Card As="article">
                <Button
                  variant="link"
                  className="!p-0 flex items-center w-full"
                  onClick={() => props.onSelect(product)}
                >
                  <Image
                    className="h-48 aspect-3/4"
                    alt={`${product.brand} ${product.model}`}
                    title={`${product.brand} ${product.model}`}
                    src={product.imgUrl}
                  />

                  <div className="m-4">
                    <p>{product.brand}</p>
                    <p>{product.model}</p>
                    <p>{product.price}</p>
                  </div>

                </Button>
              </Card>
            </li>
          ))}
        </ul>

      }

    </section>
  );
};

// const product_example = { "id": "cGjFJlmqNPIwU59AOcY8H", "brand": "Acer", "model": "Liquid Z6 Plus", "price": "250", "imgUrl": "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg", "networkTechnology": "GSM / HSPA / LTE", "networkSpeed": "HSPA 42.2/5.76 Mbps LTE Cat4 150/50 Mbps", "gprs": "Yes", "edge": "Yes", "announced": "2016 August", "status": "Available. Released 2016 December", "dimentions": "153.8 x 75.6 x 8.5 mm (6.06 x 2.98 x 0.33 in)", "weight": "169", "sim": ["Single SIM (Micro-SIM) or Dual SIM (Micro-SIM", "dual stand-by)"], "displayType": "IPS LCD capacitive touchscreen 16M colors", "displayResolution": "5.5 inches (~71.7% screen-to-body ratio)", "displaySize": "1080 x 1920 pixels (~401 ppi pixel density)", "os": "Android 6.0 (Marshmallow)", "cpu": "Octa-core 1.3 GHz Cortex-A53", "chipset": "Mediatek MT6753", "gpu": "Mali-T720MP3", "externalMemory": "microSD up to 256 GB (uses SIM 2 slot)", "internalMemory": ["32 GB"], "ram": "3 GB RAM", "primaryCamera": ["13 MP", "autofocus", "LED flash"], "secondaryCmera": "5 MP", "speaker": "Yes", "audioJack": "Yes", "wlan": ["Wi-Fi 802.11 b/g/n", "Wi-Fi Direct", "hotspot"], "bluetooth": ["4.0", "A2DP"], "gps": "Yes with A-GPS", "nfc": "", "radio": "FM radio", "usb": "microUSB 2.0", "sensors": ["Fingerprint (front-mounted)", "accelerometer", "proximity"], "battery": "Removable Li-Po 4080 mAh battery", "colors": ["Black", "White"], "options": { "colors": [{ "code": 1000, "name": "Black" }, { "code": 1001, "name": "White" }], "storages": [{ "code": 2000, "name": "32 GB" }] } };
const Product = ({ id }) => {

  const [colorCode, setColorCode] = useState(0);
  const [storageCode, setStorageCode] = useState(0);

  const product = useAsync(
    () => cacheWrapper(
      async () => {
        const product = await getProduct(id);

        const colors = product.options.colors;
        if (colors.length === 1) setColorCode(colors.at(0).code);

        const storages = product.options.storages;
        if (storages.length === 1) setStorageCode(storages.at(0).code);

        return product;
      },
      PRODUCT_STORAGE_KEY.replace("{{id}}", id),
      1_000 * 60 * 60,
    ),
    { initialState: null },
  );

  const shoppingCart = useShoppingCart();

  // No es necesario useCallback
  // El componente que recibe la funcion es muy sencillo, no vale la pena memoizarla
  const addCurrentProductToCart = async () => {

    if (!colorCode) return toast.error(t("product.add-cart.toast.error.color"));
    if (!storageCode) return toast.error(t("product.add-cart.toast.error.storage"));

    const productCartCount = await addProductToCart(
      product.state.id,
      colorCode,
      storageCode,
    );

    shoppingCart.setCartCount(productCartCount);

    toast.success(t("product.add-cart.toast.success"));
  };

  if (product.status === UseAsyncStatus.Idle) return;

  if (product.status === UseAsyncStatus.Pending) return (
    <Loading />
  );

  if (product.status === UseAsyncStatus.Error) return (
    <Error />
  );

  return (
    <div className="m-4 flex flex-col md:flex-row items-center justify-around">

      <section>
        <Image className="w-64" src={product.state.imgUrl} />
      </section>

      <div className="flex flex-col gap-4">

        <Card As="section">
          <ul className="m-8 flex flex-col gap-4">

            <li>
              <p>{t("product.description.general.title")}</p>

              <ul>
                <li>Brand: {product.state.brand}</li>
                <li>Model: {product.state.model}</li>
              </ul>

            </li>

            <li>
              <p>{t("product.description.body.title")}</p>

              <ul>
                <li>Dimentions: {product.state.dimentions}</li>
                <li>Weight: {product.state.weight} g</li>
                <li>SIM: {product.state.sim}</li>
              </ul>

            </li>

            <li>
              <p>{t("product.description.display.title")}</p>

              <ul>
                <li>Type: {product.state.displayType}</li>
                <li>Size: {product.state.displaySize}</li>
                <li>Resolution: {product.state.displayResolution}</li>
              </ul>

            </li>

            <li>
              <p>{t("product.description.platform.title")}</p>

              <ul>
                <li>OS: {product.state.os}</li>
                <li>Chipset: {product.state.chipset}</li>
                <li>CPU: {product.state.cpu}</li>
                <li>GPU: {product.state.gpu}</li>
              </ul>

            </li>

            <li>
              <p>{t("product.description.memory.title")}</p>

              <ul>
                <li>RAM: {product.state.ram}</li>
                <li>Internal Memory: {product.state.internalMemory}</li>
                <li>External Memory: {product.state.externalMemory}</li>
              </ul>

            </li>

            <li>
              <p>{t("product.description.sound.title")}</p>

              <ul>

                <li>
                  {t(
                    "product.description.sound.speaker",
                    { value: product.state.speaker },
                  )}
                </li>

                <li>
                  {t(
                    "product.description.sound.jack",
                    { value: product.state.audioJack },
                  )}
                </li>

              </ul>

            </li>

          </ul>

        </Card>

        <Card As="section" className="p-4 flex flex-col gap-4">

          <div>
            <p>{t("product.add-cart.color.title")}</p>
            <ul className="flex gap-2">
              {product.state.options.colors.map(color => (
                <li key={color.code}>
                  <Button
                    variant={color.code === colorCode ? "solid" : "flat"}
                    onClick={() => setColorCode(color.code)}
                  >
                    {color.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p>{t("product.add-cart.storage.title")}</p>
            <ul className="flex gap-2">
              {product.state.options.storages.map(storage => (
                <li key={storage.code}>
                  <Button
                    variant={storage.code === storageCode ? "solid" : "flat"}
                    onClick={() => setStorageCode(storage.code)}
                  >
                    {storage.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <Button color="primary" onClick={addCurrentProductToCart}>
            {t("product.add-cart.button.content")}
          </Button>

        </Card>
      </div>

    </div>
  );
};

const App = () => {

  const [productId, setProductId] = useState("");

  return (
    <Layout onClickHome={() => setProductId("")}>
      {productId
        ? <Product id={productId} />
        : <Products onSelect={product => setProductId(product.id)} />
      }
    </Layout>
  );
};

export default App;