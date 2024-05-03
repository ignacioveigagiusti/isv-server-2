import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import styles from './itemListContainer.module.css'

export default function ItemListContainer() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listTitle, setListTitle] = useState('Productos y Servicios'); 

    const { itemCategory } = useParams();
    const { itemSubcategory } = useParams();

    useEffect(() => {

        //Filter by cat or subcategory from navbar routing
        if (itemCategory) {
            if(itemSubcategory){
                fetch('http://localhost:8080/api/products', {
                    method: 'GET'
                }).then(res => res.json())
                .then(res => setItems(res.map(i => ( i ) ).filter(j => {return j.subcategory === itemSubcategory}).sort((a,b) => (((a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0)) )))
                .catch(err => alert("Ha habido un error al buscar los productos!"))
                .finally(()=> setLoading(false)) 
            }else{
                fetch('http://localhost:8080/api/products', {
                    method: 'GET'
                }).then(res => res.json())
                .then(res => setItems(res.map(i => ( i ) ).filter(j => {return j.cat === itemCategory}).sort((a,b) => (((a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0)) )))
                .catch(err => alert("Ha habido un error al buscar los productos!"))
                .finally(()=> setLoading(false))
            }
        }
        else{
        fetch('http://localhost:8080/api/products', {
            method: 'GET'
        }).then(res => res.json())
        .then(res => setItems(res.map(i => ( i ) ).sort((a,b) => (a.cat > b.cat) ? 1 : (b.cat > a.cat) ? -1 : ((a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0)) ))
        .catch(err => alert("Ha habido un error al buscar los productos!"))
        .finally(()=> setLoading(false))
        }
        // Changing title dynamically
        if (itemCategory === 'productos') {
            setListTitle('Productos');
        }
        else if (itemCategory === 'servicios') {
            setListTitle('Servicios');
        }
        else {
            setListTitle('Productos y Servicios');
        }
    }, [itemCategory, itemSubcategory]);

    return (  
        <div className='container'>
            <h1>Bienvenido a ISV Shop!</h1>
            <h2>{listTitle}</h2>
            <div className={styles.itemDetailContainer}>
                <div><ItemList loadingState={loading} items={items}/></div>
            </div>
        </div>
    );
};