
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";



export default function Navbar() {

  const [isActive, setIsActive]=useState(true)

  const windowWidth = window.innerWidth;

  const InWidth = () => {
    if(windowWidth<999){
      setIsActive(true)
    }
  }


  return (
<div className="navBar">
    <div onClick={()=>setIsActive(!isActive)}  className="hamburger" >
      <div className="menu-bar">
        <div className="uno" />
        <div className="dos" />
        <div className="tres"/>
      </div>


      <p className='menuIcons'>{isActive ? 'MENU' : '✘'}</p>

    </div>

    <div className={isActive ? "menu " : "menu display"} onClick={InWidth}>
    

        <NavLink to="/adminProvimex"             > QR      </NavLink>
        <NavLink to="/adminProvimex/inventario"   > Inventario </NavLink>
      {/*  <NavLink to="/adminPolanco/ordersHillo"  > Ordenes Hermosillo</NavLink>

        <NavLink to="/adminPolanco/ordersSanCarlos"> Ordenes San Carlos</NavLink>
        <NavLink to="/adminPolanco/productosBajos"   > Stock Bajo Hillo</NavLink>
        <NavLink to="/adminPolanco/productosBajosSanCarlos"   > Stock Bajo SC</NavLink>*/}
        <NavLink to="/adminProvimex/entregas"> Entregas</NavLink>
     
    </div>  

      </div>
  );
}





/*  */