import React, { useEffect } from "react"; 
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, updateVegArr } from "./Reducer";
import { NavCart } from "./Nav-cart";

export const Cart=()=>{
    const state=useSelector(
        ({data})=>data
    )

    const dispatch=useDispatch()


    const minus=(v,i)=>{
        if(v.itemscount>1){
            let obj={...v,itemscount:v.itemscount-1}

            var fndIndexVeg=state.vegArr.findIndex((val)=>{
                return v.id===val.id
            })
            let updatearr=[...state.vegArr]
            updatearr.splice(fndIndexVeg,1,obj)
            dispatch(updateVegArr(updatearr))

            if(state.cart.length===0){
                let pushh=[...state.cart]
                pushh[pushh.length]=obj
                dispatch(updateCart(pushh))
            }
            else{
                var fnd=state.cart.filter((val)=>{
                    return v.id===val.id
                })
                var fndIndex=state.cart.findIndex((val)=>{
                    return v.id===val.id
                })
    
                if(fnd.length===0){
                    let pushh=[...state.cart]
                    pushh[pushh.length]=obj
                    dispatch(updateCart(pushh))
                }
                else{
                    let modify=[...state.cart]
                    modify.splice(fndIndex,1,obj)
                    dispatch(updateCart(modify))
                }
            }
        }
        else{
            var fndInd=state.vegArr.findIndex((val)=>{
                return v.id===val.id
            })

            let obj={...v, added:!v.added, add1:!v.add1, add2:!v.add2, quantity:!v.quantity}
            let updatearr=[...state.vegArr]
            updatearr.splice(fndInd,1,obj)
            dispatch(updateVegArr(updatearr))

            var fndd=state.cart.filter((val)=>{
                return v.id===val.id ? "":val
            })
            dispatch(updateCart(fndd))
        }
    }

    const plus=(v,i)=>{
        var obj={...v,itemscount:v.itemscount+1}
        
        var fndIndexVeg=state.vegArr.findIndex((val)=>{
            return v.id===val.id
        })
        let updatearr=[...state.vegArr]
        updatearr.splice(fndIndexVeg,1,obj)
        dispatch(updateVegArr(updatearr))
 
        if(state.cart.length===0){
            let pushh=[...state.cart]
            pushh[pushh.length]=obj
            dispatch(updateCart(pushh))
        }
        else{
            var fnd=state.cart.filter((val)=>{
                return v.id===val.id
            })
            var fndIndex=state.cart.findIndex((val)=>{
                return v.id===val.id
            })

            if(fnd.length===0){
                let pushh=[...state.cart]
                pushh[pushh.length]=obj 
                dispatch(updateCart(pushh))
            }
            else{
                let modify=[...state.cart]
                modify.splice(fndIndex,1,obj) 
                dispatch(updateCart(modify))
            }
        }
    }

    const cancelItems=(v,i)=>{
        var fndInd=state.vegArr.findIndex((val)=>{
            return v.id===val.id
        })
        var obj={...v,itemscount:1,added:!v.added, add1:!v.add1, add2:!v.add2, quantity:!v.quantity}
        let updatearr=[...state.vegArr]
        updatearr.splice(fndInd,1,obj)
        dispatch(updateVegArr(updatearr))



        let deleteItemUpdations=[...state.cart]
        let a=deleteItemUpdations.filter((val,ind)=>{
            return v.id===val.id ? "":val
        })
        dispatch(updateCart(a))
    }

    

    const total=()=>{
        var totalAmt=document.getElementById("totalAmt")
        var total_cart=state.cart
        var totl=0
        for(var i=0;i<total_cart.length;i++){
            var calc=total_cart[i].itemscount * total_cart[i].price
            totl+=calc
        }
        totalAmt.innerHTML=totl
    }
    useEffect(()=>{
        total()
    })

    return(
    <>
    <NavCart/>
    <section className="cart">
        <div className="cart-container">
            <div className="row col-12 justify-content-center">
                {state.cart.map((val,ind)=>{
                    return(
                        <div className="col-3 row jsutify-content-center box-shadow" key={ind} style={{margin:"10px"}}>
                            <div className="col-12 position-relative">
                                <img src={val.img} width="100%" height="230px" alt="img"/>
                                <div className="position-absolute">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vVZGZhGkqbspnxWK1ACaklfKECrbFxuA6Q&usqp=CAU" alt="img" height="25px" width="30px"/>
                                </div>
                            </div>
                            <div className="col-12 content">
                                <p>Fresho</p>
                                <p>{val.name}</p>
                            </div>

                            <div className="col-12 content-grey">
                                <p>
                                    <span>MRP:<del>{val.mrp}</del>  </span>
                                    Rs.{val.itemscount*val.price}
                                </p>
                            </div>
                            <div className="col-12 row justify-content-between" style={{margin:"10px 0px"}}>
                                {val.quantity &&<form className="col-5 formm">
                                    <input type="text" value="1"></input>
                                </form>}


                            <div className="col-6 add-btn" style={{padding:"0px"}}>
                                {val.add2 &&
                                    <button className="itemsCount row align-item-center justify-content-between">
                                        <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>minus(val,ind)}><AiOutlineMinus/></i>
                                        <input className="col-7" type="text" value={val.itemscount} disabled/>
                                        <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>plus(val,ind)}><AiOutlinePlus/></i>
                                    </button>
                                }
                            </div>

                            <div className="col-5 text-end">
                                <i onClick={()=>cancelItems(val,ind)} style={{fontSize:"20px",color:"red"}}><MdOutlineCancel/></i>
                            </div>

                            </div>
                        </div>
                    )
                })}
            </div>

            <table className="col-5" style={{margin:"30px auto"}}>
                <tr>
                    <th>Product name</th>
                    <th>Quanitity</th>
                    <th>price</th>
                    
                </tr>
                {state.cart.map((val,ind)=>{
                    return(
                        <tr>
                            <td>{val.name}</td>
                            <td>{val.itemscount}</td>
                            <td>{val.itemscount*val.price}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td>Total</td>
                    <td style={{color:"red"}}>=</td>
                    <td id="totalAmt"></td>
                </tr>
            </table>
        </div>
    </section>
    </>
    )
}