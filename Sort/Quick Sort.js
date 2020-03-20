



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

//reference 215 LC

// Median of Medians deterministic Select
let Dselect=(A,k)=>{


  if(A.length<10){
      A.sort((a,b)=>a-b)
      return A[k]
  }

  let subsets=[]
  let group=[]
  for (var i = 0; i < A.length; i++) {
      if(group.length==5){ 
          subsets.push(group)
          group=[]
      }
      group.push(A[i])
  }
  subsets[subsets.length-1]=subsets[subsets.length-1].concat(group)
  
  let mediansOfSubsets=[]
  for (const subset of subsets) {
      mediansOfSubsets.push(select(subset,3)) //guaranteed to hit the first if Clause
  }

  let M=select(mediansOfSubsets,Math.ceil(mediansOfSubsets.length/2))

  
  //partition around Pivot M
  let L1=[],L2=[],L3=[]
  let pivot=M 
  for (let j = 0; j < A.length; j++) {
      if(A[j]<pivot) L1.push(A[j])
      else if( A[j]==pivot)L2.push(pivot)
      else L3.push(A[j])
  }

  if (k <=L1.length)return select(L1,k)
  else if (k > L1.length+L2.length)return select(L3,k-L1.length-L2.length)
  else return L2[0] //k===L1.length+1
}



console.log(main(
  [1,2,3,5,6,6,6,21,31,3,5,13221,2331,1231,112,3313]
))
