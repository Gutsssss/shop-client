import { useCallback, useEffect, useState } from "react";
import type { IShopItem } from "../../models/IShopItem";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addItemToBasket, fetchBrands, fetchTypes } from "../../store/reducers/ActionCreators";
import type { IBrand } from "../../models/IBrand";
import type { IType } from "../../models/IType";

interface ProductProps {
  currentItem: IShopItem;
  keyItem: string | number;
}

export const OnePageItem = ({ currentItem, keyItem }: ProductProps) => {
  const dispatch = useAppDispatch();
  const [productData] = useState(currentItem);
  const { types } = useAppSelector((state) => state.typeReducer);
  const { brands } = useAppSelector((state) => state.brandReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const addToBasket = () => {
      try {
        dispatch(addItemToBasket(user?.id,[{name:currentItem.name}]))
      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyItem]);
  const getInfo = useCallback((category: IBrand[] | IType[], id:number | string) => {
        if (!category) return [];
        return category.filter(item => item.id === id)[0]?.name;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[types,brands]);
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
          {currentItem.info!.length > 0 ? <p style={{width:500}}>
            {currentItem.info?.[0].fullDescription}
          </p> : ('У товара пока нет описания')}
          
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
        <h3>{getInfo(brands,productData.brandId)}</h3>
        <h3>
          <span style={{ color: "grey" }}>{getInfo(types,productData.typeId)}</span>{" "}
          {productData.name}
        </h3>
        <h1>₽{productData.price}</h1>
        <Button onClick={addToBasket} outlined label="Добавить в корзину" icon="pi pi-shopping-cart"/>
      </div>
    </div>
  );
};
