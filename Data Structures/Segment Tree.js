



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
    rangeUpdate(L,R,val){

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
