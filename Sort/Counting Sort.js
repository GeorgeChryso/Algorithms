


// SOS SOSOSOSOSOSOSOSOSO
// STABILITY: this is a STABLE ALGORITHM, meaning that 
// WHEN I HAVE DUPLICATE VALUES, LETS SAY AT INDEXES i, j where i<j
// THEN THE FINAL INDEXES AFTER THE SORTING WILL STILL NEED TO BE i'<j'


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
    for (let i = 0; i < A.length; i++) {
        frequency[A[i]]++  
                //normally it would be frequency[A[i]-range]   
                // to preserve the 0 index
    }

    //3d Fill the Running Sums
    // TLDR: THIS TELLS ME THAT THERE ARE FREQUENCY[i] ELEMENTS LESS THAN i, THEREFORE IN MY FINAL ARRAY, the item A[i] needs to be placed in the frequency[A[i]]-th position
    for (let i = 1; i < frequency.length; i++) {
        frequency[i]+=frequency[i-1]        
    }

    //create the result Array
    let sorted=[...Array(A.length)].map(d=>0)


        /// MOST IMPORTANT STEP!!

    //fill the result array according to 
    // the schema Array element=>frequency index=>frequency value--=>final index
         //SOSSOOSOS, IF U DO IT THE OTHER WAY ITS NOT STABLE, U NEED TO START FROM A.LENGTH-1
    // IF U START FROM 0 ITS WRONG. 
    for (let i =A.length-1; i >=0; i--) {
        //notice the -1 due to 0 index
        sorted[frequency[A[i]]-1]=A[i]    
            // again to preserve the index in the case of the min not being 0
            // we would write 
            // sorted[frequency[A[i]-range]-1]=A[i]
        frequency[A[i]]-- //SOS, DECREMENTING TO HANDLE EQUAL VALUES
    }

    return sorted
}


  
console.log(
    countingSort(
        [1,5,3,2,1,6]
    )
)


