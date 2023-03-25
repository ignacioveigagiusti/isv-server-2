import React from 'react'
import styles from '../Order/order.module.css';
import StockCount from './StockCount';

export default function StockList(props) {

    const changeStock = async (newStock, id) => {
        //Stock update
        await fetch(`http://localhost:8080/api/products/${id}`, {
            method:'PUT',
            body:JSON.stringify({stock: newStock})
    })
        .then(alert('Stock actualizado!'))
        .catch(err => alert('Hubo un error al actualizar el stock'))
    }

    return (
    <div className={styles.orderList}>
        {props.items.map(i =>
        <div className={styles.orderCard} key={i.id}>
            <div className={styles.orderTitle}>
                <h2>{i.name}</h2>
            </div>
            <StockCount initial={i.stock} stock='1000000' id={i.id} onAdd={changeStock}/>
        </div>
        )}
    </div>
    )
}
