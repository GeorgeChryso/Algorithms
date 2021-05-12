//snoob lo, returns the next lower number
// with the same number of set bits

let snooblo=y=>{
    let    t = y + 1;
     let  u = t ^ y;
      let  v = t & y;
     let   x = v - (v & -v) / (u + 1);
     return x
   }

//snoob hi, returns the next higher number
// with the same number of set bits

let snoob=x=>{
    // right most set bit 
    let rightOne = x & -x; 
    
    // reset the pattern and set next higher bit 
    // left part of x will be here 
    let nextHigherOneBit = x + rightOne; 

    // nextHigherOneBit is now part [D] of the above explanation. 

    // isolate the pattern 
    let rightOnesPattern = x ^ nextHigherOneBit; 

    // right adjust pattern 
    rightOnesPattern = (rightOnesPattern)/rightOne; 

    // correction factor 
    rightOnesPattern >>= 2; 

    // rightOnesPattern is now part [A] of the above explanation. 

    // integrate new pattern (Add [D] and [A]) 
    let next = nextHigherOneBit | rightOnesPattern; 
    return next
}

//now let's do snoob with an array,for a bigger number of digits
// so if i' m given for example an array [0,1,0,0,1] and this represents a big number
// and i want to return the next number with the same amount of set bits 
// i do the following
//*first i compress the array into indices where i==1
// so that would be  [0,1,0,0,1]->[2,0]  (reverse indexing)
// [2,0] should become [2,1]-> [0,1,0,1,0] the next snoob

let snoobArr=A=>{
    //look for the first (from the right) number that is not followed by its biggest number
    //so in our case 0 does not have 1 as its previous
    let n=A.length,targetIdx=0,bitsToAppend=n-1 //default 0, our last number
    if(n===1)
        return [A[0]+1]
    for(let i=n-1;i>0;i--){
        if(A[i-1]>A[i]+1){
            console.log(i)
            targetIdx=i
            bitsToAppend=A[i]-A[n-1]
            break
        }
    }
        
    // step 2 we have to delete everything from that number and 
    if(targetIdx===0)
        A=[A[0]+1]
    else{
        let val=A[targetIdx]+1
        A=A.slice(0,targetIdx)
        A.push(val)
    }
    // prepend it+1
    //and prepend the bits we ve said
    for(let i=bitsToAppend-1;i>=0;i--)
        A.push(i)
    return A
} 
console.log(snoobArr([
    8, 6, 5, 4,
    3, 2, 1, 0
  ] ))

//iterate over all subsets of a number, aka numbers that if they have set bits
// they have them in teh same position as the number
let number=233
for(let subset=number;subset>0;subset=(subset-1)&number)
    console.log(number.toString(2),subset.toString(2))





//get the  POSITION OF THE leftmost (Most significant) set bit of a number
let leftmostsetbit=x=>(Math.log(x)/Math.log(2) )>>0
// so for example leftmostsetbit ( 101 ) = 3 
console.log(5,leftmostsetbit(5))



//check if a is contained in b
// a&b<a