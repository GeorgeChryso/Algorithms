



// given an array A=[..]
// determine the answer for some question for a given range
class SegmentTree{
    constructor(length,startValue){
        this.n=length
        this.lo=[...Array(4*n+1)]
        this.hi=[...Array(4*n+1)]
        this.min=[...Array(4*n+1)]
        this.delta=[...Array(4*n+1)]
        this.initialize(startValue,0,n-1)
        this.comparator
    }
    left=i=>2*i
    right=i=>2*i+1
    initialize=(idx,L,R)=>{
        lo[idx]=L,hi[idx]=R,mid
        if(L!=R)
            mid=L+((R-L)>>1),
            initialize(left(i),L,mid),
            initialize(right(i),mid+1,R)
    }
    prop(i){
        this.delta[this.left(i)]+=this.delta[i]
        this.delta[this.right(i)]+=this.delta[i]
        this.delta[i]=0
    }
    update(i){
        min[i]=this.comparator(min[this.left(i)]+delta[this.left(i)], min[this.right(i)]+delta[this.right(i)])
    }
    increment=(i,start,end,val)=>{
        // disjoint
        if(end<lo[i] || hi[i]<start )
            return this.sentinel
        // completely covered
        if(lo[i]<=start&&end<=hi[i])
            return min[i]+delta[i]
        // partial cover
        this.prop(i)
        let [LEFT,RIGHT]=[increment(left(i),start,end,val),increment(right(i),start,end,val)]
        this.update(i)
        return this.comparator(LEFT,RIGHT)
    }
}

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



let A=[1,12,1,73,1,33,12],n=A.length
let st=new SegTree(0,n-1,A)

console.log(st.rightChild)
// console.log(st.rangeSum(0,3))
 console.log(st.rangeSum(1,5))
 st.pointUpdate(1,50)
 console.log(st.rangeSum(0,1))