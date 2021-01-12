
/* 
    Construction in O(n)
    Prefix Operations in O(logn)
    Point Updates in O(logn)
*/

// REMINDER: when quering this for any index, you need to increment the querying index by one
// so for example if you want the sum [0,1] you need to write 
// FenwickTree.operation(2) 
// same goes for pointSet/pointUpdate
class FenwickTree{
    constructor(arr,operation,updateOperation){
        this.op=operation
        this.upOp=updateOperation
        //the tree will be 1 indexed, so we 
        this.tree=[null,...arr]
        //construction of the tree in O(n)
        for (let i = 1; i < this.tree.length; i++) {
            let j=i+this.rightMostSetBit(i)
            if(j<this.tree.length)
                this.tree[j]=this.op(this.tree[j],this.tree[i])            
        }
        console.log(this.tree+'')
    }
    // returns the rightmostsetbit value of the index
    rightMostSetBit=(i)=>i&(-i) 
    // gives the operation of the interval [0,index]
    operation=(index)=>{    
        let sum=0
        while(index)
            sum=this.op(sum,this.tree[index]),
            index-=this.rightMostSetBit(index)
        return sum
    }
    // operates on the ith element by  val
    pointUpdate=(index,val)=>{
        // while(index<this.tree.length)
        //     this.tree[index]=this.upOp(this.tree[index],val),
        //     index+=this.rightMostSetBit(index)
        for (index; index < this.tree.length; index += index & -index)
            this.tree[index] += val;
    }
    //sets the value of the i-th element to be val
    pointSet=(i,val)=>{
        let oldVal=this.operation(i)-this.operation(i-1)
        this.pointUpdate(i,val-oldVal)
    }

    // RANGE UPDATE AND  POINT QUERY
    // if i do this then after that only POINT queries are correct.
    // Increments the value of everything in the range [left,right], 
    // but fails to do operations on intervals. Just operation works. 
    // so operation[i]=operation[i]+val when lefT<=i<=right
    rangeUpdate=(left,right,val)=>{ 
        this.pointUpdate(left,val)
        this.pointUpdate(right+1,-val)
    }

    //  reverse of operation, only works for positive values 
    // Essentially means: find if there exists an interval [0,idx] such that Prefix[idx]=val
    findIndexWithValue=(val)=>{ 
        let idx=0,
            bitMask=1<<(Math.log2(this.tree.length)) //the leftmost set bit 
        while(bitMask){
            let midpoint=idx+bitMask
            bitMask>>=1 //halve it 
            if(midpoint>=this.tree.length)
                continue
            if(this.tree[midpoint]===val)
                return midpoint
            else if (val>this.tree[midpoint]) //NOTE: if you think there are multiple indices with same val and want to return the Biggest index with that val, switch this to >=
                idx=midpoint,
                val-=this.tree[midpoint]
        }
        if(val!=0)
            return -1
        return idx
    }
}


let A=[12,3,1,2,5,12,35,1,2,22],n=A.length
let BIT=new FenwickTree(A,(a,b)=>a+b,(a,b)=>a+b)
console.log(BIT.operation(n),A.reduce((a,c)=>a+c)) //notice that i have to use the index n if i want to refer to all the elements
console.log(BIT.operation(1))  //and 1 is the first element
BIT.pointUpdate(1,13)
console.log(BIT.operation(1))  //and 1 is the first element
BIT.pointSet(1,13)
console.log(BIT.operation(1))  //and 1 is the first element


// We can binary search on a fenwick tree to find an index with a given value
console.log(BIT.findIndexWithValue(17))
// for example, if we store frequencies, and we want to find the k-th largest element
// we can query findIndexWithValue(k)

console.log(BIT.operation(4))
BIT.rangeUpdate(2,5,2)
console.log(BIT.operation(4))


// with rangge updates+ range queries
//  construction in O(nlogn)
class FenwickTreeRURQ{
    constructor(arr,operation,updateOperation){
        let n=arr.length
        this.op=operation
        this.upOp=updateOperation
        //the tree will be 1 indexed, so we 
        this.B1=[...Array(n+1)].map(d=>0)
        this.B2=[...this.B1]
        //note, if you have no starting 
        // array, delete this to make the construction O(n)
        for (let i = 0; i < arr.length; i++) 
            this.rangeUpdate(i+1,i+1,arr[i])            
    }
    rightMostSetBit=(i)=>i&(-i) 

    // returns the prefix[0:idx]
    prefixQuery=(idx)=> this.pointQuery(idx,this.B1)*idx-this.pointQuery(idx,this.B2)

    //never use outside of the class
    pointQuery=(idx,tree=this.B1)=>{    
        let total = 0
        while (idx > 0)
            total += tree[idx],
            idx -= idx & -idx
        return total
    }
    //even for point queries, use this
    rangeQuery=(l,r)=> this.prefixQuery(r)-this.prefixQuery(l-1)

    //never use outside of the class
    pointUpdate=(tree,index,val)=>{
        while(index<=tree.length)
            tree[index]+=val,
            index+=(index&(-index))
    }

    //even for point updates, use this
    rangeUpdate=(l,r,val)=>{
        this.pointUpdate(this.B1, l, val)
        this.pointUpdate(this.B1, r+1, -val)
        this.pointUpdate(this.B2, l, val*(l-1))
        this.pointUpdate(this.B2, r+1, -val*r)
    }
}
A=[12,3,1,2,5,12,35,1,2,22]
BIT=new FenwickTreeRURQ(A,(a,b)=>a+b,(a,b)=>a+b)

console.log(`\n`)
console.log( [...Array(n)].map((d,i)=>BIT.pointQuery(i+1))+'')
console.log( [...Array(n)].map((d,i)=>BIT.prefixQuery(i+1))+'')
console.log(BIT.rangeQuery(2,3))
BIT.rangeUpdate(1,4,3)
console.log(BIT.rangeQuery(2,3))
console.log( [...Array(n)].map((d,i)=>BIT.pointQuery(i+1))+'')
console.log( [...Array(n)].map((d,i)=>BIT.prefixQuery(i+1))+'')


console.log(BIT.rangeQuery(1,1))
BIT.rangeUpdate(1,1,15)
console.log(BIT.rangeQuery(1,1))
