



// given an array A=[..]
// determine the answer for some question for a given range


// object based segment trees
class SegTree{
    constructor(l,r,A,operation){
        this.leftmost=l,this.rightmost=r,this.sum
        //change these for different operations
        this.operation=operation,this.sentinel=0
        //create the subtrees
        if(l==r)//leaf
            this.sum=A[l]
        else{
            let mid=l+((r-l)>>1)
            this.leftChild=new SegTree(this.leftmost,mid,A,operation)
            this.rightChild=new SegTree(1+mid,this.rightmost,A,operation)
            this.recalc()
        }
    }

    recalc(){
        if(this.leftmost!==this.rightmost)
            this.sum=this.operation(this.leftChild.sum,this.rightChild.sum)
    }
    pointUpdate(index,newVal){
        if(this.leftmost==this.rightmost)
            return this.sum=newVal
        if(index<=this.leftChild.rightmost)
            this.leftChild.pointUpdate(index,newVal)
        else
            this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }

    rangeOperation=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost)
            return this.sentinel
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.sum
        // partially covered
        return this.operation(this.leftChild.rangeOperation(left,right),this.rightChild.rangeOperation(left,right))
    }
}


let addition=(a,b)=>a+b

let A=[1,12,1,73,1,33,12],n=A.length
let st=new SegTree(0,n-1,A,addition)
console.log(A.reduce(addition))
// console.log(st.rightChild)
// // console.log(st.rangeSum(0,3))
//  console.log(st.rangeOperation(1,5))
//  st.pointUpdate(1,50)
//  console.log(st.rangeOperation(0,1))

 class SegTreeLazyPropagation{
    constructor(l,r,A,operation=null,rangeUpdateOperation=null,Sentinel=0,lazypropSentinel=0){
        this.leftmost=l,this.rightmost=r,this.sum
        //change these for different operations
        this.operation=operation,this.sentinel=Sentinel

        //lazy propagation-rangeUpdate- properties
        this.rangeUpdateOperation=rangeUpdateOperation
        this.delta=null
        this.deltaSentinel=lazypropSentinel

        //create the subtrees
        if(l==r)//leaf
            this.sum=A[l]
        else{
            let mid=l+((r-l)>>1)
            this.leftChild=new SegTreeLazyPropagation(this.leftmost,mid,A,operation,rangeUpdateOperation,Sentinel,lazypropSentinel)
            this.rightChild=new SegTreeLazyPropagation(1+mid,this.rightmost,A,operation,rangeUpdateOperation,Sentinel,lazypropSentinel)
            this.recalc()
        }
    }

    recalc(){
        if(this.leftmost!==this.rightmost)
            this.sum=this.operation(this.leftChild.sum,this.rightChild.sum)
    }
    pointUpdate(index,newVal){
        if(this.leftmost==this.rightmost)
            return this.sum=newVal
        if(index<=this.leftChild.rightmost)
            this.leftChild.pointUpdate(index,newVal)
        else
            this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }
    rangeUpdate(L,R,val){
        if(this.delta){
            this.sum=this.rangeUpdateOperation(this.sum,this.delta*(-this.leftmost+this.rightmost+1))
            if(this.leftmost!==this.rightmost)//propagate the change to its children
                this.leftChild.delta+=this.delta,
                this.rightChild.delta+=this.delta
            this.delta=null
        }
        if(L>this.rightmost||R<this.leftmost)
            return
        if(L<=this.leftmost&&this.rightmost<=R){
            this.sum=this.rangeUpdateOperation(this.sum,val*(-this.leftmost+this.rightmost+1))
            if(this.leftmost!==this.rightmost)//propagate the change to its children
                this.leftChild.delta+=val,
                this.rightChild.delta+=val
            return 
        }

        this.leftChild.rangeUpdate(L,R,val)
        this.rightChild.rangeUpdate(L,R,val)
        this.sum=this.operation(this.leftChild.sum, this.rightChild.sum)
    }
    rangeOperation=(left,right)=>{ //inclusive
        if(this.delta){
            this.sum=this.rangeUpdateOperation(this.sum,this.delta*(-this.leftmost+this.rightmost+1))
            if(this.leftmost!==this.rightmost)//propagate the change to its children
                this.leftChild.delta=+this.delta,
                this.rightChild.delta+=this.delta
            else 
                this.sum+=this.delta
            this.delta=null
        }
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost)
            return this.sentinel
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.sum
        
        // partially covered
        return this.operation(this.leftChild.rangeOperation(left,right),this.rightChild.rangeOperation(left,right))
    }
}

