import React from 'react';
import styles from './cartWidget.module.css'

export default function CartWidget({quantitySum}) {
    
    return (  
        <button className={`btn btn-outline-secondary ${styles.cartWidget}`} href='#'>
            <img src='/assets/cartIcon.svg' className="cartIcon" alt='Cart'/>
            <p className={(quantitySum > 0 ? `${styles.cartQuantity}` : '')}>{quantitySum}</p>
        </button>
    );
};