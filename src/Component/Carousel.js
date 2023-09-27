import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../Sass/Main.scss"
import { RiShoppingBasketFill } from "react-icons/ri"; 
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, updateVegArr } from "./Reducer";
import { useNavigate } from "react-router-dom";




function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",background: "aliceblue"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",background: "aliceblue"}}
        onClick={onClick}
      />
    );
  }

export const MultipleItems=()=>{
    const state=useSelector(
        ({data})=>data
    )
    const x="hi"

    const dispatch=useDispatch()

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    const add=(v,i)=>{
        var obj={...v, added:!v.added, add1:!v.add1, add2:!v.add2, quantity:!v.quantity}
        let updatearr=[...state.vegArr]
        updatearr.splice(i,1,obj)
        dispatch(updateVegArr(updatearr))

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
            let modify=state.cart
            modify.splice(fndIndex,1,obj)
            dispatch(updateVegArr(modify))
        }
    }

    const minus=(v,i)=>{
        if(v.itemscount>1){
            let obj={...v,itemscount:v.itemscount-1}
            let updatearr=[...state.vegArr]
            updatearr.splice(i,1,obj)
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
            let obj={...v, added:!v.added, add1:!v.add1, add2:!v.add2, quantity:!v.quantity}
            let updatearr=[...state.vegArr]
            updatearr.splice(i,1,obj)
            dispatch(updateVegArr(updatearr))

            var fndd=state.cart.filter((val)=>{
                return v.id===val.id ? "":val
            })
            dispatch(updateCart(fndd))
        }
    }

    const plus=(v,i)=>{
        var obj={...v,itemscount:v.itemscount+1}
        let updatearr=[...state.vegArr]
        updatearr.splice(i,1,obj)
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

    const quantityIp=(e,val)=>{
        if(e.target.name==="itemsCount"){
            var newItemscount=e.target.value
            let a=[...state.vegArr]
            let b=a.findIndex((v)=>{
                return v.id===val.id
            })
            console.log(val)

            var obj={...val,itemscount:newItemscount}
            a.splice(b,1,obj)
            dispatch(updateVegArr(a))
        }
    }   

    const pageRender=useNavigate()
    const detailPageval=(v,i)=>{
        pageRender(`/cart-details?id=${v.id}`)
    }
    return (
      <section className="carousel">
        <div className="carousel-container">
            <h2 className="text-center"> Best sellers </h2>

            {state.carouselDivOne  ? 
                <Slider {...settings}>
                {state.vegArr.map((val,ind)=>{
                    return(
                        <div className="col-12 row jsutify-content-center" key={ind}>
                            <div className="col-12 position-relative">
                                <img src={val.img} width="100%" height="230px" alt="img" style={{cursor:"pointer"}} onClick={()=>detailPageval(val,ind)}/>
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
                                    <input type="number" name="itemsCount" min="1" onChange={(e)=>quantityIp(e,val)}></input>
                                </form>}
                                <div className="col-6 add-btn">
                                    {val.add1 &&<button className="backet-btn" onClick={()=>add(val,ind)}>ADD <i><RiShoppingBasketFill/></i></button>}
                                </div>
                                <div className="col-12 add-btn">
                                    {val.add2 &&
                                        <button className="itemsCount row align-item-center justify-content-between">
                                            <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>minus(val,ind)}><AiOutlineMinus/></i>
                                            <input className="col-7" type="text" value={val.itemscount} disabled/>
                                            <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>plus(val,ind)}><AiOutlinePlus/></i>
                                        </button>}
                                </div>
                            </div>
                        </div>
                    )
                })
                } 
                
            </Slider>

            :        //to check true or false
                <div className="row">
                {state.searchShow.map((val,ind)=>{
                    return(
                        <div className="col-3 row jsutify-content-center searchCard" key={ind}>
                            <div className="col-12 position-relative">
                                <img src={val.img} width="100%" height="230px" alt="img" style={{cursor:"pointer"}} onClick={()=>detailPageval(val,ind)}/>
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
                                    <input type="number" name="itemsCount" min="1" onChange={(e)=>quantityIp(e,val)}></input>
                                </form>}
                                <div className="col-6 add-btn">
                                    {val.add1 &&<button className="backet-btn" onClick={()=>add(val,ind)}>ADD <i><RiShoppingBasketFill/></i></button>}
                                </div>
                                <div className="col-12 add-btn">
                                    {val.add2 &&
                                        <button className="itemsCount row align-item-center justify-content-between">
                                            <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>minus(val,ind)}><AiOutlineMinus/></i>
                                            <input className="col-7" type="text" value={val.itemscount} disabled/>
                                            <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>plus(val,ind)}><AiOutlinePlus/></i>
                                        </button>}
                                </div>
                            </div>
                        </div>
                    )
                })
                } 
                </div>
            }
            </div>
      </section>
    );
  }
