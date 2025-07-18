import { useState } from "react";
import { PRODUCTS_STORAGE_KEY } from "~/consts";
import { cacheWrapper } from "~/utils/storage";
import { debounce } from "~/utils/functions";
import { t } from "~/utils/i18n";
import { getProducts } from "~/services";
import useAsync, { UseAsyncStatus } from "~/hooks/useAsync";
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

const App = () => {
  // ...
  return (
    <Layout>
      <Products />
    </Layout>
  );
};

export default App;