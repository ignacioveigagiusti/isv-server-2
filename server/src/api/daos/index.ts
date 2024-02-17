// Specifiers that can be used:
// './cart/cartFileDao';
// './cart/cartFirebaseDao';
// './cart/cartMemoryDao';
// './cart/cartMongoDao';
// './cart/cartSQLDao';
// './products/productFileDao';
// './products/productFirebaseDao';
// './products/productMemoryDao';
// './products/productMongoDao';
// './products/productSQLDao';

interface Product {
    save?: any;
    edit?: any;
    getById?: any;
    getAll?: any;
    deleteById?: any;
    deleteAll?: any
};

interface Cart {
    save?: any;
    edit?: any;
    getById?: any;
    getAll?: any;
    deleteById?: any;
    deleteAll?: any
};

const getProductModule = async () => {
    const productModuleSpecifier = './cart/cartMongoDao';
    const productModule = await import(productModuleSpecifier);
    return productModule
}

const getCartModule = async () => {
    const cartModuleSpecifier = './products/productMongoDao';
    const cartModule = await import(cartModuleSpecifier);
    return cartModule
}

let productModule:Product
let cartModule:Cart

getProductModule().then((res:Product) => {productModule=res})
getCartModule().then((res:Cart) => {cartModule=res})

export {productModule};
export {cartModule};