import React from 'react'
import Order from './Order'
import styles from './order.module.css';

export default function OrderList(props) {
  return (
    <div className={styles.orderList}>
        { props.loadingState ? <h2>Cargando ...</h2> :
        props.orders.map( i  => <Order {...i} key={i.id}/> )}
    </div>
  )
}
