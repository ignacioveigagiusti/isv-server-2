import fs from 'fs';

interface Prod {
    id: number,
    timestamp: string,
    stock: number,
    cat: string,
    description: string,
    price: number,
    name: string,
    thumbnail: string,
    category: string
}

class Products {
    
    fileToWork: string;

    constructor(fileToWork){
        this.fileToWork = fileToWork
    }
    
    async save(product) {
        try{
            let getContent = await fs.promises.readFile(`${this.fileToWork}`, 'utf8');
            if (getContent == '') {
                getContent = '[]';
            }
            const prevContent = JSON.parse(getContent); 
            // Extract IDs into an array
            let indexArray: number[] = [];
            for (const i in prevContent) {
                indexArray.push(prevContent[i].id);
            }
            // By default, the new ID is the number of current IDs + 1
            let newID: number = indexArray.length + 1;
            // Search for a missing ID in the ID Array. If a gap is found, the new ID will be set to that number
            if (indexArray.length > 0) {
                indexArray = indexArray.sort((a: any,b: any) => a - b )
                for (let i = 0; i < indexArray.length; i++) {
                    if ( (indexArray[i] - i) != 1){
                        newID = i+1;
                        break
                    }
                }
            }
            const newProduct: Prod = {id: newID, ...product};
            let newContent = prevContent
            newContent.push(newProduct);
            await newContent.sort((a: { id: number; },b: { id: number; }) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            await fs.promises.writeFile(`${this.fileToWork}`, JSON.stringify(newContent,null,2));
            console.log('Escritura exitosa!');
            return newProduct;
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async edit(productId: number, product) {
        try{
            let getContent = await fs.promises.readFile(`${this.fileToWork}`, 'utf8');
            if (getContent == '') {
                getContent = '[]';
            }
            let prevContent = JSON.parse(getContent);
            // Variable to check if the ID exists in the list
            let IDwasFound = 0;
            for (const i in prevContent) {
                if (prevContent[i].id == productId) {
                    IDwasFound = 1;
                    prevContent[i] = { id: productId, ...product};
                }
            }
            // Throw error if ID was not found
            if (IDwasFound == 0) throw 'ID was not found';
            await fs.promises.writeFile(`${this.fileToWork}`, JSON.stringify(prevContent,null,2));
            console.log('Escritura exitosa!');
            return { id: productId.toString(), ...product}
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async getById(num: number) {
        try{
            const getContent = await fs.promises.readFile(`${this.fileToWork}`, 'utf8');
            const content = JSON.parse(getContent); 
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
            const getContent = await fs.promises.readFile(`${this.fileToWork}`, 'utf-8');
            const content = JSON.parse(getContent); 
            return content
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async deleteById(num: number) {
        try{
            const getContent = await fs.promises.readFile(`${this.fileToWork}`, 'utf-8');
            const prevContent = JSON.parse(getContent); 
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
            await fs.promises.writeFile(`${this.fileToWork}`, JSON.stringify(newContent,null,2))
            console.log('Escritura exitosa!')
        }
        catch(err){
            throw new Error(`${err}`)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.fileToWork}`, '[]')
            console.log('Escritura exitosa!')
        } catch (err) {
            throw new Error(`${err}`) 
        }
    }
}

export default Products;