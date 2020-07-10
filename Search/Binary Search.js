
// Quickly find a value in a SORTED array of numbers
// or look up a word, on a lexicographically sorted array




// Complexity O(logn)
//iterative
let binarySearch=(A,Target)=>{
    let L=0
    let R=A.length-1
    while(L<=R){
        //take the middle index, use this formula in order to avoid overflow
        mid=L+Math.floor((R-L)/2)  // or ( R+L)>>1

        //look to the right of mid
        if(A[mid]<Target)L=mid+1
        // look to the left of mid
        if(A[mid]>Target)R=mid-1
        // match
        if(A[mid]==Target)return mid
    }
    return -1
}

//recursive
let bs=(A,val)=>{

    let rec=(lo,hi)=>{
        if(lo>hi)return null
        let mid=(hi+lo)>>1
        if(A[mid]===val)return mid
        if(A[mid]>val)return rec(lo,mid-1)
        else return rec(mid+1,hi)
    }

    return rec(0,A.length-1)
}

let A=[2,3,6,8,10,12]
console.log(binarySearch(A,10))
console.log(bs(A,10))