import { Card } from "primereact/card"
import type { IComment } from "../../models/IComment"
import { Rating } from "primereact/rating"

interface CommentCardProps {
    comment:IComment
}

export const CommentCard = ({comment}:CommentCardProps) => {
    return (
        <Card style={{margin:20}} title={comment.user.email}>
            <p>{comment.text}</p>
            <Rating value={comment.rating} readOnly cancel={false} />
        </Card>
    )
}