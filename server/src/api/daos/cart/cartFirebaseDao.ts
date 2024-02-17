import FirebaseContainer from '../../containers/firebaseContainer';

class CartFirebaseDao extends FirebaseContainer{
    constructor(){
        super(JSON.parse(process.env.FIREBASE_SA_KEY? process.env.FIREBASE_SA_KEY : '{}'), 'carts')
    }
}

export default CartFirebaseDao;