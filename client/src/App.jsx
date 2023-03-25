import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/Item/ItemListContainer';
import CartContextProvider from './context/CartContext';
import ItemDetailContainer from './components/Item/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import OrderListContainer from './components/Order/OrderListContainer';
import Footer from './components/Footer/Footer';
import Chat from './components/Chat/Chat';

function App() {

  return (
    <BrowserRouter>
      <CartContextProvider>
        <div className="App">
          <NavBar/>
          <Routes>
            <Route exact path='/' element={<ItemListContainer/>} />
            <Route exact path='/cat/:itemCategory' element={<ItemListContainer/>} />
            <Route exact path='/cat/:itemCategory/:itemSubcategory' element={<ItemListContainer/>} />
            <Route exact path='/detalle/:itemId' element={<ItemDetailContainer/>} />
            <Route exact path='/cart' element={<Cart/>} />
            <Route exact path='/orders' element={<OrderListContainer/>} />
          </Routes>
          <Chat/> 
          <Footer/>
        </div>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
