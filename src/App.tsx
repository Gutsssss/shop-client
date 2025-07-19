import { Route, Routes } from "react-router-dom"
import { NavigationPanel } from "./Layout/NavigationPanel"
import { HomePage } from "./pages/HomePage/HomePage"
import { BasketPage } from "./pages/BasketBage/BasketPage"
import { CatalogPage } from "./pages/CatalogPage/CatalogPage"
import { LoginPage } from "./pages/AuthPages/LoginPage"
import { RegistrationPage } from "./pages/AuthPages/RegistrationPage"
import { useAppDispatch } from "./hooks/redux"
import { useEffect } from "react"
import { check } from "./store/reducers/ActionCreators"
import { ItemPage } from "./pages/ItemPage/ItemPage"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    try {
      dispatch(check())
    }
    catch(err) {
      console.log(err)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <NavigationPanel/>
      <Routes>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Basket" element={
          <ProtectedRoute>
            <BasketPage/>
          </ProtectedRoute>
        }/>
        <Route path="/Catalog" element={<CatalogPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Registration" element={<RegistrationPage/>}/>
        <Route path="/Catalog/:id" element={<ItemPage/>}/>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App
