import SQLContainer from '../../containers/SQLContainer';
import options from '../../options/mysqlDB'

class ProductSQLDao extends SQLContainer{
    constructor(){
        super(options,'products')
    }
}

export default ProductSQLDao;