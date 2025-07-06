import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { fetchItems } from "../../store/reducers/ActionCreators"
import { ItemCard } from "../../components/ItemCard/ItemCard"

export const CatlogPage = () => {
    const dispatch = useAppDispatch()
    const {items} = useAppSelector((state) => state.itemReducer)
    
    useEffect(() => {
        dispatch(fetchItems())
    },[])
    return (
        <div className="grid mt-2 m-auto">
  {items.map((item) => (
    <div key={item.id} className="col-12 md:col-6 lg:col-3">
      <ItemCard 
              name={item.name}
              price={item.price}
              img={item.img}
              rating={item.rating} typeId={""} brandId={""}      />
    </div>
  ))}
</div>
    )
}