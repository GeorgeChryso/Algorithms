
function QS(A){

  function quicksort(A,left,right){
    if(left>=right)return;

    var pivot=A[(left+right)/2]
    var index=partition(A,left,right,pivot)
    quicksort(A,left,index-1)
    quicksort(A,index,right)

}

  function partition(A,left,right,pivot){
    while(left <= right){
        
        while(A[left]<=pivot)left--
        while(A[right]>pivot)right--
         if(left<=right){
            

            var temp=A[left]
            A[left]=A[right]
            A[right]=temp
        
            left++
            right--
        }
    }
    return left
}

 


    quicksort(A,0,A.length-1)

    return A
}




// NEW
// I think this one takes more space, but works so..

// implementation me to pivot na einai to prwto stoixeio
function quickSortF(arr) {

    if (!arr.length) return []

// consider the pivot as the first element, the rest of the array is the 
    const [pivot, ...tail] = arr,
    left=[],right=[]
          
// ta mikrotera stoixeia tou pivot valta sto aristero array, ta alla sto deksi
        
    tail.forEach(
      d =>(d<=pivot)?left.push(d):right.push(d)
    );

 // epestrepse to enwmeno array afou efarmoseis qs sta epimerous left kai right
  return quickSortF(left).concat(pivot, quickSortF(right))           

}


//implementation me to pivot na einai to median
function quickSortF(arr) {
      function medianThree( a,  b,  c) {
        if ((a > b) != (a > c)) {
            pivotSpot=0
            return a;}
        else if ((b > a) != (b > c)) {
            pivotSpot=arr.length-1
            return b;
        }       
        else{
          pivotSpot=arr.length%2?(arr.length-1)/2:(arr.length/2-1)
            return c;}
    }// virskei ton meso oro twn a b c

  if (!arr.length) return [] // teleiwnei to recursion

  // to pivot to pairnw ws ton meso oro twn 3
  const pivot=medianThree(
              arr[0],
              arr[arr.length-1],
              arr[arr.length%2?(arr.length-1)/2 :arr.length/2-1]
            )
  const left=[]
  const right=[]
  var pivotSpot=0
// ta mikrotera stoixeia apo to pivot valta sto aristero array, ta alla sto deksi
      
  arr.forEach(
    (d,i) =>{
      if(i!==pivotSpot){ // to pivot tha to valw o idios anamesa
        (d<=pivot)?left.push(d):right.push(d)
      }
    }
  );

// epestrepse to enwmeno array afou efarmoseis qs sta epimerous left kai right
return quickSortF(left).concat(pivot, quickSortF(right))           

}


let main=(arr)=>{

    //D&C step
    var QuickSort=(low,high)=>{
        if(low<high){
          let prtn=partition(low,high)
          QuickSort( low, prtn-1)
          QuickSort( prtn+1,high)
        }
    }

    // returns the position of the pivot
    // places all the elements less than the pivot
    let partition=(l,h)=>{
        let pivot=arr[h] //consider the pivot as the last index element

        let i=l-1 //index of the smaller element

        for (let j = l; j < h; j++) {

            if(arr[j]<pivot){
              i++
              [arr[i],arr[j]]=[arr[j],arr[i]]
            }        
        }

        [arr[i+1],arr[h]]=[arr[h],arr[i+1]]
        return i+1
    } 


    QuickSort(0,arr.length-1)
    return arr
}




console.log(main(
  [1,2,3,5,6,6,6,21,31,3,5,13221,2331,1231,112,3313]
))
