import { PanelMenu } from 'primereact/panelmenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { fetchBrands, fetchTypes } from '../../store/reducers/ActionCreators';
export const FilterPanel = () => {
    const dispatch = useAppDispatch()
    const {types} = useAppSelector(state => state.typeReducer)
    const {brands} = useAppSelector(state => state.brandReducer)
    const getFilters = () => {
    return [
        {
            label: 'Types',
            items: types.map(elem => ({
                label: `${elem.name}`,
                value: elem.id
            }))
        },
        {
            label: 'Brands',
            items: brands.map(elem => ({
                label: `${elem.name}`,
                value: elem.id
            }))
        },
        
    ];
}
useEffect(() => {
    try {
        dispatch(fetchTypes())
        dispatch(fetchBrands())
    } catch (error) {
        console.log(error)
    }
},[])
    return (
        <div>
            <PanelMenu model={getFilters()} multiple/>
        </div>
    )
}