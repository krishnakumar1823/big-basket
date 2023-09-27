import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "./Home"
import { Cart } from "./Cart"
import { NavCart } from "./Nav-cart"
import { CardDetails } from "./Detail-page"

export const Routing=()=>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/nav-cart" element={<NavCart/>}></Route>
                <Route path="/cart-details" element={<CardDetails/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}