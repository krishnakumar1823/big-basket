import React from "react";
import { BsSearch } from "react-icons/bs"; 
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Sass/Main.scss" 


export const NavCart=()=>{ 

    const pageRender=useNavigate()
    const pagehome=()=>{ 
        pageRender("/")
    }
   

    return(
        <nav className="nav-bar">
            <div className="nav-container">
                <div className="row justify-content-around align-item-center row-padding">
                    <div className="col-3 text-center">
                        <img src={require("./Image/625388dd4a18752c97439a8e_bigbasket.png")} width="50%" height="35px" alt="logo"/>
                    </div>
                    <form className="col-5 nav-frm">
                        <input type="search" placeholder="search"></input>
                        <i><BsSearch/></i>
                    </form>
                    <div className="col-3 text-center" style={{cursor:"pointer"}}>
                        <p onClick={pagehome}><FaHome/></p>
                    </div>
                </div>
            </div>
        </nav>
    )
}