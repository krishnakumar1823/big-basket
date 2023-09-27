import { createSlice } from "@reduxjs/toolkit";
import ArrayList from "./Main.json"

export const Slice=createSlice({
    name:"BigBasket",
    initialState:{
        vegArr:ArrayList.Vegetables,
        cart:[],
        search:ArrayList.Vegetables,
        searchShow:[],
        carouselDivOne:true 
    },
    reducers:{
        updateVegArr:(state,action)=>{
            state.vegArr=action.payload
        },
        updateCart:(state,action)=>{
            state.cart=action.payload
        },
        updateDivOne:(state,action)=>{
            state.carouselDivOne=action.payload
        },
        updatesearchShow:(state,action)=>{
            state.searchShow=action.payload
        }
    }
})
export default Slice.reducer
export const {updateVegArr,updateCart,updateDivOne,updatesearchShow}=Slice.actions