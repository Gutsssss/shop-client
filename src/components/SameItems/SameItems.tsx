import { useCallback } from "react";
import { useAppSelector } from "../../hooks/redux"
import { ItemCard } from "../ItemCard/ItemCard"

interface SameItemsProps {
  category: 'type' | 'brand';
  value: number | string;
}

export const SameItems = ({ category, value }: SameItemsProps) => {
    const {items} = useAppSelector(state => state.itemReducer)
    
    const sameItems = useCallback((category: 'type' | 'brand', value: number | string) => {
      if (!items) return [];
      const key = category === 'type' ? 'typeId' : 'brandId';
      return items.filter(item => item[key] === value);
    },[items]);
    return (
        <div>
            <div className="flex justify-content-evenly">
            {sameItems(category, value).map(item => (
                <ItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    img={item.img}
                    rating={item.rating}
                    typeId={item.typeId}
                    brandId={item.brandId}
                  />
            ))}
            </div>
        </div>
    )
}