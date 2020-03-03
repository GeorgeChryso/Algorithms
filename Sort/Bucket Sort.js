// Requirements:
// Uniformly distributed input over a range
// Can work in non integrers(floating)
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

let bucketSort=A=>{
    //create buckets for each subcategory
    // i.e. if you have decimals you can create 10 buckets
    // 1 for each subdecimal
    // However the criteria for different buckets relies on the coder
    let buckets={}
    for (let i = 0; i < 10; i++) {
        buckets[i]=[]        
    }

    //place your array's items inside their respective bucket
    for (let i = 0; i <A.length; i++) {
        //according to their criteria
        buckets[Math.floor(10*A[i])].push(A[i])        
    }

    //sort the buckets (usually using insertion sort
    // for linear time ) 
    for (const key in Object.keys(buckets)){
        buckets[key]=InsertionSort(buckets[key])
    }

    //concatenate the buckets into the final array
    return Object.values(buckets).reduce(
        (acc,curr)=>acc.concat(curr),[]
    )

}
//if all items are uniformly distributed over a range
// then the algorithm takes O(n) time on average
// and O(m) space, where m is the range my buckets memo was made according to
console.log(bucketSort(
    [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434]
))