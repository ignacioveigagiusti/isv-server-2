import FirebaseContainer from '../../containers/firebaseContainer';

class ProductFirebaseDao extends FirebaseContainer{
    constructor(){
        super(JSON.parse(process.env.FIREBASE_SA_KEY? process.env.FIREBASE_SA_KEY : '{}'), 'products');
    }
}

export default ProductFirebaseDao;