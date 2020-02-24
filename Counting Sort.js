
// requirements : Positive Integers as elements
// relatively small range

// Complexity O(n+k) time where k is the range of the input(the max element)
// O(n+k) space, the frequency array depends on k
let countingSort=A=>{

    //1st. find the biggest element of A
    // ( the range of the algorithm)
    let range=Math.max(...A) //considering the min is 0
    //normally it would be
    // range=Math.max(...A)-Math.min(...A)
    
    //2nd. Create the frequency array that stores occurences of its indices in A
    let frequency=[...Array(range+1)].map(d=>0)
    for (let i = 0; i < frequency.length; i++) {
        frequency[A[i]]++  
                //normally it would be frequency[A[i]-range]   
                // to preserve the 0 index
    }

    //3d Fill the Running Sums
    for (let i = 1; i < frequency.length; i++) {
        frequency[i]+=frequency[i-1]        
    }

    //create the result Array
    let sorted=[...Array(A.length)].map(d=>0)


        /// MOST IMPORTANT STEP!!

    //fill the result array according to 
    // the schema Array element=>frequency index=>frequency value--=>final index
    for (let i = 0; i < A.length; i++) {
        //notice the -1 due to 0 index
        sorted[frequency[A[i]]-1]=A[i]    
            // again to preserve the index in the case of the min not being 0
            // we would write 
            // sorted[frequency[A[i]-range]-1]=A[i]
        frequency[A[i]]--
    }

    return sorted
}


  
console.log(
    countingSort(
        [1,5,3,2,1,6]
    )
)
