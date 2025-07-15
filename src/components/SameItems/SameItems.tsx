import { useCallback } from "react";
import { useAppSelector } from "../../hooks/redux";
import { ItemCard } from "../ItemCard/ItemCard";
import { Carousel } from "primereact/carousel";

interface SameItemsProps {
  category: 'type' | 'brand';
  value: number | string;
}

export const SameItems = ({ category, value }: SameItemsProps) => {
  const { items } = useAppSelector(state => state.itemReducer);
  
  const sameItems = useCallback((category: 'type' | 'brand', value: number | string) => {
    if (!items) return [];
    const key = category === 'type' ? 'typeId' : 'brandId';
    return items.filter(item => item[key] === value);
  }, [items]);

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

  const itemTemplate = (item: typeof items[0]) => {
    return (
      <div className="p-2">
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
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={sameItems(category, value)}
        numVisible={4} 
        numScroll={2} 
        responsiveOptions={responsiveOptions}
        itemTemplate={itemTemplate}
        circular 
      />
    </div>
  );
};