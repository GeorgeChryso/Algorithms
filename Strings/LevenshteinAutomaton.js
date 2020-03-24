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
        if(s1[0]===s2[i]&&levenshteinAutomaton(s1.slice(1),s2.slice(distance+1),distance-i))return true

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
        dp[0][i]=i
        dp[i][0]=i        
    }

    // dp formula               DELETE           INSERTION       REPLACE
    // dp[i][j]= Math.min( dp[i-1][j] +1 , DP[i][j-1]+1 , dp[i-1][j-1] + Number(A[i]===B[j]) )

    for (let i = 1; i < s1.length; i++) {
        for (let j = 1; j < s2.length; j++) {
            //dp formula             DELETE        INSERTION       REPLACE
            dp[i][j]= Math.min( dp[i-1][j] +1 ,   dp[i][j-1]+1 , dp[i-1][j-1] + Number(A[i]===B[j]) )            
        }        
    }

    return dp[s1.length][s2.length]<=distance
}

//julesJacobs implementation 
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
        for (let i = 0; i < state.length-1; i++) {
            let cost= (this.s[i]==char)?0:1
            //dp formula
            new_state.push(Math.min( new_state[i]+1, state[i]+cost, state[i+1]+1   ))
        }
        return new_state
    }

    isMatch=state=>state[state.length-1]<=this.maxDist

    canMatch=state=>Math.min(...state)<=this.maxDist
}

//usage
// I want to find the strings that are distance <=2 from banana 
let automaton=new LevenshteinAutomatonX('banana',2)

let state0=automaton.start()
let state1=automaton.step(state0,'w')
console.log( automaton.canMatch(state1)) //True, the Ldistance from 'w' to banana is 1, can match
let state2= automaton.step(state1,'o')
console.log( automaton.canMatch(state2)) //False, the Ldistance from 'wo' to banana is 2, cant match 



console.log(levenshteinAutomaton(
    'adaa','bdaa' , 0
))