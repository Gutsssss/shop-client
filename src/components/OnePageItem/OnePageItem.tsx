import { useEffect, useState } from "react";
import type { IShopItem } from "../../models/IShopItem";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBrands, fetchTypes } from "../../store/reducers/ActionCreators";

interface ProductProps {
  currentItem: IShopItem;
  keyItem: string | number;
}

export const OnePageItem = ({ currentItem, keyItem }: ProductProps) => {
  const dipatch = useAppDispatch();
  const [productData] = useState(currentItem);
  const { types } = useAppSelector((state) => state.typeReducer);
  const { brands } = useAppSelector((state) => state.brandReducer);
  useEffect(() => {
    dipatch(fetchTypes());
    dipatch(fetchBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyItem]);
  const getType = (id: number | string) => {
    return types.filter((elem) => elem.id === id)[0]?.name;
  };
  const getBrand = (id: number | string) => {
    return brands.filter((elem) => elem.id === id)[0]?.name;
  };
  return (
    <div
      key={keyItem}
      className="m-auto flex gap-4 justify-content-center mt-5"
    >
      <div>
        <img
          loading="lazy"
          alt="example"
          src={`${import.meta.env.VITE_APP_API_URL}${productData.img}`}
          
          style={{
            width: "500px",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
        <div>
          <h1>О товаре</h1>
          <p style={{width:500}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus dolores animi, reprehenderit quam autem perferendis
            sit sapiente assumenda quaerat voluptatum aspernatur fuga corporis,
            beatae illum distinctio facere nostrum aliquid laborum?
          </p>
        </div>
      </div>
      <div>
        <div className="flex align-items-center gap-2">
          <Rating
            value={productData.rating}
            readOnly
            cancel={false}
            className="mr-2"
          />
          <span className="font-semibold text-600">{productData.rating}</span>
        </div>
        <h3>{getBrand(productData.brandId)}</h3>
        <h3>
          <span style={{ color: "grey" }}>{getType(productData.typeId)}</span>{" "}
          {productData.name}
        </h3>
        <h1>₽{productData.price}</h1>
        <Button outlined>
          <i className="pi pi-shopping-cart"></i>Add to cart
        </Button>
      </div>
    </div>
  );
};
