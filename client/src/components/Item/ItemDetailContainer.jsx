import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import styles from './itemListContainer.module.css'

export default function ItemDetailContainer() {
    const { itemId } = useParams()
    const [items, setItems] = useState({});
    const [loadingDetail, setLoadingDetail] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${itemId}`, {
                    method: 'GET'
        }).then(res => res.json())
        .then(res => setItems(res))
        .catch(err => alert("Ha habido un error al buscar los productos!"))
        .finally(()=> setLoadingDetail(false))
    }, [itemId]);

    return (  
        <div className='container'>
            <div className={styles.itemDetailContainer}>
                { loadingDetail ? <h2>Cargando ...</h2> :
                <div><ItemDetail {...items}/></div>
                }
            </div>
        </div>
    );
};