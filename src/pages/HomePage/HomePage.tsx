import { useEffect, useMemo } from "react";
import { SimpleCard } from "../../components/SimpleCard/SimpleCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchBrands,
  handleGetFilterObj,
} from "../../store/reducers/ActionCreators";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()
  const dipatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brandReducer);
  const options = useMemo(() => {
  return handleGetFilterObj("Brands", brands);
}, [brands]);
  const navigateWithBrand = (brandName: string) => {
  const foundBrand = options.find(elem => elem.name === brandName);
  if (foundBrand) {
    navigate('/Catalog', { state: { selectedBrand: foundBrand } });
  }
};
  useEffect(() => {
    dipatch(fetchBrands());
  }, []);
  return (
    <div>
      <div className="brands-grid">
        {brands.map((brand) => (
          <SimpleCard
            key={brand.id}
            title={brand.name}
            onChange={(value) => navigateWithBrand(value)}
          />
        ))}
      </div>
    </div>
  );
};
