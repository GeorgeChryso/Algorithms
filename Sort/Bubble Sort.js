

//TLDR: 
// for each position i, save the smallest i-th element on it by:
// making a ton of swaps amongst two potential consecutive elements starting from the end


// Θ(n^2)
let bubbleSort=A=>{

    for (let i = 0; i < A.length; i++) {
        for (let j = A.length-1; j >i; j--) {
            if(A[j]<A[j-1]){
                let temp=A[j-1]
                A[j-1]=A[j]
                A[j]=temp
            }
        }
    }

    return A
}

console.log(bubbleSort(
    [13,1,2,5,2,1,2,5,3,2,1,11,232,123,12,1,10]
))


//similar to insertion sort but: Does alot more swaps