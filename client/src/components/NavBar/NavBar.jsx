import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import CartWidget from '../CartWidget/CartWidget';
import styles from './navbar.module.css'

function NavBar() {
   
    const { cartList, quantitySum, totalPrice, totalQuantity } = useCartContext();
    const [itemQuantity, setItemQuantity] = useState('');

    useEffect(() => {
      if (cartList.length > 0){
          setItemQuantity(quantitySum());
      }
      else{
        setItemQuantity('')
      }
    },[cartList, totalQuantity, itemQuantity, totalPrice, quantitySum]);
    

    return ( 
    <div className={styles.navBarContainer}>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to='/' className="navbar-brand" >ISV Shop</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                        <NavLink to='/' className="nav-link" >Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/cat/productos' className="nav-link" >Productos</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink to='/cat/servicios' className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Servicios
                        </NavLink>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink to='/cat/servicios/instalacion' className="dropdown-item" >Instalación</NavLink>
                        <NavLink to='/cat/servicios/consultoria' className="dropdown-item" >Consultoría</NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink to='/cat/servicios/programacion' className="dropdown-item" >Programación</NavLink>
                        </div>
                    </li>
                </ul>
            </div>
            
        </nav>
        <div className={styles.cartWidget}>
            <NavLink to='/cart' ><CartWidget quantitySum={itemQuantity}/></NavLink>
        </div>
    </div>
     );
}

export default NavBar;