import { useEffect, useMemo } from "react";
import { SimpleCard } from "../../components/SimpleCard/SimpleCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchBrands,
  handleGetFilterObj,
} from "../../store/reducers/ActionCreators";
import { useNavigate } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import type { IBrand } from "../../models/IBrand";

export const HomePage = () => {
    const navigate = useNavigate()
  const dipatch = useAppDispatch();
  const responsiveOptions = [
    {
      breakpoint: '2560px',
      numVisible: 5,
      numScroll: 2
    },
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];
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
const itemsTemplate = (product:IBrand) => {
  return (
    <SimpleCard key={product.id}
            title={product.name}
            onChange={(value) => navigateWithBrand(value)}/>
  )
}
  useEffect(() => {
    dipatch(fetchBrands());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="surface-ground p-3">
      <div className="flex justify-content-center gap-5">
        <div className="w-full" style={{ maxWidth: '1200px' }}>
          <Carousel 
            value={brands} 
            itemTemplate={itemsTemplate} 
            numVisible={3} 
            numScroll={1} 
            responsiveOptions={responsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
          />
        </div>
      </div>
      <div className="text-center m-5">
      <img src="/src/assets/MAHIKKO SHOP.svg"/>
      </div>
    </div>
  );
};
