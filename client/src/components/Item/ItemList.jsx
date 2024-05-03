import React from 'react';
import Item from './Item';
import styles from './itemList.module.css'

export default function ItemList(props) {

    return  <div className={styles.itemList}>
                { props.loadingState ? <h2>Cargando ...</h2> :
                props.items.map( i  => <Item {...i} key={i.id}/> )}
            </div>;
}
