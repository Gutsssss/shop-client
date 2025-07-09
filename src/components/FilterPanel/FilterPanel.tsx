import { PanelMenu } from 'primereact/panelmenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect, useMemo } from 'react';
import { fetchBrands, fetchTypes } from '../../store/reducers/ActionCreators';
import type { MenuItem } from 'primereact/menuitem';
export const FilterPanel = () => {
    const dispatch = useAppDispatch()
    const {types} = useAppSelector(state => state.typeReducer)
    const {brands} = useAppSelector(state => state.brandReducer)
    const items: MenuItem[] = useMemo(() => ([
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
    ]), [brands, types]);
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
            <PanelMenu model={items} multiple/>
        </div>
    )
}