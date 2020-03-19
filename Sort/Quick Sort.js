



// worst case O(n**2)
//pivot as the last array element
let main=(arr)=>{

    //D&C step
    let QuickSort=(low,high)=>{
        if(low<high){
          let indexOfPivot=partition(low,high) //rearrange my array around the pivot

          //same on left part
          QuickSort( low, indexOfPivot-1)
          //same on right part
          QuickSort( indexOfPivot+1,high)
        }
    }

    // returns the position of the pivot after rearranging the array as:
    // [...all the elements < pivot , pivot  , ...all the elements> pivot]
    // places all the elements around the pivot
    let partition=(l,h)=>{
        let pivot=arr[h] //consider the pivot as the last index element

        let i=l //index of the smaller element, where I will place my elements less than the pivot

        //for every element less than the designated index(the pivot's index) 
        for (let j = l; j < h; j++) {

            //if you come across an item less than the pivot
            if(arr[j]<pivot){

              //swap it with my arr[i], which is the place I designated to store elements less than pivot
              [arr[i],arr[j]]=[arr[j],arr[i]] 
              i++ // place it on its left side, and increment i for the next smaller element
            }        
        }

        [arr[i],arr[h]]=[arr[h],arr[i]]
        return i
    } 


    QuickSort(0,arr.length-1)
    return arr
}




console.log(main(
  [1,2,3,5,6,6,6,21,31,3,5,13221,2331,1231,112,3313]
))
