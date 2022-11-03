import FileContainer from '../../containers/fileContainer';

class ProductFileDao extends FileContainer{
    constructor(){
        super('DB/fileSystem/products.json')
    }
}

export default ProductFileDao;