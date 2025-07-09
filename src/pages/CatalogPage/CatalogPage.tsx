import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchItems,
  searchProducts,
} from "../../store/reducers/ActionCreators";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.itemReducer);
  const [search, setSearch] = useState("");
    const searchProduct = () => {
        dispatch(searchProducts(search))
    }
  useEffect(() => {
    dispatch(fetchItems())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div className="text-center"><ProgressSpinner /></div>;

  return (
    <div className="surface-ground min-h-screen">
      <div className="grid m-auto">
        <div className="col-12 md:col-3 lg:col-2 px-2">
          <div className="sticky top-0 pt-3">
            <FilterPanel />
          </div>
        </div>

        <div className="col-12 md:col-9 lg:col-10">
          <div className="p-3 p-inputgroup border-round shadow-1 mb-3">
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Keyword"
            />
            <Button onClick={searchProduct} icon="pi pi-search" className="p-button-warning" />
          </div>
          {!items.length ? (
            <div className="text-center p-5">Товары не найдены</div>
          ) : (
            <div className="grid">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2"
                >
                  <ItemCard
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    img={item.img}
                    rating={item.rating}
                    typeId={item.typeId}
                    brandId={item.brandId}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
