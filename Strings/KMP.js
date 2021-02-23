
// Efficient Backtracking in a pattern so I can avoid reduntant comparisons when I match it against a string
// No backtracking is being made on the string.




//computing the lps
// so if lps[10]=5 that means pattern[6,7,8,9,10]====pattern[0,1,2,3,4] ( prefix==suffix at index i )
// so lps[lps.length-1] has the length of the longest prefix that is also a suffix
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
    //j traverses pattern and i traverses string
    let lps=computeLPS(pattern),result=[],i=0,j=0
    while(i<string.length){
        if(pattern[j]===string[i])
            i++,j++
        if(j===pattern.length) //full match of pattern
            result.push(i-j),
            j=lps[j-1]
        else if( i<string.length && pattern[j]!=string[i])//mismatch
            if(j!=0) //try the index of the previous lps
                j=lps[j-1]
            else  //if j==0 i cant go any more back
                i++
    }
    return result //result has the first indices of full matches of pattern against string
}


console.log(KMPsearch(
    'AAABA','AAAABAAAAABAAAAAABAAAAABBAAAABBAAAABAAAA'
))