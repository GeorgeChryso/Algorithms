
//reference :https://discuss.codechef.com/t/tutorial-disjoint-sparse-table/17404

// Function has to be associative f(f(x,y),z)=f(x,f(y,z))
// Immutable Array, Preprocessing O(NlnN), Range queries in O(1). NO UPDATES.

//works similar to Segment trees
// a node corresponds to an interval [L,R) and the middle index M=L+R/2
// this node will store precomputed values of
// f(A[L],...,A[M]) and f(A[M+1],...,A[R-1])
class DST{
    constructor(Arr,operation=(a,b)=>Math.min(a,b)){
        let N=Arr.length
        this.A=[...Arr],this.N=N
        this.maxLev=Math.ceil(Math.log2(N))+1
        this.maxPow=1<<(Math.ceil(Math.log2(N)))
        this.operation=operation
        this.n=1
        this.t=[...Array(this.maxLev)].map(d=>[...Array(this.max)])
        
        this.size=N
        this.ml=Math.floor(Math.log2(N))
        if((1<<this.ml )!=N)
            this.size=1<<(this.ml+1),
            this.ml++

        this.build()
        this.t.forEach(d=>console.log(d+''))
    }
    //using the DP D&C optimization
    build=(level=0,left=0,right=this.size)=>{
        let mid=left+right>>1
        this.t[level][mid]=this.A[mid]
        for(let i=mid-1;i>=left;i--)
            this.t[level][i]=this.operation(this.t[level][i+1],this.A[i])
        if(mid+1<right){
            this.t[level][mid+1]=this.A[mid+1]
            for(let i=mid+2;i<right;i++)
                this.t[level][i]=this.operation(this.t[level][i-1],this.A[i])
        }
        if(left+1!==right)
            this.build(level+1,left,mid),
            this.build(level+1,mid,right)
    }
    //O(1) 
    rangeQuery=(L,R)=>{
        if(L==R)
            return this.A[L]
        let h=this.ml-1- Math.floor(Math.log2(L^R))
        let result=this.t[h][L]
        if(R&( (1<<Math.floor(Math.log2(L^R)))-1 ))
            return this.operation(result,this.t[h][R]) 
        return result
    }
}

let A=[12,3,1,5,12,22,123,12,11,21,2132,12,11,11222]
let S=new DST(A,(a,b)=>Math.max(a,b))

console.log(S.rangeQuery(0,A.length-1))

