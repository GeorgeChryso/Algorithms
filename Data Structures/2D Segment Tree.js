


//let's first try the object based approach.
class YNode{
    constructor(xl,xr,l,r,A,memo){
        this.memo=memo
        this.xl=xl,this.xr=xr,this.xmid=xl+xr>>1
        this.yl=l,this.yr=r,this.sum,
        this.ymid=l+((r-l)>>1)
        //change these for different operations
        if(this.memo[xl][xr][l]===undefined)
            this.memo[xl][xr][l]={}
        //create the subtrees
        if(this.yl==this.yr)//leaf
            if(xl===xr)
                this.sum=A[xl][l]
            else
                this.sum=this.memo[xl][this.xmid][l][r]+this.memo[this.xmid+1][xr][l][r]
        else
            this.leftChild=new YNode(xl,xr,this.yl,this.ymid,A,memo),
            this.rightChild=new YNode(xl,xr,1+this.ymid,this.yr,A,memo)
        this.recalc()
    }
    recalc(){
        if(this.yl!==this.yr)
            this.sum=this.leftChild.sum+this.rightChild.sum
        this.memo[this.xl][this.xr][this.yl][this.yr]=this.sum
    }
    pointUpdate(index,newVal){
        if(this.yl==this.yr)
            if(this.xl===this.xr)
                this.sum=newVal
            else
                this.sum=this.memo[this.xl][this.xmid][this.yl][this.yr]+this.memo[this.xmid+1][this.xr][this.yl][this.yr]
        else
            if(index<=this.ymid)
                this.leftChild.pointUpdate(index,newVal)
            else
                this.rightChild.pointUpdate(index,newVal)
        this.recalc()
    }

    rangeQuery=(left,right)=>{ //inclusive
        //entirely disjoint
        if(left>this.yr||right<this.yl||left>right)
            return 0
        // entirely covered
        if(left<=this.yl&&this.yr<=right)
            return this.sum
        // partially covered
        return this.leftChild.rangeQuery(left,right)+this.rightChild.rangeQuery(left,right)
    }
}

// point update range sum query
class Xnode2DSEG{
    constructor(xl,xr,A,sumsmemo={}){
        this.xl=xl,this.xr=xr,this.xmid=xl+((xr-xl)>>1)
        if(sumsmemo[xl]===undefined)
            sumsmemo[xl]={}
        if(sumsmemo[xl][xr]===undefined)
            sumsmemo[xl][xr]={}
        if(xl!=xr)// NOTICE THAT YOU HAVE TO CREATE THE CHILDREN FIRST
            this.leftChild=new Xnode2DSEG(this.xl,this.xmid,A,sumsmemo),
            this.rightChild=new Xnode2DSEG(this.xmid+1,this.xr,A,sumsmemo)
        this.segY=new YNode(xl,xr,0,A[0].length-1,A,sumsmemo) //AND THEN THE CORRESPONDIGN Y SEGMENT TREE
    }
    //useable
    pointUpdate(x,y,newVal){
        if(this.xl==this.xr)
            return this.segY.pointUpdate(y,newVal)
        if(x<=this.xmid)
            this.leftChild.pointUpdate(x,y,newVal),
            this.segY.pointUpdate(y,newVal)
        else
            this.rightChild.pointUpdate(x,y,newVal),
            this.segY.pointUpdate(y,newVal)
    }
    rangeQuery=(xt,yt,xb,yb)=>{ //inclusive
        if(xt>this.xr||xb<this.xl)
            return 0
        if(xt<=this.xl&&this.xr<=xb)
            return this.segY.rangeQuery(yt,yb)
        return this.leftChild.rangeQuery(xt,yt,xb,yb)+this.rightChild.rangeQuery(xt,yt,xb,yb)
    }
}


// E X A M P L E
let A=[
    [0,1,2,1,0],
    [1,0,1,1,0],
    [0,1,1,0,0]
],n=A.length,m=A[0].length

let Seg2d=new Xnode2DSEG(0,n-1,A)
console.log(Seg2d.rangeQuery(0,0,n-1,m-1))
Seg2d.pointUpdate(0,0,10) //point SET
console.log(Seg2d.rangeQuery(0,0,0,0))
console.log(Seg2d.rangeQuery(0,0,n-1,m-1))
