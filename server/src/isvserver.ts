import express from 'express';
const { Router } = express;
import fs from 'fs';
import cors from 'cors';
import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer, {
    cors:{
        origin: "*"
    }
});
app.use(cors())

const productRouter = Router();
const cartRouter = Router();

import Products from './api/products';
import Cart from './api/cart';
const productContainer = new Products('./api/products.json');
const cartContainer = new Cart('./api/carts.json');

let admin : boolean = true;

// Admin Middleware
function isAdmin(req, res, next) {
    if (!admin) res.status(403).send('Error 403: Not authorized');
    else next();
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: false }));
cartRouter.use(express.json());
cartRouter.use(express.urlencoded({ extended: false }));

// PRODUCTS

app.post('/',isAdmin, async (req, res) => {
    try {
        if( req.body.name == undefined || req.body.price === null || req.body.thumbnail == undefined || req.body.category == undefined || req.body.stock == null || req.body.name == '' || req.body.price === '' || req.body.thumbnail == '' || req.body.category == '' || req.body.stock == '' ) {
            throw 'Missing data. Product needs Name, Price, Thumbnail, Category and Stock.'
        }
        if( !admin ) throw 'Admin authentication needed';
        let timestamp = String(new Date()).slice(0,33);
        let category = req.body.category;
        let subcategory = req.body.subcategory || ' ';
        let name = req.body.name;
        let description = req.body.description || ' ';
        let price = req.body.price;
        let stock = req.body.stock;
        let thumbnail = req.body.thumbnail;
        price = parseFloat(price);
        stock = parseInt(stock);
        if(price<=0 || stock<0) throw 'Error 400: Price and stock must be positive numbers'
        const newProduct = { timestamp:timestamp, category:category, subcategory:subcategory, name:name, description:description, price:price, stock:stock, thumbnail:thumbnail};
        const savedProduct = await productContainer.save(newProduct);
        res.send(JSON.stringify(savedProduct));
    } catch (err) {
        res.status(400).send(err);
    }
})

app.post('/edit',isAdmin, async (req, res) => {
    try {
        let putId: number;
        if (req.body.id != null && req.body.id !== '') {
            putId = req.body.id;
        }
        else{
            throw 'No ID was provided';
        }
        if( !admin ) throw 'Admin authentication needed';
        const prevProduct = await productContainer.getById(putId);
        let newTimestamp = String(new Date()).slice(0,33);
        let newCategory = prevProduct.category;
        let newSubcategory = prevProduct.subcategory;
        let newName = prevProduct.name;
        let newDescription = prevProduct.description;
        let newPrice = prevProduct.price;
        let newStock = prevProduct.stock;
        let newThumbnail = prevProduct.thumbnail;
        if (typeof req.body.category === 'string' && req.body.category !== '') {
            newCategory = req.body.category.toString();
        }
        if (typeof req.body.subcategory === 'string' && req.body.subcategory !== '') {
            newSubcategory = req.body.subcategory.toString();
        }
        if (typeof req.body.name === 'string' && req.body.name !== '') {
            newName = req.body.name.toString();
        }
        if (typeof req.body.description === 'string' && req.body.description !== '') {
            newDescription = req.body.description.toString();
        }
        if (!isNaN(req.body.price) && req.body.price && req.body.price !== '') {
            newPrice = parseFloat(req.body.price);
        }
        if (!isNaN(req.body.stock) && req.body.stock && req.body.stock !== '') {
            newStock = parseInt(req.body.stock);
        }      
        if (typeof req.body.thumbnail === 'string' && req.body.thumbnail !== '') {   
            newThumbnail = req.body.thumbnail.toString();
        }
        if(newPrice<=0 || newStock<0) throw 'Error 400: Price and stock must be positive numbers'
        const newProduct = { timestamp:newTimestamp, category:newCategory, subcategory:newSubcategory, name:newName, description:newDescription, price:newPrice, stock:newStock, thumbnail:newThumbnail};
        const editProduct = await productContainer.edit(putId, newProduct).catch((err) => {
            throw err
        });
        res.send(editProduct);
    } catch (err) {
        res.status(400).send(err.message || err);
    }
});

