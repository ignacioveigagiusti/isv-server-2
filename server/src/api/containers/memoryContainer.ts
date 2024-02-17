class MemoryContainer {
    
    memoryArray:any[];

    constructor(memoryArray:any[]){
        this.memoryArray = memoryArray
    }
    
    async save(cart) {
        try{
            let getContent = this.memoryArray;
            const prevContent = getContent; 
            // Extract IDs into an array
            let indexArray: number[] = [];
            for (const i in prevContent) {
                indexArray.push(prevContent[i].id);
            }
            // By default, the new ID is the number of current IDs + 1
            let newID = indexArray.length + 1;
            // Search for a missing ID in the ID Array. If a gap is found, the new ID will be set to that number
            if (indexArray.length > 0) {
                indexArray = indexArray.sort((a: any,b: any) => a - b )
                for (let i = 0; i < indexArray.length; i++) {
                    if ((indexArray[i] - i) != 1){
                        newID = i+1;
                        break
                    }
                }
            }
            const newCart = {id: newID, ...cart};
            let newContent = prevContent
            newContent.push(newCart);
            await newContent.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            this.memoryArray = newContent;
            console.log('Succesful write!');
            return newCart.id;
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async editCart(cart) {
        try{
            let getContent = this.memoryArray;
            let prevContent = getContent;
            // Variable to check if the ID exists in the list
            let IDwasFound = 0;
            for (const i in prevContent) {
                if (prevContent[i].id == cart.id) {
                    IDwasFound = 1;
                    prevContent[i] = cart;
                }
            }
            // Throw error if ID was not found
            if (IDwasFound == 0) throw 'ID was not found';
            this.memoryArray = prevContent;
            console.log('Succesful write!');
            return cart;
        }
        catch(err){
            throw new Error(`${err}`);
        }
    }

    async editProduct(productId, product) {
        try{
            let getContent = this.memoryArray;
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
            this.memoryArray = prevContent;
            console.log('Escritura exitosa!');
            return { id: parseInt(productId), ...product}
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async getById(num) {
        try{
            const getContent = this.memoryArray;
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
            const getContent = this.memoryArray;
            const content = getContent; 
            return content
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async deleteById(num) {
        try{
            const getContent = this.memoryArray;
            const prevContent = getContent; 
            const newContent: any[] = [];
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
            this.memoryArray = newContent;
            console.log('Succesful write!')
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async deleteAll() {
        try {
            this.memoryArray = [];
            console.log('Succesful write!')
        } catch (err) {
            throw new Error(`${err}`) 
        }
    }    
}

export default MemoryContainer;