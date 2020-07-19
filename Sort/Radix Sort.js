
//lets assume Positive Integers with same number of Digits

// each element has D digits
// Θ(D(n+k)), k is the number of possible values a digit can get
// TLDR: sort from the rightmost digit to the leftmost ( D times) KEEPING THE STABILITY,
// WHAT MAKES THIS ALGORITHM WORK IS THE FACT THAT: 
// THE RELATIVE ORDERING IS PRESERVED DURING EACH ITERATION, SO THE ALGORITH REMEMBERS
// THE ORDERING OF THE PREVIOUS SORTING STEP, ACHIEVING CORRECT RESULTS

//array ,number of digits
let radixSort=(Arr,D)=>{

    //for each digit
    for (let i = 1; i <= D; i++) {
        //sort the array on this digit using a stalbe sort algo that takes Θ(n+k) time
        Arr=countingSort(Arr,i,10)
        console.log(Arr)
    }
    
    return Arr
}



// SOS SOSOSOSOSOSOSOSOSO
// STABILITY: this is a STABLE ALGORITHM, meaning that 
// WHEN I HAVE DUPLICATE VALUES, LETS SAY AT INDEXES i, j where i<j
// THEN THE FINAL INDEXES AFTER THE SORTING WILL STILL NEED TO BE i'<j'

// here is a modification of counting sort for K=10 possible Digits ( range 10)
// that sorts according to the nth digit
let countingSort=(A,n,k)=>{
    let range=k // all possible digits

    //i-th digit of a number
    let getKthDigit=(number,i)=> Math.floor((number/(10**(i-1))))%10

    //2nd. Create the frequency array that stores occurences of its indices in A
    let frequency=[...Array(range+1)].map(d=>0)
    for (let i = 0; i < A.length; i++) {
        frequency[getKthDigit(A[i],n)]++  
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
    for (let i =A.length-1; i >=0; i--) { //if u start from 0 , its wrong. 
        sorted[frequency[getKthDigit(A[i],n)]-1]=A[i]    
            // again to preserve the index in the case of the min not being 0
            // we would write 
            // sorted[frequency[A[i]-range]-1]=A[i]
        frequency[getKthDigit(A[i],n)]-- //SOS, DECREMENTING TO HANDLE EQUAL VALUES
    }

    return sorted
}




console.log(
    radixSort(
        [329,457,657,839,436,720,355]
        , 3
    )
)