// get all products from /api/products
productRouter.get('/', async (req, res) => {
    try {
        const allProducts = await productContainer.getAll();
        res.json(allProducts);
    } catch (err) {
        res.status(400).send(`${err}`);
    }    
});

// get one product by id from /api/products/:id
productRouter.get('/:id', async (req, res) => {
    try {
        const param = Number(req.params.id);
        const product = await productContainer.getById(param);
        res.json(product);
    } catch (err) {
        res.status(404).send(`${err}`);
    }
});

// add one product with a post method to /api/products
productRouter.post('/',isAdmin, async (req, res) => {
    try {
        if( req.body.name == undefined || req.body.price === null || req.body.thumbnail == undefined || req.body.category == undefined || req.body.stock == null || req.body.name == '' || req.body.price === '' || req.body.thumbnail == '' || req.body.category == '' || req.body.stock == '' ) {
            throw 'Missing data. Product needs Name, Price, Thumbnail, Category and Stock.'
        }
        if( !admin ) throw 'Admin authentication needed';
        let timestamp = String(new Date()).slice(0,33);
        let category = req.body.category;
        let subcategory = req.body.subcategory || ' ';
        let name = req.body.name;
        let description = req.body.description || ' ';
        let price = req.body.price;
        let stock = req.body.stock;
        let thumbnail = req.body.thumbnail;
        price = parseFloat(price);
        stock = parseInt(stock);
        if(price<=0 || stock<0) throw 'Error 400: Price and stock must be positive numbers'
        const newProduct = { timestamp:timestamp, category:category, subcategory:subcategory, name:name, description:description, price:price, stock:stock, thumbnail:thumbnail};
        const savedProduct = await productContainer.save(newProduct);
        res.send(`Producto añadido: ${JSON.stringify(savedProduct)}`);
    } catch (err) {
        res.status(400).send(`${err}`);
    }
});

// PUT method to edit a product by ID (this is the one that can be tested with postman)
productRouter.put('/:id',isAdmin, async (req, res) => {
    try {
        if( !admin ) throw 'Admin authentication needed';
        if(req.body.price && (req.body.price < 0 || isNaN(req.body.price))) {
            throw 'Price must be equal to or greater than zero.'
        }
        const param = Number(req.params.id);
        const prevProduct = await productContainer.getById(param);
        let newTimestamp = String(new Date()).slice(0,33);
        let newCategory = prevProduct.category;
        let newSubcategory = prevProduct.subcategory || '';
        let newName = prevProduct.name;
        let newDescription = prevProduct.description || '';
        let newPrice = prevProduct.price;
        let newStock = prevProduct.stock;
        let newThumbnail = prevProduct.thumbnail;
        if (typeof req.body.category === 'string' && req.body.category !== '') {
            newCategory = req.body.category.toString();
        }
        if (typeof req.body.subcategory === 'string' && req.body.subcategory !== '') {
            newSubcategory = req.body.subcategory.toString();
        }
        if (typeof req.body.name === 'string' && req.body.name !== '') {
            newName = req.body.name.toString();
        }
        if (typeof req.body.description === 'string' && req.body.description !== '') {
            newDescription = req.body.description.toString();
        }
        if (req.body.price && parseFloat(req.body.price) != null && req.body.price !== '') {
            newPrice = parseFloat(req.body.price);
        }
        if (req.body.stock && parseFloat(req.body.stock) != null && req.body.stock !== '') {
            newStock = parseInt(req.body.stock);
        }      
        if (typeof req.body.thumbnail === 'string' && req.body.thumbnail !== '') {   
            newThumbnail = req.body.thumbnail.toString();
        }
        if(newPrice<=0 || newStock<0) throw 'Error 400: Price and stock must be positive numbers'
        const newProduct = { timestamp:newTimestamp, category:newCategory, subcategory:newSubcategory, name:newName, description:newDescription, price:newPrice, stock:newStock, thumbnail:newThumbnail};
        await productContainer.edit(param, newProduct);
        res.json({id:param.toString(), ...newProduct});
    } catch (err) {
        res.status(400).send(`${err}`);
    }
});

