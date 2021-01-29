
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
    rangeoperation=(l,r)=>{
        return this.operation(r)-this.operation(l-1)
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
// console.log(BIT.operation(1))  //and 1 is the first element
// BIT.pointUpdate(1,13)
// console.log(BIT.operation(1))  //and 1 is the first element
// BIT.pointSet(1,13)
// console.log(BIT.operation(1))  //and 1 is the first element

console.log(BIT.rangeoperation(2,3))

// We can binary search on a fenwick tree to find an index with a given value
console.log(BIT.findIndexWithValue(17))
// for example, if we store frequencies, and we want to find the k-th largest element
// we can query findIndexWithValue(k)

console.log(BIT.operation(4))
BIT.rangeUpdate(2,5,2)
console.log(BIT.operation(4))


// with rangge updates+ range queries
//  construction in O(nlogn)
// faster construction in the alternative solution
class FenwickTreeRURQ{
    constructor(arr,operation,updateOperation){
        let n=arr.length
        this.op=operation
        this.upOp=updateOperation
        //the tree will be 1 indexed, so we 
        this.B1=[...Array(n+3)].map(d=>0)
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

//point update, range sum query
class FenwickSimple{
    constructor(A){
        A.unshift(0)
        this.n=A.length
        this.B1=[...Array( this.n+1)].map(d=>0)
        for(let i=1;i< this.n;i++)
            this.upd(i,A[i])
    }
    lowbit=i=>i&(-i)  
    sum=(x)=>{
        let sum=0
        for(let i = x ; i > 0 ; i -= this.lowbit(i))
            sum += this.B1[i]
        return sum;
    }
    //updates the point at index x by v
    upd=(x,v)=>{
        for(let i=x;i<= this.n;i+=this.lowbit(i))
            this.B1[i]+=v 
    }
    //queries the sum for a range
    query=(l,r)=>this.sum(r)-this.sum(l-1)
}

//range update, point query
class FenwickRUPQ{
    constructor(A){
        A.unshift(0)
        let n=A.length
        this.B1=[...Array(n+1)].map(d=>0)
        for(let i=1;i<n;i++)
            this.upd(i,A[i]-A[i-1],this.B1)
    }
    lowbit=i=>i&(-i)  
    upd=(x,v)=>{
        for(let i=x;i<=n;i+=this.lowbit(i))
            this.B1[i]+=v 
    }
    //adds v to every element in the range [l,r]
    update=( l,  r,  v) =>{
        this.upd(r+1,-v)
        this.upd(l,v)
    }
    // queries the point x, and ONLY THE POINT,not the prefix SUm at that point
    query=(x)=>{
        let sum=0
        for(let i = x ; i > 0 ; i -= this.lowbit(i))
            sum += this.B1[i]
        return sum;
    }
}
console.log(`\n`)
A=[12,3,1,2,5,12,35,1,2,22]
let BB=new FenwickRUPQ(A)


//range update, range query
class alternateFenwick{
    constructor(A){
        A.unshift(0)
        let n=A.length
        this.B1=[...Array(n+1)].map(d=>0)
        this.B2=[...this.B1]
        for(let i=1;i<=n;i++)
            this.upd(i,A[i]-A[i-1],this.B1),
            this.upd(i,i*(A[i]-A[i-1]),this.B2)
    }
    lowbit=i=>i&(-i)  
    upd=(x,v,B)=>{
        for(let i=x;i<=n;i+=this.lowbit(i))
            B[i]+=v 
    }
    sum=(x,B)=>{
        let sum=0
        for(let i = x ; i > 0 ; i -= this.lowbit(i))
            sum += B[i]
        return sum;
    }
    //adds v to every element in the range [l,r]
    update=( l,  r,  v) =>{
        this.upd( r + 1, -v,this.B1); this.upd( l, v,this.B1);
        this.upd( r + 1, -(r + 1) * v,this.B2); this.upd(l, l * v,this.B2);
    }
    // queries the sum of range [l,r]
    query( l,  r) {
        return (r + 1) * this.sum( r,this.B1) - this.sum( r,this.B2) 
            - (l * this.sum( l - 1,this.B1) - this.sum( l - 1,this.B2));
    }
}
console.log(`\n`)
A=[12,3,1,2,5,12,35,1,2,22]
let B=new alternateFenwick(A)
console.log(B.query(2,5))
B.update(1,2,2)
console.log(B.query(1,3))

// 2D FENWICK TREE FOR SUBMATRIX SUMS 
class FenwickTree2D{
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




//sparse/ Implicit Fenwick Tree
// Only create nodes when you need them. especially when the size of the array is
// too high to store. 
// 
//point update, range sum query
class SparseFenwickPURQ{
    // better give a BigInt length from the get go
    constructor(length){ 
        this.n=BigInt(length)
        this.A={}
    }
    lowbit=i=>BigInt(i)&(-BigInt(i))  
    sum=(x)=>{
        x=BigInt(x)
        let sum=0
        for(let i = x ; i > 0n; i -= this.lowbit(i))
            sum += (this.A[i] ||0 )
        return sum;
    }
    //updates the point at index x by v
    pointUpdate=(x,v)=>{
        x=BigInt(x)
        x++
        for(let i=x;i<= this.n;i+=this.lowbit(i))
            this.A[i]=(this.A[i]||0)+v
    }
    //queries the sum for a range
    rangeQuery=(l,r)=>this.sum(BigInt(r))-this.sum(BigInt(l)-1n)
}


let SP=new SparseFenwickPURQ(1n<<32n)

SP.pointUpdate((1n<<32n)-1n,10)
console.log(SP.rangeQuery(0n,1n<<32n))
console.log(SP.A)

SP.pointUpdate(0,-1)
console.log(SP.rangeQuery(0n,1n<<32n))
console.log(SP.A)


// RangeUpdate -Point Query
class SparseFenwickRUPQ{
    // better give a BigInt length from the get go
    constructor(length){ 
        this.n=BigInt(length)
        this.A={}
    }
    lowbit=i=>BigInt(i)&(-BigInt(i))  
    //updates the point at index x by v
    pointUpdate=(x,v)=>{
        x=BigInt(x)+1n
        for(let i=x;i<= this.n;i+=this.lowbit(i))
            this.A[i]=(this.A[i]||0)+v
    }
    rangeUpdate=(l,r,val)=>{
        this.pointUpdate(l,val)
        this.pointUpdate(r+1,-val)
    }
    pointQuery=(x)=>{
        x=BigInt(x)+1n
        let sum=0
        while( x>0n && this.A[x]!==undefined)
            sum += (this.A[x] ||0 ),
            x -= this.lowbit(x)
        return sum;
    }
}

// RangeUpdate -Range Query
class SparseFenwickRURQ{
    constructor(length){
        this.n=length
        this.B1={},this.B2={}
    }
    lowbit=i=>i&(-i)  

    upd=(x,v,B)=>{
        for(let i=x;i<=n;i+=this.lowbit(i))
            B[i]= (B[i] ||0) +v 
    }
    sum=(x,B)=>{

        let sum=0
        for(let i = x ; i > 0 ; i -= this.lowbit(i))
            sum =sum+ (B[i] ||0)
        return sum;
    }
    //adds v to every element in the range [l,r]
    rangeUpdate=( l,  r,  v) =>{
        console.log()
        this.upd( r + 1, -v,this.B1); this.upd( l, v,this.B1);
        this.upd( r + 1, -(r + 1) * v,this.B2); this.upd(l, l * v,this.B2);
    }
    // queries the sum of range [l,r]
    rangeQuery( l,  r) {
        return (r + 1) * this.sum( r,this.B1) - this.sum( r,this.B2) 
            - (l * this.sum( l - 1,this.B1) - this.sum( l - 1,this.B2));
    }
}

let R=new SparseFenwickRURQ(1<<20)
R.rangeUpdate(1,10,20)
R.rangeUpdate(11,11,1)
console.log(R.rangeQuery(1,13))