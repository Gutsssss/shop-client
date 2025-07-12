import { Card } from "primereact/card"
import type { IShopItem } from "../../models/IShopItem"
import { Button } from "primereact/button"
import { Rating } from "primereact/rating"
import { useCallback, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { addItemToBasket } from "../../store/reducers/ActionCreators"

interface RenderItemCardHeaderProps {
  img: IShopItem['img']
}

export const ItemCard = ({name,price,rating,img,id,brandId}:IShopItem) => {  
  const dispatch = useAppDispatch()
  const [ratingVal,setRatingVal] = useState(0)
  const {brands} = useAppSelector(state => state.brandReducer)
  const {user} = useAppSelector(state => state.userReducer)
    const renderItemCardHeader = ({img}: RenderItemCardHeaderProps) => (
  <div className="border-round-top-xl overflow-hidden">
    <NavLink to={`/Catalog/${id}`} >
    <div className="flex align-items-center justify-content-center" 
       style={{ height: '300px', overflow: 'hidden' }}>
    <img
      loading="lazy"
      alt="example"
      src={`${import.meta.env.VITE_APP_API_URL}${img}`}
      className="h-full"
      style={{ 
        width: 'auto',
        maxWidth: '230px',
        objectFit: 'contain'
      }}
    />
    </div>
    </NavLink>
  </div>
)
const addToBasket = () => {
    try {
      dispatch(addItemToBasket(user?.id,[{name:name}]))
    } catch (error) {
      console.log(error)
    }
  }
const brand = useCallback((id:string|number) => {
  return brands.find(elem => elem.id === id)?.name
},[brands])
const renderItemCardFooter = () => (
  <div className="flex justify-content-between align-items-center">
    <Button onClick={addToBasket} outlined label="Добавить в корзину" icon="pi pi-shopping-cart"/>
  </div>
)
  
    return (
        <Card
        style={{'border':'1px solid gray','borderRadius':'15px'}}
  header={
    <div className="border-round-top-xl overflow-hidden">
      {renderItemCardHeader({img})}
    </div>
  }
  title={<span className="text-xl font-bold text-900">{name}</span>}
  footer={
    <div className="flex justify-content-between align-items-center">
      {renderItemCardFooter()}
    </div>
  }
>
  
  <div className="flex flex-column gap-2">
    <div>
    <span>{brand(brandId)}</span>
  </div>
    <div className="flex align-items-center gap-2">
      <Rating 
        value={rating} 
        onChange={(e) => setRatingVal(Number(e.value))} 
        cancel={false} 
        className="mr-2"
      />
      <span className="font-semibold text-600">{rating}</span>
    </div>
    <div className="flex align-items-center">
      <span className="text-xl text-purple-500">₽{price}</span>
    </div>
  </div>
</Card>
    )
}