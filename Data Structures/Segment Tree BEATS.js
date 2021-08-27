

// updates like :  [l,r,x]=>  [Al,...,Ar]-> [  Min(Al,x),...,Min(Ar,x)]
// Sum queries [l,r]=ΣAi  iE(l,r)
let gcd=(a,b)=>{
    a=Math.abs(a),b=Math.abs(b)
    while(a)
        b%=a,
        [a,b]=[b,a]
    return b
}

class STBNode{
    constructor(l,r,A){
        this.l=l,this.r=r,this.mid=this.l+this.r>>1
        
        // DIFFERENT FOR EACH CASE
        // for min updates, we also need to keep track of max, and second max, and their counts
        this.sum,this.max,this.min,this.maxCount,this.minCount,
        this.secondmax=-Infinity,this.secondmin=Infinity
        //
        this.lazyAdd=0// lazy prop for range add
        this.lazySet=null //lazy prop for range set
        this.lazyGCD=0
        // 
        if(this.l===this.r)
            this.sum=this.min=this.max=A[this.l],this.maxCount=this.minCount=1
        else
            this.leftChild=new STBNode(this.l,this.mid,A),
            this.rightChild=new STBNode(this.mid+1,this.r,A),
            this.mergeChildren()
    }

    updateMaxesFromChildren(){
        let freq={}
        freq[this.leftChild.max]=(freq[this.leftChild.max]||0)+this.leftChild.maxCount
        freq[this.rightChild.max]=( freq[this.rightChild.max]||0)+this.rightChild.maxCount
        freq[this.leftChild.secondmax]=(freq[this.leftChild.secondmax]||0)+1
        freq[this.rightChild.secondmax]=(freq[this.rightChild.secondmax]||0)+1
        let best=[...Object.keys(freq)].map(d=>Number(d)).sort((a,b)=>b-a)
        this.max=best[0],this.maxCount=freq[best[0]],
        this.secondmax=best.length<2?-Infinity:best[1]
    }
    updateMinsFromChildren(){
        let freq={}
        freq[this.leftChild.min]=(freq[this.leftChild.min]||0)+this.leftChild.minCount
        freq[this.rightChild.min]=( freq[this.rightChild.min]||0)+this.rightChild.minCount
        freq[this.leftChild.secondmin]=(freq[this.leftChild.secondmin]||0)+1
        freq[this.rightChild.secondmin]=(freq[this.rightChild.secondmin]||0)+1
        let best=[...Object.keys(freq)].map(d=>Number(d)).sort((a,b)=>a-b)
        this.min=best[0],this.minCount=freq[best[0]],
        this.secondmin=best.length<2?Infinity:best[1]
    }
    updateGCDFromChildren(){
        let [anyleft,anyright]=[this.leftChild.secondmax,this.rightChild.secondmax]
        if(anyleft!==-Infinity&&anyleft!==this.leftChild.min && anyright!==-Infinity&& anyright!==this.rightChild.min )
            this.lazyGCD=gcd(this.lazyGCD,anyleft-anyright)
        let any=-1 //any val not equal to max or min
        if (anyleft != -Infinity && anyleft != this.leftChild.min) 
            any = anyleft;
        else if (anyright != -Infinity && anyright != this.rightChild.min) 
            any = anyright;
        
        for(let val of [this.leftChild.min,this.rightChild.min,this.leftChild.max,this.rightChild.max])
            if(val!==this.min && val!==this.max)
                if(any!==-1)
                    this.lazyGCD=gcd(this.lazyGCD,val-any)
                else //if(val!==Infinity&&val!==-Infinity)
                    any=val
    }
    // DIFFERENT FOR EACH CASE
    mergeChildren(){
        if(this.l!==this.r)
            this.updateMaxesFromChildren(),
            this.updateMinsFromChildren(),
            this.updateGCDFromChildren(),
            this.sum=this.leftChild.sum+this.rightChild.sum
    }
    updateMax(maxOfParent){
        if(this.max>maxOfParent){
            if (this.secondmin == this.max) 
                this.secondmin=maxOfParent
            this.sum-=( this.max-maxOfParent)*this.maxCount,
            this.max=maxOfParent
        }
        this.min=Math.min(this.min,maxOfParent)
    }
    updateMin(minOfParent){
        if(this.min<minOfParent){
            if(this.secondmax===this.min)
                this.secondmax=minOfParent
            this.sum+=( minOfParent-this.min)*this.minCount,
            this.min=minOfParent
        }
        this.max=Math.max(this.max,minOfParent)
    }
    pushToChildren(){
        if(this.l!==this.r)
            this.leftChild.lazySumUpdate(),
            this.rightChild.lazySumUpdate(),
            this.leftChild.updateMax(this.max),
            this.rightChild.updateMax(this.max),
            this.leftChild.updateMin(this.min),
            this.rightChild.updateMin(this.min)
    }

