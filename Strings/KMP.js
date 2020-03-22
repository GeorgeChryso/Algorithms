
// Efficient Backtracking in a pattern so I can avoid reduntant comparisons when I match it against a string
// No backtracking is being made on the string.




//computing the lps

// LPS[i] tells me, if I have a mismatch at index i, what should i  try to match next? 
let computeLPS=(pattern)=>{
    let lps=[...Array(pattern.length)]
    lps[0]=0 //the first element is always 0
    let len=0 //essentially bot the index of pattern and the length
    // len always RESETS to lps[len-1] after a mismatch
 
    //fill lps[i]
    for (let i = 1; i < pattern.length; i++) {

        //match
        if(pattern[i]===pattern[len]){
            len++
            lps[i]=len
        }
        //mismatch of i and len
        else{
            //if len!=0 that means that
            // I can still go back to the previous letter
            if(len!=0){
                len=lps[len-1]
                i--
            }
            //if len==0 that means that i have to go to the beginning (first letter)
            else{
                lps[i]=len
            }
        } 
    }
    return lps  
}


let KMPsearch=(pattern,string)=>{
    let lps=computeLPS(pattern)
    let result=[]

    //j traverses pattern and i traverses string
    // notice that i never backtracks
    let i=0,j=0
    while(i<string.length){
        if(pattern[j]===string[i]){
            i++
            j++
        } 
        //full match of pattern
        if(j===pattern.length){
            result.push(i-j)
            j=lps[j-1]
        }
        //mismatch
        else if( i<string.length && pattern[j]!=string[i]){

            // Main thing, if j!=0 that means that i can try the 
            // index of the previous lps
            if(j!=0){
                j=lps[j-1]
            }
            //if j==0 i cant go any more back
            else i++
        }
    }

    return result
}


console.log(KMPsearch(
    'AAABA','AAAABAAAAABAAAAAABAAAAABBAAAABBAAAABAAAA'
))