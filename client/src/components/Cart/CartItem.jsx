import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import styles from './cart.module.css';

export default function CartItem(item) {

    const { removeItem, addQuantity, subtractQuantity, priceSum, setTotalPrice, cartList } = useCartContext();
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setTotalPrice(priceSum());
        setQuantity(item.quantity);
    },[cartList, quantity, item.quantity, priceSum, setTotalPrice]);

    function subtract(item){
        subtractQuantity(item);
        setQuantity(quantity>1 ? quantity-1 : quantity);
        setTotalPrice(priceSum());
    }

    function add(item){
        addQuantity(item);
        setQuantity(quantity<item.stock ? Number(quantity)+1 : quantity);
        setTotalPrice(priceSum());
    }

    function remove(item){
        removeItem(item)
    }

  return    <> 
                <div className={styles.itemCard}>
                    <div className={styles.itemTitle}>
                        <span>{item.name}</span>
                    </div>
                    
                    <div className={styles.itemDetail}>
                        <div className={styles.itemPicture}>
                            <img src={item.thumbnail} className={styles.itemPicture__Img} alt={`${item.name}`}/> 
                        </div>
                        <div>
                            <h2>{`Precio: $ ${item.price*quantity}`}</h2>

                            <div className="input-group">

                                    <button type="button" className={styles.cartItemBtn} data-type="minus" data-field="quant[1]" onClick={() => subtract(item)}>
                                        <span className="glyphicon glyphicon-minus"></span>
                                    </button>
                                    <span>Cantidad: {item.quantity}</span>
                                    <button type="button" className={styles.cartItemBtn} data-type="plus" data-field="quant[1]" onClick={() => add(item)}>
                                        <span className="glyphicon glyphicon-plus"></span>
                                    </button>

                            </div>
                        </div>
                        <div>
                            <Link to={`/detalle/${item.id}`}> 
                                <button type="button" className={`btn btn-light ${styles.detailBtn}`}>
                                    Detalle
                                </button>
                            </Link>
                            <button className="btn btn-primary" onClick={() => remove(item)}>X</button>
                            
                        </div>
                    </div>
                </div>
            </>;
}