    lazySumUpdate(){
        if(this.lazySet!==null)
            this.lazySetUpdate()
        if(this.lazyAdd!==0 ){
            if(this.l!==this.r)
                this.leftChild.lazyAdd+=this.lazyAdd,
                this.rightChild.lazyAdd+=this.lazyAdd
            this.sum+=this.lazyAdd*(this.r-this.l+1),
            this.max+=this.lazyAdd,
            this.secondmax+=this.lazyAdd,
            this.min+=this.lazyAdd,
            this.secondmin+=this.lazyAdd
        }
        this.lazyAdd=0
    }
    lazySetUpdate(){
        if(this.lazySet!==null){
            if(this.l!==this.r)
                this.leftChild.lazySet=this.lazySet,
                this.rightChild.lazySet=this.lazySet
            this.max=this.min=this.lazySet,this.maxCount=this.minCount=this.r-this.l+1,
            this.secondmax=-Infinity,this.secondmin=Infinity,this.sum=this.maxCount*this.max,
            this.lazyAdd=0
        }
        this.lazySet=null
    }
    // E X T E R N A L S
    //range Min Update 
    rangeMinUpdate(L,R,X){  
        this.lazySumUpdate()
        if(L>this.r||R<this.l|| L>R || X >=this.max )
            return
        if(L<=this.l&&this.r<=R && this.secondmax<X )
            this.updateMax(X)
        else if(this.l!==this.r)
            this.pushToChildren(),  
            this.leftChild.rangeMinUpdate(L,R,X),
            this.rightChild.rangeMinUpdate(L,R,X),
            this.mergeChildren()
    }
    rangeMaxUpdate(L,R,X){
        this.lazySumUpdate()
        if(L>this.r||R<this.l|| L>R ||  X <=this.min )
            return
        if(L<=this.l&&this.r<=R && this.secondmin > X )
            this.updateMin(X)
        else if(this.l!==this.r)
            this.pushToChildren(),
            this.leftChild.rangeMaxUpdate(L,R,X),
            this.rightChild.rangeMaxUpdate(L,R,X),
            this.mergeChildren()
    }
    rangeAddUpdate(L,R,X){
        this.lazySumUpdate()
        if(L>this.r||R<this.l|| L>R )
            return
        if(L<=this.l&&this.r<=R )
            this.lazyAdd+=X,
            this.lazySumUpdate()
        else if(this.l!==this.r){
            this.pushToChildren(),
            this.leftChild.rangeAddUpdate(L,R,X),
            this.rightChild.rangeAddUpdate(L,R,X),
            this.mergeChildren()
        }
    }
    //range set update
    rangeSetTo(L,R,X){
        this.lazySumUpdate()
        if(L>this.r||R<this.l|| L>R )
            return
        if(L<=this.l&&this.r<=R )
           this.lazySet=X,
           this.lazySetUpdate()
        else if(this.l!==this.r){
            this.pushToChildren(),
            this.leftChild.rangeSetTo(L,R,X),
            this.rightChild.rangeSetTo(L,R,X),
            this.mergeChildren()
        }
    }
    //range mod by something-------------NOT DONE
    // https://www.youtube.com/watch?v=NwkO73jGSPA&t=1538s&ab_channel=peltorator
    rangeModBy(L,R,X){
        this.lazySumUpdate()
        if(L>this.r||R<this.l|| L>R ||  this.max <X )
            return
        if(L<=this.l&&this.r<=R && this.min===this.max ){
            this.sum=this.maxCount * (this.max%X)
            this.max=this.min=this.sum%X,
            this.secondmax=-Infinity,this.secondmin=Infinity,
            this.lazySumUpdate()
        }
        else if(this.l!==this.r)
            this.pushToChildren(),
            this.leftChild.rangeModBy(L,R,X),
            this.rightChild.rangeModBy(L,R,X),
            this.mergeChildren()
    }


