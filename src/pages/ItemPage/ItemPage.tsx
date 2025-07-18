import { useParams } from "react-router-dom";
import { OnePageItem } from "../../components/OnePageItem/OnePageItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createCommentFromUser,
  fetchItems,
  getCommentsFromApi,
  getOneProductFromApi,
} from "../../store/reducers/ActionCreators";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { SameItems } from "../../components/SameItems/SameItems";
import './ItemPage.css'
import { CommentCard } from "../../components/CommentCard/CommentCard";
import { CreateCommentForm } from "../../components/CreateCommentForm/CreateCommentForm";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const { item, isLoading } = useAppSelector((state) => state.itemReducer);
  const { comments, isLoading: isCommentsLoading } = useAppSelector((state) => state.commentReducer);
  const { user } = useAppSelector(state => state.userReducer);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef<Toast>(null);

  const fetchProduct = async () => {
    try {
      await dispatch(getOneProductFromApi(Number(id)));
    } catch (error) {
      showError('Ошибка загрузки товара');
      console.log(error)
    }
  };

  const getComments = async (id: number) => {
    try {
      await dispatch(getCommentsFromApi(id));
    } catch (error) {
      showError('Ошибка загрузки комментариев');
      console.log(error)
    }
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
      life: 3000
    });
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Успех',
      detail: message,
      life: 3000
    });
  };

  const handleSubmitComment = async ({ text, rating }: { text: string; rating: number }) => {
    if (!user) {
      showError('Необходимо авторизоваться');
      return;
    }

    if (!item) {
      showError('Товар не найден');
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(createCommentFromUser({
        userId: user.id!,
        itemId: item.id!,
        text,
        rating,
      }));
      showSuccess('Комментарий успешно добавлен');
      await getComments(Number(id));;
    } catch (error) {
      showError('Ошибка при отправке комментария');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(fetchItems());
    fetchProduct();
    getComments(Number(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  if (isLoading || !item || item.id !== Number(id)) {
    return <ProgressSpinner />;
  }

  return (
    <div className="container mx-auto px-4">
      <Toast ref={toast} position="top-right" />
      
      <OnePageItem currentItem={item} keyItem={Number(id)} />
      
      <TabView className="my-4">
        <TabPanel header='Same Type'>
          <SameItems category='type' value={item.typeId}/>
        </TabPanel>
        <TabPanel header='Same Brand'>
          <SameItems category='brand' value={item.brandId}/>
        </TabPanel>
      </TabView>

      <h2 className="text-center text-2xl my-6">
        {comments.length ? 'Комментарии' : 'Комментариев пока нет'}
      </h2>

      {user ? (
        <div className="max-w-2xl mx-auto mb-8">
          <CreateCommentForm 
            user={user}
            itemId={item.id}
            onSubmit={handleSubmitComment}
            loading={isSubmitting}
          />
        </div>
      ) : (
        <div className="text-center my-8">
          <p>Авторизуйтесь, чтобы оставить комментарий</p>
        </div>
      )}

      <div className="flex flex-column gap-4 mx-auto">
        {isCommentsLoading ? (
          <ProgressSpinner />
        ) : (
          comments.map(comment => (
            <CommentCard key={comment.id} comment={comment}/>
          ))
        )}
      </div>
    </div>
  );
};