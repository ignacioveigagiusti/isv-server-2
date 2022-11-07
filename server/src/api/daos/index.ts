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

const productModuleSpecifier = './cart/cartMongoDao';
const cartModuleSpecifier = './products/productMongoDao';
export const productModule:Product = import(productModuleSpecifier);
export const cartModule:Cart = import(cartModuleSpecifier);