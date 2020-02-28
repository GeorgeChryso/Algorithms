
// Quickly find a value in a SORTED array of numbers
// or look up a word, on a lexicographically sorted array





// Complexity O(logn)
let binarySearch=(A,Target)=>{
    let L=0
    let R=A.length-1
    while(L<=R){
        //take the middle index, use this formula in order to avoid overflow
        mid=L+Math.floor((R-L)/2)

        //look to the right of mid
        if(A[mid]<Target)L=mid+1
        // look to the left of mid
        if(A[mid]>Target)R=mid-1
        // match
        if(A[mid]==Target)return mid
    }
    return -1
}

let A=[2,3,6,8,10,12]
console.log(binarySearch(A,10))