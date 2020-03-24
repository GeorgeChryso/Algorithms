// An algorithm to compute if the levenstein distance between 2 strings is <=D
// The Levenshtein distance is a string metric for measuring the difference between the 2 sequences
// The minimum number of single-character EDITS ( insertions/ deletions/ substitutions )
// required to change one word into the other. 


//returns true if the Ldistance between s1,s2 <= distance
let levenshteinAutomaton=( s1,s2,distance)=>{

    //if any of the strings are "" that means that the levenstein distance is 
    // equal to the length of the non "" string.
    if ( s1.length==0 || s2.length==0)return Math.max(s1.length,s2.length)<=distance


    //assume s1[0] is not Used to build s2
    if(distance>0){
        // deletion
        if(levenshteinAutomaton(s1.slice(1),s2,distance-1))return true
        // substitution
        if(levenshteinAutomaton(s1.slice(1), s2.slice(1),distance-1))return true
    }

    //assume s1[0] is Used to build s2
    for (let i = 0; i < Math.min(s2.length, distance+1 ); i++) {
        //i is the position s1[0] MIGHT  be used
        // and  i is the number of characters needed to be inserted before using s1[i]
        if(s1[0]===s2[i]&&levenshteinAutomaton(s1.slice(1),s2.slice(distance+1),distance-i))return true

    }
    return false
}


console.log(levenshteinAutomaton(
    'adaa','bdaa' , 0
))