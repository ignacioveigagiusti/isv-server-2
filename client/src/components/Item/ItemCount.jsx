import React, { useState } from 'react';
import styles from './item.module.css';

function ItemCount( { initial, stock, onAdd, itemCat } ) {
    const [count,setCount] = useState(initial);
    const [loadingAdd, setLoadingAdd] = useState(false);

    const countIncrease = () => {
        setCount(count<stock ? Number(count)+1 : count);
    }

    const countDecrease = () => {
        setCount(count>1 ? count-1 : count);
    }

    const addCountToCart = () => {
        setLoadingAdd(true);
        onAdd(Number(count));
        setLoadingAdd(false);
    }

    return (  
        <div className={styles.itemCount}>
            {stock > 0 ?
            <>
            <p>Cantidad</p>
            <div className="input-group">
                <span className="input-group-btn">
                    <button type="button" className="btn btn-default btn-number" data-type="minus" data-field="quant[1]" onClick={countDecrease}>
                        <span className="glyphicon glyphicon-minus"></span>
                    </button>
                </span>
                <input type="number" name="quant[1]" className="form-control input-number" value={`${count}`} readOnly/>
                <span className="input-group-btn">
                    <button type="button" className="btn btn-default btn-number" data-type="plus" data-field="quant[1]" onClick={countIncrease}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </span>
            </div>
            <button type="button" className={`btn btn-primary ${styles.addToCartBtn}`} onClick={addCountToCart}>
            {!loadingAdd ? 'Añadir' : 'Añadiendo'}
            </button>
            {itemCat !== 'servicios' ?
            <p>Stock actual: {stock}</p>
            :
            <></>
            }
            </>
            :
            <h2>Sin stock!</h2>    
            }           
        </div>
            
    );
}

export default ItemCount;