let stlp=new SegTreeLazyPropagation(0,n-1,A,addition,addition,0,0)
console.log(stlp.rangeOperation(0,n-1))
stlp.rangeUpdate(0,2,1)
stlp.rangeUpdate(2,2,6)
stlp.rangeUpdate(2,3,1)
console.log(stlp.delta)
console.log(stlp.rangeOperation(0,n-1))
console.log(stlp.delta)




class ArraySegTree{
    // Array to perfrom operations on, range query operation, PointUpdate operation
    constructor(A,op=(a,b)=>a+b,upOp=(a,b)=>a+b,opSentinel=0){
        this.n=A.length,this.t=[...Array(4*this.n+1)],this.op=op,this.upOp=upOp,this.opSentinel=opSentinel
        //root's idx =1
        this.build(A,1,0,this.n-1)
    }
    left=x=>this.t[2*x];right=x=>this.t[2*x+1]
    build(A,idx,left,right){
        if(left==right)
            return this.t[idx]=A[left]
        let mid=(left+right)>>1
        this.build(A,2*idx,left,mid) //go left
        this.build(A,2*idx+1,mid+1,right) //go right
        this.t[idx]=this.op(this.left(idx),this.right(idx)) //merge
    }
    //just specify l,r on actual queries
    //Here queries use the actul indices of the starting array A, so rangeQuery(0,n-1) returns the whole array
    rangeQuery=(l,r,tl=0,tr=this.n-1,idx=1)=>{
        if(l>r)
            return this.opSentinel
        if(l===tl&&r===tr)
            return this.t[idx]
        let mid=(tl+tr)>>1
        return this.op(
                this.rangeQuery(l,Math.min(r,mid),tl,mid,idx*2),
                this.rangeQuery(Math.max(l,mid+1),r,mid+1,tr,idx*2+1)
        ) 
    }
    //just specify arrIdx,newVal on actual pointUpdates
    pointUpdate=(arrIdx,newVal,tl=0,tr=this.n-1,idx=1)=>{
        if(tl==tr)
            return this.t[idx]=this.upOp(this.t[idx],newVal)
        let mid=(tl+tr)>>1
        if(arrIdx<=mid)
            this.pointUpdate(arrIdx,newVal,tl,mid,2*idx)
        else
            this.pointUpdate(arrIdx,newVal,mid+1,tr,2*idx+1)
        this.t[idx]=this.op(this.left(idx),this.right(idx))
    }
}

 A=[2,1,3,5,2,2,12]
 S=new ArraySegTree(A)
 S.upOp=(a,b)=>a+b
console.log(S.rangeQuery(0,0))
S.pointUpdate(0,2)
console.log(S.rangeQuery(0,0))


