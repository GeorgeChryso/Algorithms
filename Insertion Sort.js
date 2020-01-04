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

// Complexity: O(n^2) worst case when the array is reverse sorted, O(1) space
// Best case O(n) when the array is already sorted

console.log(
  InsertionSort([
    1,
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
