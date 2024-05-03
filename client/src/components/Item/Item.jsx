import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import styles from './item.module.css';
import { useCartContext } from '../../context/CartContext';

export default function Item(item) {

  const { addToCart } = useCartContext()

  function onAdd(itemQuantity){
    addToCart( {...item, quantity: itemQuantity} );
  }
  

  return <div className={styles.itemCard}>
          <div className={styles.itemTitle}>
            <span>{item.name}</span><span>{item.category}</span>
          </div>
          <div className={styles.itemPicture}>
            <img src={item.thumbnail} width='200px' height='200px'  alt={`${item.name}`}/>
          </div>
          <div className={styles.itemDetail}>
            <h2>{`$ ${item.price}`}</h2>
            <Link to={`/detalle/${item.id}`}> 
              <button type="button" className="btn btn-secondary">
                Detalle
              </button>
            </Link>
          </div>
          <div className={styles.itemCounter}>
            <ItemCount stock={item.stock} initial='1' onAdd={onAdd} itemCat={item.cat}/>
          </div>
        </div>;
}