// Delete a product by ID
productRouter.delete('/:id',isAdmin, async (req, res) => {
    try {
        if( !admin ) throw 'Admin authentication needed';
        const param = Number(req.params.id);
        await productContainer.deleteById(param);
        res.send(`producto con id: ${param} eliminado exitosamente`);
    } catch (err) {
        res.status(404).send(`${err}`);
    }
});

// CARTS

cartRouter.get('/', async (req,res) => {
    try {
        const allCarts = await cartContainer.getAll();
        res.json(allCarts);
    } catch (err) {
        res.status(400).send(`${err}`);
    }  
})

// get one cart by id from /api/cart/:id/products
cartRouter.get('/:id/products', async (req, res) => {
    try {
        const param = Number(req.params.id);
        const cart = await cartContainer.getById(param);
        res.json(cart);
    } catch (err) {
        res.status(404).send(`${err}`);
    }
});

// create cart with a post method to /api/cart
cartRouter.post('/', async (req, res) => {
    try {
        let timestamp = String(new Date()).slice(0,33);
        if (!req.body.products) {
            req.body.products = [];
        }
        const newCart = {timestamp: timestamp , products: req.body.products};
        const savedCart = await cartContainer.save(newCart);
        res.json(savedCart);
    } catch (err) {
        res.status(400).send(`${err}`);
    }
});

// Delete a cart by ID
cartRouter.delete('/:id', async (req, res) => {
    try {
        const param = Number(req.params.id);
        await cartContainer.deleteById(param);
        res.send(`carrito con id: ${param} eliminado exitosamente`);
    } catch (err) {
        res.status(404).send(`${err}`);
    }
});

// Add product to cart
cartRouter.post('/:id/products/:prod_id', async (req, res) => {
    try {
        const cartID = Number(req.params.id);
        const prodID = Number(req.params.prod_id);
        let cart = await cartContainer.getById(cartID);
        let product = await productContainer.getById(prodID);
        let quantity: number = req.body.quantity || 1;
        cart.products.push({...product, quantity: quantity}); // TO DO: Implement function that looks for existing products and modifies quantities in cart instead of adding new ones.
        let editedCart = await cartContainer.edit(cartID, cart);
        res.json(editedCart);
    } catch (err) {
        res.status(400).send(`${err}`);
    }
});

// Remove product from cart
cartRouter.delete('/:id/products/:prod_id', async (req, res) => {
    try {
        const cartID = Number(req.params.id);
        const prodID = Number(req.params.prod_id);
        let cart = await cartContainer.getById(cartID);
        let removeIndex = cart.products.map(product => product.id).indexOf(prodID);
        if ( removeIndex < 0) throw 'Product not found in cart'
        ~removeIndex && cart.products.splice(removeIndex, 1);
        let editedCart = await cartContainer.edit(cartID, cart);
        res.json(editedCart);
    } catch (err) {
        res.status(404).send(`${err}`);
    }
});

//Router
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

//Connection
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
    console.log(`Servidor inicializado en el puerto ${PORT}`)
});
httpServer.on("error", err => console.log(`Error en el servidor (500): ${err}`));

io.on('connection', async (socket) => {
    console.log('Client connected');
    const messages = JSON.parse(await fs.promises.readFile('./api/messages.json', 'utf8'));
    try {
        socket.emit('messages', messages);
    } catch (err) {
        io.sockets.emit('msgError', err.message);
    }
    let products;
    try {
        products = await productContainer.getAll();
        socket.emit('products', products);
    } catch (err) {
        io.sockets.emit('prodError', err.message);
    }
    socket.on('newMessage', async data => {
        try {
            messages.push(data);
            await fs.promises.writeFile('./api/messages.json', JSON.stringify(messages,null,2));
            io.sockets.emit('messages', messages);    
        } catch (err) {
            io.sockets.emit('msgError', err.message);
        }
    });
    socket.on('productEvent', async () => {
        try {
            products = await productContainer.getAll();
            io.sockets.emit('products', products);
        } catch (err) {
            io.sockets.emit('prodError', err.message);
        }
    });
})