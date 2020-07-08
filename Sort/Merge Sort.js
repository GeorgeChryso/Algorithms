// Concept: Using a Divide and Conquer variant:
//  1. keep breaking the array in half (two subarrays)
//  2. Sort the two subarrays
//  3. Merge the sorted subarrays into a single sorted array

var MergeSort=A=>{

    // this merges 2 subarrays of A, A[p...q] and A[q+1...r] into a new sorted Array
    // notice that this essentially also merges the arrays bottom-top style,
    // because the first processed Arrays will be of length 1
    // therefore It will recursively sort them aswell, and only handle sorted subarrays
    var Merge=(A,p,q,r)=>{
        let n1=q-p+1 //the number of elements of the first subarray
        let n2=r-q  // the number of elements of teh second subarray

        //these are two new arrays, with 1 extra elements than our subarrays
        let LEFT=Array(n1+1)
        let RIGHT=Array(n2+1)


        //copy the subarrays into my new arrays
        for (let i = 0; i <n1; i++) {
            LEFT[i]=A[p+i]
        }
        for (let i = 0; i <n2; i++) {
            RIGHT[i]=A[q+1+i]
        }
        // The extra elements at the end of my LEFT and RIGHT arrays will act
        // as sentinels, in order for my traversal to stop
        LEFT[n1]=Infinity
        RIGHT[n2]=Infinity
        console.log('started with',A+'')
        console.log('broken into',LEFT,RIGHT)


        // loop invariant: At the start of each iteration of this for loop, the 
        // subarray A[p...k-1] contains the smallest sorted elements  of L and R
        // which are the k-p first sorted elements of the subarray A[p..r]
        // TLDR.. USE TWO POINTERS TO CREATE THE SORTED MERGED ARRAY
        for (let k = p,i=0,j=0; k<=r; k++) {
            // produce the sorted array without needing extra space
            if(LEFT[i]<=RIGHT[j]){
                A[k]=LEFT[i] 
                i++
            }
            else{
                A[k]=RIGHT[j]
                j++
            }
        }
        console.log('became')
        console.log(A+''+'\n\n')

    }


    //this is the recursion step,keeps breaking the array into two halves, and mergesorting them
    let MSORT=(A,p,r)=>{
        if(p<r){
            let q=Math.floor((p+r)/2)//middle element
            MSORT(A,p,q)
            MSORT(A,q+1,r)
            Merge(A,p,q,r)
        }
    }


    MSORT(A,0,A.length-1)

    return A
}
// Runtime Θ(nlogn) through Master Theorem


console.log(MergeSort(
    [1,23,1,5,6,12,3,1]
)) 