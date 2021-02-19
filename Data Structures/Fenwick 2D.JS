
//point update- Range Query
class Fenwick2DPURQ{
    constructor(A){
        this.n=A.length
        this.m=A[0].length
        this.B=[...Array(this.n+1)].map(d=>[...Array(this.m+1)].map(d=>0))
        for(let i = 1 ; i <= this.n ; ++i) 
          for(let j = 1 ; j <= this.m ; ++j) 
            this.upd(i, j, A[i-1][j-1]);
    }
    lowbit=i=>i&(-i)  
    sum=(x,y)=>{
        let ans = 0;
        for(let i = x ; i > 0 ; i -= this.lowbit(i)) 
          for(let j = y ; j > 0 ; j -= this.lowbit(j)) 
            ans += this.B[i][j];
        return ans;
    }
    // queries should be x1<= x2 && y1<=y2
    //submatrix sum query //notice that the queries will have to be xE[1,n], yE[1,m] cos there is no 0-th element
    query=(x1,y1,x2,y2)=>this.sum(x2, y2) - this.sum(x1 - 1, y2) - this.sum(x2, y1 - 1) + this.sum(x1 - 1, y1 - 1)
    //update a point
    upd=(x,y,val)=>{
        for(let i = x ; i <= this.n ; i += this.lowbit(i)) 
            for(let j = y ; j <= this.m ; j += this.lowbit(j)) 
              this.B[i][j] += val;
    }
}

let A=[
        [1,2,3,1],
        [2,2,3,1],
        [1,1,2,2]
      ]
let B=new Fenwick2DPURQ(A)
console.log(B.query(1,1,2,2)) 
B.upd(2,2,3)
console.log(B.query(1,1,2,2),'\n') 


// Range Update- Point Query
class Fenwick2DRUPQ{
    constructor(A){
        this.n=A.length
        this.m=A[0].length
        this.B=[...Array(this.n+1)].map(d=>[...Array(this.m+1)].map(d=>0))
        for(let i = 1 ; i <= this.n ; ++i) 
          for(let j = 1 ; j <= this.m ; ++j) 
            this.upd(i, j, A[i-1][j-1]);
    }
    upd=(x,y,val)=>{
        for(let i = x ; i <= this.n ; i += this.lowbit(i)) 
            for(let j = y ; j <= this.m ; j += this.lowbit(j)) 
                this.B[i][j] += val;
    }
    lowbit=i=>i&(-i)  
    // updates should be x1<= x2 && y1<=y2
    rangeUpdate=(x1,y1,x2,y2,v)=>{
        this.upd(x2 + 1, y2 + 1, v);
        this.upd(x1, y1, v);
        this.upd(x1, y2 + 1, -v);
        this.upd(x2, y1 + 1, -v);
    }
    pointQuery=(x,y)=>{
        let ans = 0;
        for(let i = x ; i > 0 ; i -= this.lowbit(i)) 
          for(let j = y ; j > 0 ; j -= this.lowbit(j)) 
            ans += this.B[i][j];
        return ans;
    }
}

B=new Fenwick2DRUPQ(A)
console.log(B.pointQuery(1,2))

B.rangeUpdate(1,1,2,2,2)
B.rangeUpdate(1,2,1,2,1)
B.rangeUpdate(1,1,3,3,1)
console.log(B.pointQuery(1,2),'\n')


// Range Update- Range Query
class Fenwick2DRURQ{
    constructor(A){
        this.n=A.length
        this.m=A[0].length
        this.B=[...Array(this.n+1)].map(d=>[...Array(this.m+1)].map(d=>[...Array(4)].map(d=>0)))
        for(let i = 1 ; i <= this.n ; ++i) 
          for(let j = 1 ; j <= this.m ; ++j) 
            this.rangeUpdate(i, j,i,j, A[i-1][j-1]);
    }
    upd=(x,y,val)=>{
        for(let i = x ; i <= this.n ; i += this.lowbit(i)) 
            for(let j = y ; j <= this.m ; j += this.lowbit(j)) 
                this.B[i][j][0] += val,
                this.B[i][j][1] += x * val,
                this.B[i][j][2] += y * val,
                this.B[i][j][3] += x * y * val
    }
    qry=(x,y)=>{
        let ans = 0;
        for(let i = x ; i > 0 ; i -= this.lowbit(i)) 
          for(let j = y ; j > 0 ; j -= this.lowbit(j)) 
            ans += (x + 1) * (y + 1) * this.B[i][j][0] - (y + 1) * this.B[i][j][1] - (x + 1) * this.B[i][j][2] + this.B[i][j][3];
        return ans;
    }
    lowbit=i=>i&(-i)  
    // x1>=1,y1>=1  ( NO ZEROES)
    // updates should be x1<= x2 && y1<=y2
    rangeUpdate=(x1,y1,x2,y2,v)=>{
        this.upd(x1, y1, v);
        this.upd(x1, y2 + 1, -v);
        this.upd(x2 + 1, y1, -v);
        this.upd(x2 + 1, y2 + 1, v);
    }
    rangeQuery=( x1,  y1,  x2,  y2)=>{
        return this.qry(x2, y2) - this.qry(x1 - 1, y2) - this.qry(x2, y1 - 1) + this.qry(x1 - 1, y1 - 1)}
}

A=[
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
   [ 0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0],
   [ 0,0,0,0,0,0,0,0,0,0,0],
   [ 0,0,1,0,0,0,0,0,0,0,0],
   [ 0,0,0,0,0,0,0,0,0,0,1]
  ]
B=new Fenwick2DRURQ(A)
console.log(B.rangeQuery(4,0,6,4))
B.rangeUpdate(4,0,6,4,-1)
console.log(B.rangeQuery(0,6,3,10))
