import { configureStore } from "@reduxjs/toolkit";
import Arrval from "./Reducer"

export const Store=configureStore({
    reducer:{
        data:Arrval
    }
})