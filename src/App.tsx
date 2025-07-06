import { Route, Routes } from "react-router-dom"
import { NavigationPanel } from "./Layout/NavigationPanel"
import { HomePage } from "./pages/HomePage/HomePage"
import { CartPage } from "./pages/CartPage/CartPage"
import { CatlogPage } from "./pages/CatalogPage/CatalogPage"
import { LoginPage } from "./pages/AuthPages/LoginPage"
import { RegistrationPage } from "./pages/AuthPages/RegistrationPage"

function App() {

  return (
    <>
      <NavigationPanel/>
      <Routes>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Cart" element={<CartPage/>}/>
        <Route path="/Catalog" element={<CatlogPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Registration" element={<RegistrationPage/>}/>
      </Routes>
    </>
  )
}

export default App
