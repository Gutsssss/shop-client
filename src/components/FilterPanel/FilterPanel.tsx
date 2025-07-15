import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect, useMemo, useState } from 'react';
import { fetchBrands, fetchTypes, handleGetFilterObj } from '../../store/reducers/ActionCreators';
import { MultiSelect } from 'primereact/multiselect';
interface FilterPanelProps {
    category:'Types' | 'Brands',
    onChange:(value:Option[]) => void
}
export interface Option {
    name: string;
    code: string;
}
export const FilterPanel = ({category,onChange}:FilterPanelProps) => {
    const dispatch = useAppDispatch()
    const {types,selectedTypes} = useAppSelector(state => state.typeReducer)
    const {brands,selectedBrands} = useAppSelector(state => state.brandReducer)
    const [selectedItems,setSelectedItems] = useState(category === 'Types' ? selectedTypes : selectedBrands)
  const options = useMemo(() => {
        return handleGetFilterObj(category,brands,types)
    },[category,types,brands])
    const handleChange = async (e: { value: Option[] }) => {
            setSelectedItems(e.value)
            onChange(e.value)
    };
useEffect(() => {
    try {
        dispatch(fetchTypes())
        dispatch(fetchBrands())
    } catch (error) {
        console.log(error)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
    return (
        <div>
           <MultiSelect value={selectedItems} onChange={handleChange} options={options} optionLabel="name" display="chip" 
                placeholder={`Select ${category}`} maxSelectedLabels={3} className="w-full"/>
        </div>
    )
}