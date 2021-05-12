// Given a sequence of numbers / letters- find the k-th  (lexico) permutation


// The naive way=> O( (n+1)! ) runtime + O(n) space
// Essentially start from the first permutation (ascending order) 
// and repeat "Next Permutation" k times
var getKthPermutation = function(A) {
    var nextPermutation = function(A) {
        let j=A.length-1
        while(j>0&&A[j-1]>=A[j])
            j--
        if(j==0)
            return A.reverse() //OR -1 ( CASE OF THE BIGGEST PERMUTATION)
        // j is now the position of the biggest element in the chain  [BIGGEST>=,...>=,end]
        let element=A[j-1] //We need to place A[j-1] inside this chain, so it replaces its next bigger element
        for(let i=A.length-1;i>=0;i--)
            if(A[i]>element){
                A[j-1]=A[i]
                A[i]=element
                break
            }
        // then we need to reverse the sorted list [A[j],...end]=>[A[end],..A[j]]
        for(let i=j;i<A.length-1-i+j;i++)
            [A[i],A[A.length-1-i+j]]=[A[A.length-1-i+j],A[i]]
    };
//=========Sort first according to some criteria=========\\
    // A.sort((a,b)=>) 
    for(let i=0;i<k-1;i++)
        nextPermutation(A)
    return A
};


/*
     Things that can dramatically affect the problem's solution:

    1)  The elements are distinct

    2) The elements are in a range, and are all present [1,...,N]

    3) There can be repetition of elements


*/