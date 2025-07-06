import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../static/routes';
import type { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
export const NavigationPanel = () => {
    const navigate = useNavigate()
    const isAuth = false
  const setActiveClass = (label:string) => {
    return location.pathname === `/${label}` ? 'active-menu-item' : ''
  }
  const processedItems: MenuItem[] = menuItems.map(item => ({
    ...item,
    command: () => item.label && navigate(`/${item.label}`),
    className:setActiveClass(item.label)
  }));
  const endContent = (
    <div className="flex align-items-center gap-2">
      {isAuth ? (
        <Button 
          label="Logout" 
          icon="pi pi-sign-out" 
          onClick={() => console.log('Logout')}
          className='buttonNavigation'
          text
          severity="danger"
        />
      ) : (
        <>
          <Button 
            label="Login" 
            icon="pi pi-sign-in" 
            onClick={() => navigate('/login')}
            className='buttonNavigation'
            text
          />
        </>
      )}
    </div>
    )
    return (
        <div className="card">
            <Menubar model={processedItems} end={endContent}/>
        </div>
    )
}
        