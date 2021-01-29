


// Efficient Range Minimum Queries computation over an array
// O(nlogn) Creation- O(1) range min query, O(logn) other functions- NO RANGE/POINT UPDATES

// Any number can be written as a sum of powers of 2, its binary representation
// 13=1101=8+4+1, therefore any interval of length 13 can also be written as a sum of intervals of length that is a power of two
// [12,24]=[12,19]U[20,23]U[24,24]
//     length 8       4        1
// the total number of intervals= the total number of set bits = log(x)

//implementation for non idempotent functions 
class SparseTable{
    //precompute all answers with power of two length in O(nlogn)
    constructor(Arr,func=(a,b)=>Math.min(a,b),identityElement=Infinity){
        this.n=Arr.length
        this.K=Math.floor(Math.log2(this.n))+1
        this.comparator=func
        this.idenityElement=identityElement
        // st[i][j] holds the answer for the interval [i,i+2^j -1]
        this.st=[...Array(this.n)].map(d=>[...Array(this.K+1)]) 
        
        //prefill using dp
        for(let i=0;i<this.n;i++)
            this.st[i][0]=Arr[i]
        for(let j=1;j<=this.K;j++)
            for(let i=0;i+ (1<<j)<=this.n;i++)
                this.st[i][j]=this.comparator(
                                this.st[i][j-1],
                                this.st[i+ (1<<(j-1))][j-1]
                                )
        console.log(this.st)
    }
    rangeQuery=(l,r)=>{ //works in O(logn) 
        let result=this.idenityElement
        for(let j=this.K;j>=0;j--)
            if(r-l+1>= 2**j)
                result=this.comparator(result,this.st[l][j]),
                l+=2**j
        return result
    }
}

let A=[12,3,1,5,12,22,123,12]
let S=new SparseTable(A)
console.log(
    S.rangeQuery(6,6)
)

// ONLY SUPPORTS IDEMPOTENT FUNCTIONS
// =>f( f(x,b),b) =f(x,b)
// like Min=> Min(Min(a,b),b)=Min(a,b)
class SparseTableIDEMPOTENT{
    //precompute all answers with power of two length in O(nlogn)
    constructor(Arr,func=(a,b)=>Math.min(a,b)){
        this.n=Arr.length
        this.K=Math.floor(Math.log2(this.n))+1
        this.comparator=func
        // st[i][j] holds the answer for the interval [i,i+2^j -1]
        this.st=[...Array(this.n)].map(d=>[...Array(this.K+1)]) 
        
        this.log=[...Array(this.n+1)]
        this.log[1]=0
        for (let i = 2; i <= this.n; i++)
            this.log[i] = this.log[i>>1] + 1;

        //prefill using dp
        for(let i=0;i<this.n;i++)
            this.st[i][0]=Arr[i]
        for(let j=1;j<=this.K;j++)
            for(let i=0;i+ (1<<j)<=this.n;i++)
                this.st[i][j]=this.comparator(
                                this.st[i][j-1],
                                this.st[i+ (1<<(j-1))][j-1]
                                )
    }
    rangeQuery=(l,r)=>{ //works in O(1) 
        let j=this.log[r-l+1]
        return this.comparator( this.st[l][j], this.st[r- 2**j +1][j])
    }
}

let SS=new SparseTableIDEMPOTENT(A)
console.log(
    SS.rangeQuery(4,6)
)