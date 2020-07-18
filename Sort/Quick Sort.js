



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

//randomized Quick Select for stable Performance over large INPUTS
// tldr: instead of always choosing the last element as a pivot, i swap its place with a random element inside the array and use it as a pivot, instead
let RandomizedQuickSort=Arr=>{
  let partition=(lo,hi)=>{
    let random=Math.floor(Math.random()*(hi-lo+1))
    [Arr[hi],Arr[random]]=[Arr[random],Arr[hi]]
    let i=lo,pivot=Arr[hi]
    for (let j = lo; j <hi; j++) {
        if(Arr[j]<pivot){
          [Arr[i],Arr[j]]=[Arr[j],Arr[i]] 
          i++
        }      
    }
    return i
  }

  let QSstep=(start,end)=>{
    let partitionIdx=partition(start,end)
    QSstep(start,partitionIdx-1)
    QSstep(partitionIdx+1,end)
  }
  
  QSstep(0,Arr.length-1)
  return Arr
}






//reference 215 LC

// Median of Medians deterministic Select
let Dselect=(A,k)=>{


  if(A.length<=10){
      A.sort((a,b)=>a-b)
      return A[k]
  }

  // partition into subsets of 5 elements
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
      mediansOfSubsets.push(Dselect(subset,3)) //guaranteed to hit the first if Clause
  }

  let M=Dselect(mediansOfSubsets,Math.ceil(mediansOfSubsets.length/2))

  
  //partition around Pivot M
  let L1=[],L2=[],L3=[]
  let pivot=M 
  for (let j = 0; j < A.length; j++) {
      if(A[j]<pivot) L1.push(A[j])
      else if( A[j]==pivot)L2.push(pivot)
      else L3.push(A[j])
  }

  if (k <=L1.length)return Dselect(L1,k)
  else if (k > L1.length+L2.length)return Dselect(L3,k-L1.length-L2.length)
  else return L2[0] //k===L1.length+1
}


// Quick Select
var Qselect=(Arr,k)=>{
  //EDIT COMPARATOR
  let comparator=(a,b)=>a[0]-b[0]  

  let partition=(l,h)=>{
      let pivot=Arr[h]  // notice that i consider the pivot as the last element
      let i=l 
      for (let j = l; j < h; j++) {
          if( comparator(Arr[j],pivot)<0){
            [Arr[i],Arr[j]]=[Arr[j],Arr[i]] 
            i++
          }        
      }
      [Arr[i],Arr[h]]=[Arr[h],Arr[i]]
      return i
  } 

  let low=0
  let high=pq.length-1
  while(low<high){
      let indexOfPivot=partition(low,high) 
      if(indexOfPivot<k)low=indexOfPivot+1
      else if(indexOfPivot>k)high=indexOfPivot-1
      else break //case k
  }
  return Arr[k]

}




console.log(Dselect(
  [1,2,3,5,6,6,6,21,31,3,5,13221,2331,1231,112,3313],2
))
