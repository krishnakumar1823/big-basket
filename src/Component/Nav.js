import React from "react";
import { BsSearch } from "react-icons/bs";
import { SlBasketLoaded } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import "../Sass/Main.scss"
import { updateDivOne, updateVegArr, updatesearchShow } from "./Reducer";


export const Nav=()=>{ 
    const state=useSelector(
        ({data})=>data
    )

    const pageRender=useNavigate()
    const pagecard=()=>{
        pageRender("/cart")
    }

    const dispatch=useDispatch() 


    const Searchh=(e)=>{
        var a=state.search 
        var b=e.target.value
        if(b.length>0){
            dispatch(updateDivOne(false))
            var obj=[]
            var count=0
            for(var i=0;i<a.length;i++){
                count=0
                for(var j=0;j<b.length;j++){
                    var nme=a[i].name[j].toLowerCase()
                    if(nme===b[j]){
                        ++count
                    }
                } 
                if(count===b.length){
                    obj[obj.length]=a[i]
                    dispatch(updatesearchShow([...obj]))
                }
            } 
        }
        else{
            dispatch(updateDivOne(true)) 
            dispatch(updatesearchShow([]))
            dispatch(updateVegArr(state.search))
        }
    }

    return(
        <nav className="nav-bar">
            <div className="nav-container">
                <div className="row justify-content-around align-item-center row-padding">
                    <div className="col-3 text-center">
                        <img src={require("./Image/625388dd4a18752c97439a8e_bigbasket.png")} width="50%" height="35px" alt="logo"/>
                    </div>
                    <form className="col-5 nav-frm">
                        <input type="text" placeholder="search" onInput={(e)=>Searchh(e)}></input>
                        <i><BsSearch/></i>
                    </form>
                    <div className="col-3 text-center" style={{cursor:"pointer"}}>
                        <p onClick={pagecard}>Card 
                            <span><SlBasketLoaded/></span>
                            <sup className="card-available">{state.cart.length}</sup>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    )
}