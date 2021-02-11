// Object based- segment tree, where each new version is stored in an array
// point update, range query
// the thing is that with each new pointUpdate, a new logn chain of nodes is created
class PeristentSegTreeNode{
    constructor(l,r,operation=(a,b)=>Math.min(a,b),sentinel=Infinity){
        this.leftmost=l,this.rightmost=r,this.mid=l+((r-l)>>1)
        this.operation=operation,this.sentinel=sentinel,
        this.sum=this.sentinel,
        this.leftChild=null,this.rightChild=null
    }
    build(){//builds children if they re not present already
        if(this.leftChild===null)
            this.leftChild=new PeristentSegTreeNode(this.leftmost,this.mid)
        if(this.rightChild===null)
            this.rightChild=new PeristentSegTreeNode(this.mid+1,this.rightmost)
        this.sum=this.operation(this.leftChild.sum,this.rightChild.sum)
    }

    pointUpdate(index,newVal){
        let resultNode=new PeristentSegTreeNode(this.leftmost,this.rightmost)
        if(this.leftmost==this.rightmost){ // a leaf
            resultNode.sum=newVal
            return resultNode
        }
        this.build()
        // a parent
        if(index<=this.mid) 
            resultNode.leftChild=this.leftChild.pointUpdate(index,newVal),
            resultNode.rightChild=this.rightChild
        else
            resultNode.leftChild=this.leftChild,
            resultNode.rightChild=this.rightChild.pointUpdate(index,newVal)
        resultNode.sum=this.operation(resultNode.leftChild.sum,resultNode.rightChild.sum)
        return resultNode
    }

    rangeQuery=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>this.rightmost||right<this.leftmost)
            return this.sentinel
        // entirely covered
        if(left<=this.leftmost&&this.rightmost<=right)
            return this.sum
        // partially covered
        this.build()
        return this.operation(this.leftChild.rangeQuery(left,right),this.rightChild.rangeQuery(left,right))
    }
}

//initialization on  an already existing Array A
let A=[1,2,6,4,3,1,2,6]

let root=new PeristentSegTreeNode(0,A.length-1),curr
for(let i=0;i<A.length;i++)
    curr=root.pointUpdate(i,A[i]),
    console.log(root),
    root=curr,
    console.log(root.rangeQuery(i-1,i))
//new version's root
//let newRoot=oldroot.pointUpdate(i,val)


//try range update, range query
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

    deltaCheck(){
        if(this.delta){
            this.sum=this.rangeUpdateOperation(this.sum,this.delta*(-this.leftmost+this.rightmost+1))
            if(this.leftmost!==this.rightmost)//propagate the change to its children
                this.leftChild.delta=+this.delta,
                this.rightChild.delta+=this.delta
            this.delta=null
        }
    }
    // EXTERNAL 
    rangeUpdate(L,R,val){
        this.deltaCheck() //if there's a delta, use it and propagate it to the children

        if(L>this.rightmost||R<this.leftmost) //not covered at all
            return
        if(L<=this.leftmost&&this.rightmost<=R){ //fully covered
            this.sum=this.rangeUpdateOperation(this.sum,val*(-this.leftmost+this.rightmost+1))
            if(this.leftmost!==this.rightmost)//propagate the change to its children
                this.leftChild.delta+=val,
                this.rightChild.delta+=val
            return 
        }
        //semi covered
        this.leftChild.rangeUpdate(L,R,val)
        this.rightChild.rangeUpdate(L,R,val)
        this.sum=this.operation(this.leftChild.sum, this.rightChild.sum)
    }
    rangeOperation=(left,right)=>{ //inclusive
        this.deltaCheck() //if there's a delta, use it and propagate it to the children
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