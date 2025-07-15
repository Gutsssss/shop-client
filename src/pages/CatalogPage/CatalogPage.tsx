import { useEffect, useMemo, useState } from "react";
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
import { getSelectedBrands } from "../../store/reducers/brandSlice";
import { getSelectedTypes } from "../../store/reducers/typeSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const CatalogPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const location = useLocation()
  const {state} = location
  const { items, isLoading } = useAppSelector((state) => state.itemReducer);
  const { selectedTypes} = useAppSelector((state) => state.typeReducer);
  const { selectedBrands} = useAppSelector((state) => state.brandReducer);
  const selectedBrandFromRoute = state?.selectedBrand;
  const [search, setSearch] = useState("");
  const searchProduct = () => {
    dispatch(searchProducts(search));
  };
  const handleTypesChange = (values: object) => {
    dispatch(getSelectedTypes(values));
  };

  const handleBrandsChange = (values: unknown[]) => {
    dispatch(getSelectedBrands(values));
    // Если очистили все бренды - сбрасываем состояние роута
    if (values.length === 0 && selectedBrandFromRoute) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  };
   useEffect(() => {
    dispatch(fetchItems());
    
    if (selectedBrandFromRoute) {
      dispatch(getSelectedBrands([selectedBrandFromRoute]));
    }
    navigate(location.pathname, { replace: true, state: {} });
  }, [dispatch, selectedBrandFromRoute, location.pathname,navigate]);
   const filteredItems = useMemo(() => {
  return items.filter(item => {
    const typeMatch = selectedTypes.length === 0 || 
      selectedTypes.some(type => type.code === item.typeId?.toString());
  
    const brandMatch = selectedBrands.length === 0 || 
      selectedBrands.some(brand => brand.code === item.brandId?.toString());
  
    return typeMatch && brandMatch;
  });
}, [items, selectedTypes, selectedBrands]);
  if (isLoading)
    return (
      <div className="text-center">
        <ProgressSpinner />
      </div>
    );
  return (
    <div className="surface-ground min-h-screen">
      <div className="grid m-auto">
        <div className="hidden md:block w-18rem min-h-screen p-3 surface-card shadow-2 sticky top-0">
          <div className="flex flex-column gap-3">
            <h3 className="m-0 mb-2">Фильтры</h3>
            <FilterPanel category="Types" onChange={handleTypesChange} />
            <FilterPanel category="Brands" onChange={handleBrandsChange} />
          </div>
        </div>

        <div className="col-12 md:col-9 lg:col-10">
          <div className="p-3 p-inputgroup border-round shadow-1 mb-3">
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <Button
              onClick={searchProduct}
              icon="pi pi-search"
              className="p-button-warning"
            />
          </div>
          {!filteredItems.length ? (
            <div className="text-center p-5">Товары не найдены</div>
          ) : (
            <div className="grid">
              {filteredItems.map((item) => (
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
