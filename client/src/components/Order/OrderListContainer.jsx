import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { auth } from '../../firebase/config';
import React, { useEffect, useState } from 'react'
import OrderList from './OrderList';
import styles from './order.module.css';
import StockList from '../StockList/StockList';

export default function OrderListContainer() {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [authentication, setAuthentication] = useState(false);
    const [authBtnTag, setAuthBtnTag] = useState('Ingresar');

    const db = getFirestore();

    const authenticateUser = async () => { 
        setAuthBtnTag('Cargando...')
        await auth.signInWithEmailAndPassword(username, password)
        .then(function() {
            setAuthentication(true)
        })
        .catch(function(error) {
            var errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                alert('El usuario y/o contraseña ingresados no son válidos.');
            } else {
                alert('El usuario no existe o el mail no es válido.');
            }
        });
        setAuthBtnTag('Ingresar')
    }

    const preventDefault = (i) => { i.preventDefault()}    

    useEffect(() => {
        const queryCollection = collection(db, 'orders');
        // The onSnapshot method allows for real time updates from the firestore database
        try{
            onSnapshot(queryCollection, 
            (querySnapshot) => {
            setOrders(querySnapshot.docs.map(i => ( { id: i.id, ...i.data() } )))
            }
        )}
        catch(err){
            alert("Ha habido un error al buscar las órdenes!")
        }
        finally{
            setLoading(false)
        }
    },[db]);

    useEffect(() => {
        const queryCollection = query(collection(db, 'items'), where('cat', '!=', 'servicios'));
        try{
            onSnapshot(queryCollection, 
            (querySnapshot) => {
            setItems(querySnapshot.docs.map(i => ( { id: i.id, ...i.data() } )))
            })
        }
        catch(err){
            alert("Ha habido un error al buscar los items!")
        }
        finally{
            setLoading(false)
        }
    },[db]);

    return (
        <>{authentication ?
            <div className='container'>
                <h1>Órdenes:</h1>
                <div><OrderList loadingState={loading} orders={orders} /></div>
                <h1>Manejo de Stock:</h1>
                <div><StockList items={items}/></div>
            </div>
        :
            <div className='container'>
                <h2>Ingrese su email y contraseña:</h2>
                <form className={styles.loginForm} onSubmit={preventDefault}>
                    <div className="form-group">
                        <label htmlFor="userName">Email</label>
                            <input type="text" autoComplete="username" className="form-control" id="userName" placeholder="Usuario" value={username} onInput={i => setUsername(i.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                            <input type="password" autoComplete="current-password" className="form-control" id="password" placeholder="Password" value={password} onInput={i => setPassword(i.target.value)} required/>
                    </div>
                    <button className="btn btn-primary" onClick={authenticateUser}>{authBtnTag}</button>
                </form>
            </div>
        }
        </>
    )
}
