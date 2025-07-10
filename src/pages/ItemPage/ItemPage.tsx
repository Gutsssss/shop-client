import { useParams } from "react-router-dom";
import { OnePageItem } from "../../components/OnePageItem/OnePageItem";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchItems,
  getOneProductFromApi,
} from "../../store/reducers/ActionCreators";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { SameItems } from "../../components/SameItems/SameItems";

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const { item, isLoading } = useAppSelector((state) => state.itemReducer);
  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      await dispatch(getOneProductFromApi(Number(id)));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchItems());
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);
  if (isLoading || !item || item.id !== Number(id)) {
    return <ProgressSpinner />;
  }
  return (
    <div>
      <OnePageItem currentItem={item!} keyItem={Number(id)} />
      <TabView>
        <TabPanel header='Same Type'>
            <SameItems category='type' value={item.typeId}/>
        </TabPanel>
        <TabPanel header='Same Brand'>
            <SameItems category='brand' value={item.brandId}/>
        </TabPanel>
      </TabView>
    </div>
  );
};
