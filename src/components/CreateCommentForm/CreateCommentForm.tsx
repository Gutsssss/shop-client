import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import { useState } from "react";
import type { IUser } from "../../models/IUser";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

interface CreateCommentFormProps {
    user: IUser;
    itemId: number;
    onSubmit: (options: {
        itemId: number;
        userId: number;
        text: string;
        rating: number;
    }) => void;
    loading?: boolean;
}

export const CreateCommentForm = ({ 
    user, 
    itemId, 
    onSubmit, 
    loading = false 
}: CreateCommentFormProps) => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [validationError, setValidationError] = useState('');

    const handleSubmit = () => {
        if (!text.trim() || !rating) {
            setValidationError('Заполните все обязательные поля');
            return;
        }
        
        if (text.trim().length < 10) {
            setValidationError('Комментарий должен содержать минимум 10 символов');
            return;
        }

        setValidationError('');
        onSubmit({
            itemId,
            userId: user.id!,
            text: text.trim(),
            rating: rating || 0
        });
        setText('')
        setRating(0)
    };

    return (
        <Card 
            title="Оставить отзыв" 
            className="mb-4"
        >
            <div className="flex flex-column gap-3">
                <div>
                    <label htmlFor="email" className="block mb-2">Ваш email</label>
                    <InputText 
                        id="email"
                        value={user.email} 
                        readOnly 
                        className="w-full" 
                    />
                </div>

                <div>
                    <label htmlFor="comment" className="block mb-2">
                        Ваш отзыв <span className="text-red-500">*</span>
                    </label>
                    <InputTextarea
                        id="comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={5}
                        className="w-full"
                        placeholder="Напишите ваш отзыв о товаре..."
                    />
                </div>

                <div>
                    <label className="block mb-2">
                        Оценка <span className="text-red-500">*</span>
                    </label>
                    <Rating 
                        value={rating} 
                        onChange={(e) => {
    if (e.value !== null && e.value !== undefined) {
      setRating(e.value);
    } else {
      setRating(0); // или null, в зависимости от вашей логики
    }
  }} 
                        cancel={false}
                        className="mb-2"
                    />
                </div>

                {validationError && (
                    <small className="p-error block">{validationError}</small>
                )}

                <Divider />

                <Button 
                    label="Отправить отзыв"
                    icon="pi pi-send"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                    className="w-full"
                />
            </div>
        </Card>
    );
};