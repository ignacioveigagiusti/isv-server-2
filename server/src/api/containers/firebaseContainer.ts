class FirebaseContainer {
    
    admin
    serviceAccount
    db
    productCollection: string
    cartCollection: string

    constructor(SAKey: string, productCollection: string, cartCollection: string){
        this.admin = require('firebase-admin');
        this.serviceAccount = require(SAKey);
        this.admin.initializeApp({
            credential: this.admin.credential.cert(this.serviceAccount)
        });
        this.db = this.admin.firestore();
        this.productCollection = productCollection   
        this.cartCollection = cartCollection
    }


    async save(product) {
        try{
            const query = await this.db.collection(this.productCollection);
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            let getContent:any[] = await docs.map(doc => ( doc.data() ) ).sort((a,b) => (((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)) );
            const prevContent = getContent; 
            // Extract IDs into an array
            let indexArray:any[] = [];
            for (const i in prevContent) {
                indexArray.push(prevContent[i].id);
            }
            // By default, the new ID is the number of current IDs + 1
            let newID = indexArray.length + 1;
            // Search for a missing ID in the ID Array. If a gap is found, the new ID will be set to that number
            if (indexArray.length > 0) {
                indexArray = indexArray.sort((a,b) => a - b )
                for (let i = 0; i < indexArray.length; i++) {
                    if ( (indexArray[i] - i) != 1){
                        newID = i+1;
                        break
                    }
                }
            }
            const newProduct = {id: newID, timestamp: String(new Date()).slice(0,33), ...product};
            //KNEX
            let doc = query.doc()
            await doc.create(newProduct);
            console.log('Escritura exitosa!');
            
            return newProduct;
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async edit(productId, product) {
        try{
            const query = await this.db.collection(this.productCollection);
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            let getContent:any[] = await docs.map(doc => ( doc.data() ) ).sort((a,b) => (((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)) );
            let prevContent = getContent;
            // Variable to check if the ID exists in the list
            let IDwasFound = 0;
            for (const i in prevContent) {
                if (prevContent[i].id == productId) {
                    IDwasFound = 1;
                    prevContent[i] = { id: parseInt(productId), ...product};
                }
            }
            // Throw error if ID was not found
            if (IDwasFound == 0) throw 'ID was not found';
            //KNEX
            const docQuery = await this.db.collection(this.productCollection).where('id', '==', `${productId}`).get()
            await docQuery.update({...product});
            console.log('Escritura exitosa!');
            
            return { id: parseInt(productId), ...product}
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async getById(num) {
        try{
            const query = await this.db.collection(this.productCollection);
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            let getContent:any[] = await docs.map(doc => ( doc.data() ) ).sort((a,b) => (((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)) );
            const content = getContent; 
            // Variable to check if the ID exists in the list
            let IDwasFound = 0;
            for (const i in content) {
                if (content[i].id == num) {
                    IDwasFound = 1;
                    
                    return content[i]
                }
            }
            // Throw error if ID was not found
            if (IDwasFound == 0) throw 'ID does not exist!'
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async getAll() {
        try{
            const query = await this.db.collection(this.productCollection);
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            let getContent:any[] = await docs.map(doc => ( doc.data() ) ).sort((a,b) => (((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)) );
            // const content = JSON.parse(getContent); 
            
            return getContent
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async deleteById(num) {
        try{
            const query = await this.db.collection(this.productCollection);
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            let getContent:any[] = await docs.map(doc => ( doc.data() ) ).sort((a,b) => (((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)) );
            const prevContent = getContent; 
            const newContent:any[] = [];
            // Variable to check if the ID exists in the list
            let IDwasFound = 0;
            for (let i = 0; i < prevContent.length; i++) {
                if (prevContent[i].id != num) {
                    newContent.push(prevContent[i]);
                } 
                else {
                    if (prevContent[i].id == num) {
                        IDwasFound = 1;
                    }
                }
            }
            // Throw error if ID was not found
            if (IDwasFound == 0) throw 'ID does not exist!';
            const docQuery = await this.db.collection(this.productCollection).where('id', '==', `${num}`).get()
            await docQuery.delete();
            console.log('Escritura exitosa!');
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async deleteAll() {
        try {
            const query = await this.db.collection(this.productCollection);
            const querySnapshot = await query.get();
            let docs = querySnapshot.docs;
            await docs.delete()
            console.log('Escritura exitosa!')
            
        } catch (err) {
            throw new Error(`${err}`) 
        }
    }
}

export default FirebaseContainer;