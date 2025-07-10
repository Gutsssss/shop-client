import { Card } from "primereact/card"
import type { IShopItem } from "../../models/IShopItem"
import { Button } from "primereact/button"
import { Rating } from "primereact/rating"
import { useState } from "react"
import { NavLink } from "react-router-dom"

interface RenderItemCardHeaderProps {
  img: IShopItem['img']
}

export const ItemCard = ({name,price,rating,img,id}:IShopItem) => {
    const [ratingVal,setRatingVal] = useState(0)
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
        maxWidth: '100%',
        objectFit: 'contain'
      }}
    />
    </div>
    </NavLink>
  </div>
)
const renderItemCardFooter = () => (
  <div className="flex justify-content-between align-items-center">
    <Button outlined><i className='pi pi-shopping-cart'></i>Add to cart</Button>
  </div>
)
    return (
        <Card
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
  <div className="flex flex-column gap-3">
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
      <span className="text-2xl font-bold text-purple-500">₽{price}</span>
    </div>
  </div>
</Card>
    )
}