import React, { useState } from 'react';
import styles from '../Item/item.module.css';

function StockCount( { initial, stock, id, onAdd } ) {
    const [count,setCount] = useState(initial);
    const [loadingAdd, setLoadingAdd] = useState(false);

    const countIncrease = () => {
        setCount(count<stock ? Number(count)+1 : count);
    }

    const countDecrease = () => {
        setCount(count>0 ? count-1 : count);
    }

    const addCountToStock = () => {
        setLoadingAdd(true);
        onAdd(Number(count), id);
        setLoadingAdd(false);
    }

    return (  
        <div className={styles.itemCount}>
            <p>Stock Actual: {initial}</p>
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
            <button type="button" className={`btn btn-primary ${styles.addToCartBtn}`} onClick={addCountToStock}>
                {!loadingAdd ? 'Modificar' : 'Modificando'}
            </button>
        </div>
            
    );
}

export default StockCount;