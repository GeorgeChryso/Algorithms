// An algorithm to compute if the levenstein distance between 2 strings is <=D
// The Levenshtein distance is a string metric for measuring the difference between the 2 sequences
// The minimum number of single-character EDITS ( insertions/ deletions/ substitutions )
// required to change one word into the other. 


//returns true if the Ldistance between s1,s2 <= distance
// O(n**2)
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
        if(s1[0]===s2[i]&&levenshteinAutomaton(s1.slice(1),s2.slice(i+1),distance-i))return true

    }
    return false
}

//dp approach O(s1.length*s2.length)
let levenshteinDP=(s1,s2,distance)=>{

    let dp=[...Array(s1.length+1)].map(d=>[...Array(s2.length+1)].map(q=>0))

    //dp[i][j]= Levenshteindistance between s1[0...i] and s2[0...j]
    
    //basecases dp[i][0] =i, because the distance from anything to "" is anything.length
    //dp[0][j]=j, same reason
    for (let i = 0; i <=s1.length; i++) {
        dp[i][0]=i        
    }
    for (let j = 0; j <=s2.length; j++) {
        dp[0][j]=j        
    }

    // dp formula               DELETE s2[j]    INSERTION  of s1[i]     REPLACE s2[j] with s1[i]
    // dp[i][j]= Math.min( dp[i-1][j] +1 , DP[i][j-1]+1 , dp[i-1][j-1] + Number(s1[i]===s2[j]) )

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            //dp formula         DELETE s2[j]   INSERTION  of s1[i-1]       REPLACE s2[j] with s1[i] (not if they re equal)
            dp[i][j]= Math.min( dp[i-1][j] +1 ,   dp[i][j-1]+1      , dp[i-1][j-1] + Number(s1[i-1]!==s2[j-1]) )            
        }        
    }

    console.log(dp)
    return dp[s1.length][s2.length]<=distance
}


console.log(levenshteinDP(
    'adaa','bdaa' , 0
))




//julesJacobs implementation 
// each state of the automaton is a row of my dp table of the previous solution
// a modification on the dp formula ( an upper bound ) ensures that my automaton has finite number of states
class LevenshteinAutomatonX{
    //given the query string and a maxLDistance
    constructor(string,maxLDistance){
        this.s=string
        this.maxDist=maxLDistance
    }

    //returns the start state (the beginning row of the dp solution )
    start=()=> [...Array(this.s.length+1)].map((d,i)=>i) //dp[0][i]=i

    //returns the next state given a state and a character
    //essentially same as the 2nd for loop in dp transitioning from one row to the next
    step=(state,char)=>{
        let new_state=[state[0]+1] // this is the new array with the  fixed dp[i][0]=i
        for (let i = 1; i < state.length; i++) {
            let cost= (this.s[i]==char)?0:1
            //dp formula                // DELETE  , REPLACE IF DIFF , INSERT , an upper bound to make the nubmer
            // of states of my automaton finite
            new_state.push(Math.min( new_state[i-1]+1, state[i-1]+cost, state[i]+1 , this.maxDist+1  ))
        }
        return new_state
    }

    //dp[s1.length][s2.length] <=distance
    isMatch=state=>state[state.length-1]<=this.maxDist
    
    //there is a state potentially able to match  in the future/already matched
    canMatch=state=>state.some(d=>d<=this.maxDist)

    //  the automaton needs to tell us which letters to try from a given state.
    //  We only need to try the letters that actually appear in the relevant positions in the query string
    // If the query string is “banana” we don’t need to try “x”, “y”, and “z” separately, since they all have the same result. Also, if an entry in the state is already 3, we don’t need to try the corresponding letter in the string, since it can never cause a match anyway. Here’s the code to compute the letters to try:
    transitions=state=>state.filter(d=>d<=this.maxDist).map((d,i)=>this.s[i])
}   

//usage
// I want to find the strings that are distance <=2 from banana 
let automaton=new LevenshteinAutomatonX('banana',2)

let state0=automaton.start()
console.log(state0)
let state1=automaton.step(state0,'w')
console.log( automaton.canMatch(state1),state1) //True, the Ldistance from 'w' to banana is 1, can match
console.log(automaton.transitions(state1))
let state2= automaton.step(state1,'o')
console.log( automaton.canMatch(state2),state2) //False, the Ldistance from 'wo' to banana is 2, cant match 
console.log(automaton.transitions(state2))

