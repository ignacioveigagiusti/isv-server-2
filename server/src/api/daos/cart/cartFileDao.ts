import FileContainer from '../../containers/fileContainer';

class CartFileDao extends FileContainer{
    constructor(){
        super('DB/fileSystem/carts.json')
    }
}

export default CartFileDao;