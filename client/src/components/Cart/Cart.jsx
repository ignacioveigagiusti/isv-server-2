import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import styles from './cart.module.css';
import CartItem from './CartItem';

export default function Cart() {
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhoneNumber, setBuyerPhoneNumber] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [success, setSuccess] = useState(false);
  const { cartList, clearCart, totalPrice, setTotalPrice, priceSum } = useCartContext();

  function preventDefault(e){
    e.preventDefault();
  }

  async function checkStock(){
    // function that checks if the stocks of the items have changed while they were in the cartList, and modifies them if the quantity exceeds the current stock, alerting the user
    let stockOK = true
    
    try {
      const querySnapshotArray = []
      for (let j of cartList.map(i => i.id)) {
        fetch(`http://localhost:8080/api/products/${j}`, {
                    method: 'GET'
        }).then(res => res.json())
        .then(res => querySnapshotArray.push(res))
        .catch(err => alert("Ha habido un error al buscar los productos!"))
      } 
      for (let docum of querySnapshotArray) {
        let [itemInCart] = cartList.filter(i => i.id === docum.id)
        if (itemInCart.quantity > docum.stock) {
          itemInCart.quantity = docum.stock; 
          alert(`No hay stock suficiente de ${itemInCart.name}, por favor reintente con el stock actualizado.`); 
          setTotalPrice(priceSum());
          stockOK = false
        }
      }
    }
    catch (error) {
      alert('Error al revisar stock en la base de datos')
    }
    finally{
      if (stockOK) {
        checkEmail()
      }
    }
  }

  async function checkEmail(){
    // await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=36cd52b1c87043f5ac5738db568b5708&email=${buyerEmail}`)
    // .then(res => res.json())
    // .then(data => (data.is_free_email.value ? buy() : (setBuyerEmail(''), alert('ingrese un correo electrónico válido.'))))
    // .catch (err => alert('Error validando su correo electrónico.') && console.error(err))
    buy()
  }

  async function buy(){
    if (buyerName && buyerPhoneNumber && buyerEmail){

      //Order creation
      let order = {};
      order.buyer = {name: buyerName, phone: Number(buyerPhoneNumber), email: buyerEmail};
      order.items = [];
      
      const querySnapshot = []
      for (let j of cartList.map(i => i.id)) {
        fetch(`http://localhost:8080/api/products/${j}`, {
                    method: 'GET'
        }).then(res => res.json())
        .then(res => querySnapshot.push(res))
        .catch(err => alert("Ha habido un error al buscar los productos!"))
      }

      order.total = totalPrice;
      console.log(querySnapshot)
      await fetch(`http://localhost:8080/api/cart`, {
        method: 'POST',
        body: {products: querySnapshot}
      }).then(res => res.json())
      .then(docRef => {
        setOrderId(docRef.id);
      })
      .catch(error => console.error("Error adding document: ", error))
      
      setSuccess(true);

      //Stock update

      querySnapshot.forEach((i) => {
        let itemInOrder = cartList.filter(i => i.id === i.id)
        //Update stock unless it is a service
        if (i.cat !== 'servicios' || !i.cat){
          let newStock = i.stock - itemInOrder.quantity
          fetch(`http://localhost:8080/api/products/${i.id}`, {
            method: 'PUT',
            body: JSON.stringify({stock: newStock})
          }).then(res => res.json())
          .catch(err => alert("Ha habido un error al buscar los productos!"))
        }
      });

      clear()
    }
  }

  function clear(){
    clearCart()
  }

  return  <div className='container'>
            {cartList.length === 0 ? 
              <>
                { success ? 
                  <>
                  <h2>Su órden ha sido efectuada!</h2>
                  <p className={styles.orderDetail}> ID de compra: {orderId}</p>
                  </> 
                  : 
                  <h2>Su carro de compras se encuentra vacío.</h2>
                }
                <Link to='/'>
                  <button type="button" className="btn btn-primary">
                    Seguir comprando
                  </button>
                </Link>
              </>
            :
              <>
                    <h2>Su carro de compras:</h2>
                    <div className={styles.cartContainer}>
                      {cartList.map( i  => 
                      <CartItem {...i} totalPrice={totalPrice} setTotalPrice={setTotalPrice} key={i.id} />)}    
                    </div>
                    <h2>Total: $ {totalPrice}</h2>
                    <form className={styles.buyerForm} onSubmit={preventDefault}>
                      <fieldset>
                        <legend>Datos del Comprador:</legend>
                        <div className="form-group">
                          <label htmlFor="buyerName">Nombre y Apellido</label>
                          <input type="text" className="form-control" id="buyerName" placeholder="Nombre Apellido" value={buyerName} onInput={e => setBuyerName(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="buyerPhoneNumber">Teléfono</label>
                          <input type="tel" className="form-control" id="buyerPhoneNumber" name="buyerPhoneNumber" min="1" placeholder="Número de Teléfono" value={buyerPhoneNumber} onInput={e => setBuyerPhoneNumber(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="buyerEmail">Email</label>
                          <input type="email" className="form-control" id="buyerEmail" aria-describedby="emailHelp" placeholder="Enter email" value={buyerEmail} onInput={e => setBuyerEmail(e.target.value)} required/>
                        </div>
                        <button className="btn btn-primary" onClick={checkStock}>
                            Efectuar Compra
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={clear}>
                            Vaciar carro
                        </button>
                      </fieldset>
                    </form>
                     

                    <p className={styles.disclaimer}>Nota: Si adquiere servicios, nos pondremos en contacto con usted a la brevedad para efectuar la consulta necesaria. La tarifa paga sólo cubre el precio de la consulta, el resto del presupuesto se definirá a partir de la misma, dependiendo de los materiales, requerimientos y complejidad de la tarea.</p>
              </>
            }
          </div>;
}
