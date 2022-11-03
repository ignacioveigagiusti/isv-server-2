import SQLContainer from '../../containers/SQLContainer';
import options from '../../options/mysqlDB'

class CartSQLDao extends SQLContainer{
    constructor(){
        super(options,'products')
    }
}

export default CartSQLDao;