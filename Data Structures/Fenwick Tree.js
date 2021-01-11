
/* 
    Construction in O(n)-O(nlogn)
    Prefix Sums in O(logn)
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
        while(index<this.tree.length)
            this.tree[index]=this.upOp(this.tree[index],val),
            index+=this.rightMostSetBit(index)
    }
    //sets the value of the i-th element to be val
    pointSet=(i,val)=>{
        let oldVal=this.operation(i)-this.operation(i-1)
        this.pointUpdate(i,val-oldVal)
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
