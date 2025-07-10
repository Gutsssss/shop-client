import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../static/routes";
import type { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logoutAndRemoveToken } from "../store/reducers/ActionCreators";
export const NavigationPanel = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const {isAuth} = useAppSelector(state => state.userReducer)
  const setActiveClass = (label: string) => {
    return location.pathname === `/${label}` ? "active-menu-item" : "";
  };
  const processedItems: MenuItem[] = menuItems.map((item) => ({
    ...item,
    command: () => item.label && navigate(`/${item.label}`),
    className: setActiveClass(item.label),
  }));
  const handleLogout = () => {
    try {
      dispatch(logoutAndRemoveToken())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  const endContent = (
    <div className="flex align-items-center gap-2">
      {isAuth ? (
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          onClick={() => handleLogout()}
          className="buttonNavigation"
          text
          severity="danger"
        />
      ) : (
        <>
          <Button
            label="Login"
            icon="pi pi-sign-in"
            onClick={() => navigate("/login")}
            className="buttonNavigation"
            text
          />
        </>
      )}
    </div>
  );
  return (
    <div className="card">
      <Menubar model={processedItems} end={endContent} />
    </div>
  );
};
