import { Card } from "primereact/card"
import style from './SimpleCard.module.css'
interface SimpleCardProps {
    title:string,
    onChange:(title:string) => void
}
export const SimpleCard = ({title,onChange}:SimpleCardProps) => {
    const handleNavigate = (title:string) => {
        onChange(title)
    }
    return (
        <div onClick={() => handleNavigate(title)}>
        <Card className={style['brand-card']} title={title}/>
        </div>
    )
}