import React, { useState } from 'react';
import styles from './order.module.css';

export default function Order(order) {
    const [loadingRemoveOrder, setLoadingRemoveOrder] = useState(false);

    async function removeOrder(orderId) {
        setLoadingRemoveOrder(true)
        try{
            await fetch(`http://localhost:8080/api/cart/${orderId}`,{
                method: 'DELETE'
            })
        }
        catch{
            alert("Ha habido un error al eliminar la órden!")
            setLoadingRemoveOrder(false)
        }
        finally{
            setLoadingRemoveOrder(false)
        }

    }

  return (
    <div className={styles.orderCard}>
        <div className={styles.orderTitle}>
            <h2>Órden: {order.id}</h2>
        </div>
        {/* <div className={styles.buyerDetail}>
            <h2>Comprador:</h2>
            <div>Nombre: {order.buyer.name}</div>
            <div>Teléfono: {order.buyer.phone}</div>
            <div>Email: {order.buyer.email}</div>
        </div> */}
        <div className={styles.items}>
            <h2>Productos/Servicios:</h2>
            {order.products.map(i => 
            <React.Fragment key={i.id}>
            <div className={styles.productTitle}>{i.name}</div>
            {/* <div>Cantidad: {i.quantity}</div> */}
            <div>Precio Unitario: ${i.price}</div>
            </React.Fragment>)}
        </div>
        {/* <div className={styles.orderDetail}>
            <h2>{`Total: $ ${order.total}`}</h2>
        </div> */}
        <button type="button" className="btn btn-primary" onClick={() => removeOrder(order.id)}>
            {loadingRemoveOrder ? 'Eliminando...' : 'Eliminar órden'}
        </button>
    </div>
  )
}
