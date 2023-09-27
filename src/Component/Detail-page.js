import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiShoppingBasketFill } from "react-icons/ri"; 
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import { updateCart, updateVegArr } from "./Reducer";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 


export const CardDetails=()=>{
    const[obj,setObj]=useState({})
    const[aboutArr,setAboutarr]=useState([])
    const[benefitsArr,setBenifits]=useState([])

    const[param]=useSearchParams()
    const run=()=>{
        var itemsId=param.get('id')
        let a=state.vegArr.find((val)=>{
            return val.id === itemsId
        })
        setObj(a)
        setAboutarr(a.about)
        setBenifits(a.benifits)
    }
    useEffect(()=>{
        run()
    }) 


    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    const state=useSelector(
        ({data})=>data
    )
    const dispatch=useDispatch()


    const add=(itemIdData)=>{
        var v=state.vegArr.find((val)=>{
            return val.id ===itemIdData
        })
        var i=state.vegArr.findIndex((val)=>{
            return val.id===itemIdData
        })

        var obj={...v, added:!v.added, add1:!v.add1, add2:!v.add2, quantity:!v.quantity}
        let updatearr=[...state.vegArr]
        updatearr.splice(i,1,obj)
        dispatch(updateVegArr(updatearr))
        setObj(obj)

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
            dispatch(updateVegArr(modify))
        }
    }

    const minus=(itemIdData)=>{
        var v=state.vegArr.find((val)=>{
            return val.id ===itemIdData
        })
        var i=state.vegArr.findIndex((val)=>{
            return val.id===itemIdData
        })
        if(v.itemscount>1){
            var obj={...v,itemscount:v.itemscount-1}
            let updatearr=[...state.vegArr]
            updatearr.splice(i,1,obj)
            dispatch(updateVegArr(updatearr))
            setObj(obj)

            var fndIndex=state.cart.findIndex((val)=>{
                return v.id===val.id
            })
            let modify=[...state.cart]
            modify.splice(fndIndex,1,obj)
            dispatch(updateCart(modify))
        }      
        else{
            var objj={...v, added:!v.added, add1:!v.add1, add2:!v.add2, quantity:!v.quantity}
            let updatearr=[...state.vegArr]
            updatearr.splice(i,1,objj)
            dispatch(updateVegArr(updatearr))
            setObj(objj)

            var deleteCart=state.cart.filter((val)=>{
                return v.id===val.id ? "":val
            })
            dispatch(updateCart(deleteCart))
        }
    }

    const plus=(itemIdData)=>{
        var v=state.vegArr.find((val)=>{
            return val.id ===itemIdData
        })
        var i=state.vegArr.findIndex((val)=>{
            return val.id===itemIdData
        })
        var obj={...v,itemscount:v.itemscount+1}
        let updatearr=[...state.vegArr]
        updatearr.splice(i,1,obj)
        dispatch(updateVegArr(updatearr))
        setObj(obj)




        var fndIndex=state.cart.findIndex((val)=>{
            return v.id===val.id
        })
        let modify=[...state.cart]
        modify.splice(fndIndex,1,obj)
        dispatch(updateCart(modify))
    }

    const quantityIp=(e,val)=>{
        if(e.target.name==="itemsCount"){
            var newItemscount=e.target.value
            let a=[...state.vegArr]

            let b=a.findIndex((v)=>{
                return v.id===val
            })

            let findObject=a.find((v)=>{
                return v.id===val
            })

            var obj={...findObject,itemscount:parseInt(newItemscount)}
            a.splice(b,1,obj)
            setObj(obj)
            dispatch(updateVegArr(a))
        }
    }    

    // const pageRender=useNavigate()
    // const detailPageval=(v,i)=>{
    //     pageRender(`/cart-details?id=${v.id}`)
    // }

    return(
        <>
        <Nav/>
            <section className="details-section">
                <div className="Details-container">
                    <div className="row">
                        <div className="col-12 row justify-content-between align-items-center">
                            <div className="col-5">
                                <img src={obj.img} width="100%" height="450px" alt="items-img" style={{border:"1px solid gray"}}/>
                            </div>
                            <div className="col-5">
                                <h5>{obj.name}</h5>
                                <p style={{color:"gray",fontSize:"13px",margin:"15px 0px"}}>MPR:<del> Rs:{obj.mrp}</del></p>
                                <p>Price: Rs:{obj.itemscount*obj.price}</p>

                                <div className="col-12 row justify-content-between" style={{margin:"20px 0px",padding:"0px"}}>
                                    {obj.quantity &&<form className="col-5 formm" style={{padding:"0px"}}>
                                        <input type="text" name="itemsCount" min="1" onInput={(e)=>quantityIp(e,obj.id)}></input>
                                    </form>}
                                    <div className="col-6 add-btn">
                                        {obj.add1 &&<button className="backet-btn" onClick={()=>add(obj.id)}>ADD <i><RiShoppingBasketFill/></i></button>}
                                    </div>
                                    <div className="col-12 add-btn">
                                        {obj.add2 &&
                                            <button className="itemsCount row align-item-center justify-content-between">
                                                <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>minus(obj.id)}><AiOutlineMinus/></i>
                                                <input className="col-7" type="text" value={obj.itemscount} disabled/>
                                                <i className="col-2" style={{border:"1px solid gray",padding:"0px"}} onClick={()=>plus(obj.id)}><AiOutlinePlus/></i>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12" style={{margin:"40px 0px"}}>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                                >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>About</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    vegetable  [{obj.name}]
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {aboutArr.map((val,ind)=>{
                                        return(
                                            <li style={{color:"gray",fontSize:"12px"}}>{val.details}</li>
                                        )
                                    })}
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                                >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Benefits
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}> 
                                    of {obj.name}
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {benefitsArr.map((val,ind)=>{
                                        return(
                                            <li style={{color:"gray",fontSize:"12px"}}>{val.use}</li>
                                        )
                                    })}
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>  
                    </div>
                </div>
            </section>
        </>
    )
}