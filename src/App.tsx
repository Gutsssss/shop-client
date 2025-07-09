import { Route, Routes } from "react-router-dom"
import { NavigationPanel } from "./Layout/NavigationPanel"
import { HomePage } from "./pages/HomePage/HomePage"
import { CartPage } from "./pages/CartPage/CartPage"
import { CatalogPage } from "./pages/CatalogPage/CatalogPage"
import { LoginPage } from "./pages/AuthPages/LoginPage"
import { RegistrationPage } from "./pages/AuthPages/RegistrationPage"
import { useAppDispatch } from "./hooks/redux"
import { useEffect } from "react"
import { check } from "./store/reducers/ActionCreators"
import { ItemPage } from "./pages/ItemPage/ItemPage"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    try {
      dispatch(check())
    }
    catch(err) {
      console.log(err)
    }
  })
  return (
    <>
      <NavigationPanel/>
      <Routes>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Cart" element={<CartPage/>}/>
        <Route path="/Catalog" element={<CatalogPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Registration" element={<RegistrationPage/>}/>
        <Route path="/Catalog/:id" element={<ItemPage/>}/>
      </Routes>
    </>
  )
}

export default App
