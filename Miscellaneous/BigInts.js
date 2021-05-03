//O(logN)
let findsqrtBigInt=(N)=>{
    let lo=2n,hi=N,result=2n
    while(lo<hi){
        let mid=((hi+lo))>>1n
        if(mid*mid<=N)
            result=mid,
            lo=mid+1n
        else
            hi=mid-1n
    }
    return result
}