

//basically iterative bottom up mergesort
let BUMS=A=>{
    let n=A.length

    let merge=(start,mid,end)=>{     //Notice that start-mid is always sorted, and mid-end is always sorted aswell
        //the implementation for this in O(n) is trivial
        // can we do better?

    }

    for(let len=1;len<n;len+=len) //len doubles each time
        for (let i = 0; i <n-1-len; i++) {
            let mid=i+len,hi=mid+len
            merge(i,mid, Math.min(hi,n-1))            
        }
    return A
}