//RANGE UPDATES,POINT QUERIES + LAZY PROPAGATION
class ArraySegTreeRUPQ{
    // Array to perfrom operations on, range query operation, PointUpdate operation
    constructor(A,op=(a,b)=>a+b,upOp=(a,b)=>a+b,opSentinel=0){
        this.n=A.length,this.t=[...Array(4*this.n+1)],this.op=op,this.upOp=upOp,this.opSentinel=opSentinel,
        this.mustChange=[...this.t]
        //root's idx =1
        this.build(A,1,0,this.n-1)
    }
    left=x=>this.t[2*x];right=x=>this.t[2*x+1]
    propagate=i=>{
        if(this.mustChange[i])
            this.t[2*i]=this.t[2*i+1]=this.t[i],
            this.mustChange[2*i]=this.mustChange[2*i+1]=true,
            this.mustChange[i]=false
    }
    build(A,idx,left,right){
        if(left==right)
            return this.t[idx]=A[left]
        let mid=(left+right)>>1
        this.build(A,2*idx,left,mid) //go left
        this.build(A,2*idx+1,mid+1,right) //go right
        this.t[idx]=this.opSentinel
    }
     //just specify l,r,newVal on actual rangeUpdate
     rangeUpdate=(l,r,newVal,tl=0,tr=this.n-1,idx=1)=>{
        if(l>r)
            return 
        if(l===tl&&r===tr)
            this.mustChange[idx]=true,
            this.t[idx]=this.upOp(this.t[idx],newVal)
        else{
            this.propagate(idx)
            let mid=(tl+tr)>>1
            this.rangeUpdate(l,Math.min(mid,r),newVal,tl,mid,2*idx)
            this.rangeUpdate(Math.max(l,mid+1),r,newVal,mid+1,tr,2*idx+1)
        }
    }
    //visit the actual point in O(logn), and store on everything that's not of length 1, 
    //the val i m supposed to add to every sub interval of tl,tr
    pointQuery=(Arrindex,tl=0,tr=this.n-1,idx=1)=>{ 
        if(tr===tl) 
            return this.t[idx]
        this.propagate(idx)
        let mid=(tl+tr)>>1
        if (Arrindex<=mid) 
            return this.pointQuery(Arrindex,tl,mid, 2*idx)
        else 
            return this.pointQuery(Arrindex,mid+1,tr,2*idx+1)
    }
   
}

A=[2,1,3,5,2,2,12]
S=new ArraySegTreeRUPQ(A)

console.log(S.pointQuery(1))
S.rangeUpdate(0,4,2)
console.log(S.pointQuery(1))
S.rangeUpdate(1,5,3)
console.log(S.pointQuery(1))






// IMPLICIT SEGMENT TREES: 
// when you cant build the actual array (tree) (TOO LARGE SIZE), but know that It is filled with some value 
// aka create vertices on the go 
// so left and right point to indices instead, indices of my queries?

//point update range query
class ISTnode{
    constructor(l,r){
        this.l=l,this.r=r,this.sum=0
        this.leftChild,this.rightChild
    }
    extend(){
            if(!this.leftChild&&this.l+1<this.r){
                let mid=this.l+this.r>>1
                this.leftChild=new ISTnode(this.l,mid)
                this.rightChild=new ISTnode(mid+1,this.r)
            }
    }
    pointUpdate(i,val){
        this.extend()
        this.sum+=val
        if(this.leftChild){
            if(i<this.leftChild.r)
                this.leftChild.pointUpdate(i,val)
            else
                this.rightChild.pointUpdate(i,val)
        }
    }
    rangeQuery(lo,hi){
        if(lo<=this.l && this.r<=hi)
            return this.sum
        if(Math.max(this.l,lo)>=Math.min(this.r,hi))
            return 0
        this.extend()
        return this.leftChild.rangeQuery(lo,hi)+this.rightChild.rangeQuery(lo,hi)
    }   
}
let root=new ISTnode(0,1<<31)

//range update, point query
class ISTnodeRUPQ2{
    constructor(l,r){
        this.l=BigInt(l),this.r=BigInt(r),this.sum=0
        this.leftChild,this.rightChild
    }
    extend(){
        if(!this.leftChild&&this.l<=this.r){
            let mid=(this.l+this.r)>>1n
            this.leftChild=new ISTnodeRUPQ2(this.l,mid)
            this.rightChild=new ISTnodeRUPQ2(mid+1n,this.r)
        }
    }
    pointUpdate(i,val){
        i=BigInt(i)
        this.sum+=val
        if(this.l===this.r)
            return
        this.extend()
        if(i<=this.leftChild.r)
            this.leftChild.pointUpdate(i,val)
        else
            this.rightChild.pointUpdate(i,val)
        
    }

    rangeUpdate(lo,hi,val){
        lo=BigInt(lo)
        hi=BigInt(hi)
        this.pointUpdate(hi+1n,-val)
        this.pointUpdate(lo,val)
    }
    pointQuery=(idx)=>{
        idx=BigInt(idx)
        if(this.r<=idx)
            return this.sum
        else if(this.l>idx)
            return 0
        this.extend()
        return this.leftChild.pointQuery(idx)+this.rightChild.pointQuery(idx)
    }
}
