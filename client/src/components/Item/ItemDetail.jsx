import { useCartContext } from "../../context/CartContext";
import React, {useState} from 'react';
import ItemCount from './ItemCount';
import styles from './item.module.css';
import { Link } from "react-router-dom";

export default function ItemDetail(item) {

  const [hasAdded, setHasAdded] = useState(0);
  const { addToCart } = useCartContext();

  function onAdd(itemQuantity){
    addToCart( {...item, quantity: Number(itemQuantity)} );
    setHasAdded(itemQuantity);
  }

  return <div className={styles.itemDetailCard}>
          <div className={styles.itemDetailTitle}>
            <h2>{item.name}</h2><span className={styles.itemCategory}>{item.category}</span>
          </div>
          <div className={styles.itemPictureDescription}>
            <div>
              <img src={item.thumbnail} width='200px' height='200px'  alt={`${item.name}`}/>
            </div>
            <div className={styles.itemDescription}>
              <h3>Descripción</h3>
              <p>{item.description}</p>
            </div>
          </div>
          <div>
            <h2>Precio: {`$ ${item.price}`}</h2>
          </div>
          <div className={styles.itemCounter}>
            { hasAdded === 0 ?
                <ItemCount stock={item.stock} initial='1' onAdd={onAdd}/>
              :
              <>
                <Link to='/cart'>
                  <button type="button" className={`btn btn-primary ${styles.itemDetailBtn}`}>
                    Finalizar compra
                  </button>
                </Link>
                <Link to='/'>
                <button type="button" className={`btn btn-secondary ${styles.itemDetailBtn}`}>
                  Seguir comprando
                </button>
                </Link>
              </>
            }
            
            
          </div>
        </div>;
}