    // QUERIES rangeSum
    rangeSumQuery(L,R){
        this.lazySumUpdate()
        this.pushToChildren()
        if(L>this.r||R<this.l || L>R)
            return 0                     
        if(L<=this.l&&this.r<=R)
            return this.sum 
        return this.leftChild.rangeSumQuery(L,R)+this.rightChild.rangeSumQuery(L,R) 
    }
    rangeMinQuery(L,R){
        this.lazySumUpdate()
        this.pushToChildren()
        if(L>this.r||R<this.l || L>R)
            return Infinity
        if(L<=this.l&&this.r<=R)
            return this.min 
        return Math.min(this.leftChild.rangeMinQuery(L,R),this.rightChild.rangeMinQuery(L,R))
    }
    rangeMaxQuery(L,R){
        this.lazySumUpdate()
        this.pushToChildren()
        if(L>this.r||R<this.l || L>R)
            return -Infinity
        if(L<=this.l&&this.r<=R)
            return this.max 
        return Math.max(this.leftChild.rangeMaxQuery(L,R),this.rightChild.rangeMaxQuery(L,R))
    }
    rangeGCDQuery(L,R){ // NOT WORKING -https://www.youtube.com/watch?v=NwkO73jGSPA&t=1538s&ab_channel=peltorator
        this.lazySumUpdate()
        this.pushToChildren()
        if(L>this.r||R<this.l || L>R)
            return -Infinity
        if(L<=this.l&&this.r<=R){
            let ans=this.lazyGCD
            if(this.secondmax!==-Infinity)
                ans=gcd(ans,this.secondmax-this.max)
            if(this.secondmin!==Infinity)
                ans=gcd(ans,this.secondmin-this.min)
            return gcd(ans,this.max) 
        }
        return gcd(this.leftChild.rangeGCDQuery(L,R),this.rightChild.rangeGCDQuery(L,R))
    }
}

var start = new Date().getTime();


let A=[...Array(1555)].map( (d,i)=> (Math.random()*1500) >>0)
let S=new STBNode(0,A.length-1,A)

// TESTS
for(let t=0;t<1555;t++){
    let type= (Math.random()*10)>>0
    let left= (Math.random()*(A.length-1))>>0
    let right= left+(Math.random()*(A.length-1-left))>>0 
    let x=( ( (-1)**((Math.random()*2) >>0))* (Math.random()*311) )>>0

    if(type==1){ //min
        for(let i=left;i<=right;i++)
            A[i]=Math.min(A[i],x)
        S.rangeMinUpdate(left,right,x)
    }
    else if(type===2){ //max
        for(let i=left;i<=right;i++)
            A[i]=Math.max(A[i],x)
        S.rangeMaxUpdate(left,right,x)
    }
    else if(type===3){ //rangeSum by something
        for(let i=left;i<=right;i++)
            A[i]+= x
        S.rangeAddUpdate(left,right,x)
    }
    else if(type===44){ //rangeMod by something---- NOT DONE
        for(let i=left;i<=right;i++)
            A[i]%= x
        S.rangeModBy(left,right,x)
    }
    else if (type ===5){ //range Set to
        for(let i=left;i<=right;i++)
            A[i]= x
        S.rangeSetTo(left,right,x)
    }
    else if(type===6){ //--------problem
        let res=A[left]
        for(let i=left+1;i<=right;i++)
            res=gcd(res,A[i])
        if(res!==S.rangeGCDQuery(left,right))
            console.log('GCDWRONG')
    }
    else{
        S.rangeSumQuery(left,right)
        let sum=0
        for(let i=left;i<=right;i++)
            sum+=A[i]
        if(sum!==S.rangeSumQuery(left,right))
            console.log(sum,S.rangeSumQuery(left,right),'SUMWRONG')
    }
}

console.log( 'Execution took: ', ((new Date().getTime()) - start) /1000,'seconds' )