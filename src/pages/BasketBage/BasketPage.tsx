import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getBasket, removeItemFromBasket } from "../../store/reducers/ActionCreators";
import { DataScroller } from 'primereact/datascroller';
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import type { IShopItem } from "../../models/IShopItem";
import { Toast } from "primereact/toast";

export const BasketPage = () => {
    const dispatch = useAppDispatch();
    const { basket, isLoading } = useAppSelector(state => state.basketReducer);
    const {user} = useAppSelector(state => state.userReducer)
    const baseketLength = basket?.items.length
    const toast = useRef<Toast>(null);
    const showToast = (type:'success'| 'error',summary:'Success' | 'Error',details:string) => {
        toast.current?.show({severity:type, summary:summary, detail:details, life: 3000})
    }
    const sumPrice = useCallback(() => {
  let sum = 0;
  if (basket) {
    for (const elem of basket.items) {
      if (elem.shop_item) {
        sum += +elem.shop_item.price;
      }
    }
  }
  return sum;
}, [basket]);

    const removeFromBasket = async (id:number) => {
        try {
            await dispatch(removeItemFromBasket(user?.id,id))
            showToast('success','Success','Товар успешно удален!')
        } catch (err) {   
            console.log(err)
            showToast('error','Error','Ошибка при удалении товара')
        }
    }
    useEffect(() => {
        try {
            if(user?.id) {
                dispatch(getBasket(user?.id));
            }
        } catch (error) {
            console.log(error)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);
    const itemTemplate = (item:IShopItem) => {
        return (
            <div className="col-12" key={item.id}>
                <div className="flex flex-column xl:flex-row xl:align-items-center p-4 gap-5">
                    <img 
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" 
                        src={`${import.meta.env.VITE_APP_API_URL}${item.shop_item?.img}`} 
                        alt={item.shop_item?.name}
                    />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{item.shop_item?.name}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <Rating 
                                    value={item.shop_item?.rating} 
                                    readOnly 
                                    cancel={false}
                                />
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">
                                        {item.shop_item?.type?.name || 'No type'}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-center gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">₽{item?.shop_item?.price}</span>
                            <Button icon="pi pi-trash"
                                outlined 
                                className="p-button-danger"
                                label="Убрать из корзины"
                                onClick={() =>removeFromBasket(Number(item.id))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex flex-column justify-content-center align-items-center mb-4">
                <h2>Your Basket</h2>
                {baseketLength > 0 ? (<div className="text-xl">
                    Total: ₽{sumPrice() || 0} ({basket?.totalItems || 0} items)
                </div>)
                : (null)}
                
            </div>
            {baseketLength > 0 ? (
                <DataScroller
                    value={basket.items} 
                    itemTemplate={itemTemplate} 
                    rows={5} 
                    buffer={0.4}
                    inline
                />
            ) : (
                <div className="text-center py-4">Your basket is empty</div>
            )}
        </div>
    );
};