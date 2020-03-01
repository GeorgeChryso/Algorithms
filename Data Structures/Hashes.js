

// that's the hash function that returns an arbitrary
// result between 0 and size  ( thats why i have %size) 
const hash=(key,size)=>{
    let hashedKey=0

    for (let i = 0; i < key.length; i++) {
        hashedKey+=(key.charCodeAt(i))
    }

    return hashedKey%size
}

class HashTable{
    constructor(){
        this.size=4
        this.buckets=Array(this.size)

        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i]=new Map()            
        }
    }

    insert(key,value){
        //create the hashed key (index)
        let idx=hash(key,this.size)
        // save it 
        this.buckets[idx].set(key,value)
    }

    remove(key){
        let idx=hash(key,this.size)
        let deleted=this.buckets[idx].get(key)
        this.buckets[idx].delete(key)
        return deleted
    }

    search(key){
        let idx=hash(key,this.size)
       return this.buckets[idx].get(key)
    }
}

const hashTable=new HashTable()

hashTable.insert('George','awesome')
hashTable.insert('Hara','awesome')
hashTable.insert('Dimi','awesome')
hashTable.insert('Trula','awesome')


console.log( hashTable)


console.log(hashTable.search('Hara')) // returns awesme
console.log(hashTable.search('awesome')) // returns undefined
console.log('\n')
console.log('\n')
hashTable.remove('Trula')
console.log( '**deleted Trula**')
console.log('\n')
console.log( hashTable)
