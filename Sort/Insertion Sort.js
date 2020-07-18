//Concept: For every element A[j] of your array, check all the elements on its left, and place it on the ideal position i, while at the same time moving all the bigger elements one position to their right in order to make space for the insertion of your element A[j] that you're about to place.

var InsertionSort = A => {
  for (let j = 1; j < A.length; j++) {
    let key = A[j]; // store the element to be moved
    let i = j - 1; // start examining all the elements left to it

    // keep searching on the left until you find the first smaller element
    while (i > 0 && A[i] > key) {
      //Since you intend to insert your key at its rightful position that lies
      // on the left of j, you need to move all the other elements one side to the right
      A[i + 1] = A[i]; //so that you can place your key
      i--;
    }
    // When you reach this step, you do have the ideal position i that holds the first smaller element you came across
    A[i + 1] = key; //  therefore you need to place your element after its first smaller element A[i]
  }

  return A;
};

// Loop Invariant: At the start of each iteration, the subarray A[0...j-1] is sorted
// Complexity: O(n^2) worst case when the array is reverse sorted, O(1) space
// Best case O(n) when the array is already sorted
// Θ(n+d) where d is the number of inversions in the array
// inversion is a pair of (A[i],A[j]) elements where i<j but A[i]>A[j]
// THE MORE SORTED THE ARRAY IS, THE LESS WORK INSERTION SORT NEEDS TO DO

// 2.3-4 Expressing insertion sort as recurrence
// In order for me to sort A[1...n]
// I sort(1...n-1) and i add A[n] to the correct spot of the last n-1 items
var InsertionSort=A=>{

  let recurrence=(start,end)=>{
     if(start<=end){
       recurrence(start,end-1) //keep breaking into subproblems
       insrt(end) //insert to the sorted array
     }
  }
  
  //insert an item into its previous SORTED items by moving all the bigger items 1 step to their RIGHT 
  // and placing our item to its appropriate position.
  let insrt=idx=>{
      let val=A[idx]
      let i=idx
      while(i>0&&val<A[i-1]){
        A[i]=A[i-1]
        i--
      }
      A[i]=val
  }

  recurrence(1,A.length-1)
  return A
}

console.log(
  InsertionSort([
    11,
    2,
    3,
    5,
    6,
    6,
    6,
    21,
    31,
    3,
    5,
    13221,
    2331,
    1231,
    112,
    3313
  ])
);
