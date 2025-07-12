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
  const processMenuItems = (items: typeof menuItems): MenuItem[] => {
    return items.map((item) => {
      const menuItem: MenuItem = {
        ...item,
        className: item.label && setActiveClass(item.label) ? "active-menu-item" : "",
      };

      if (item.items) {
        menuItem.items = processMenuItems(item.items);
      } else if (item.label) {
        menuItem.command = () => navigate(`/${item.label}`);
      }

      return menuItem;
    });
  };
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
      <div>
      </div>
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
      <Menubar model={processMenuItems(menuItems)} end={endContent} />
    </div>
  );
};
