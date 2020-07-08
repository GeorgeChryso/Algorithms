//Rolling Hash for string matching
var RabinKarp=(pattern,string)=>{
    let m=pattern.length



    //SWITCH HERE FOR DIFFERENT VALUES
    let base=31 //the total distinct elements my string can have(for example 256 for ASCII, 26 for lowercase)
    let mod=1e9+9   // A PRIME NUMBER FOR BETTER PROBABILITY OF NO FALSE POSITIVE COLLISION ( has to be >pattern.length or str.length)
    let prehash=x=>x.charCodeAt(0) // Maps any element of my string/array to a number

    let hash=(x,i)=>{
        return (prehash(x)-64)*(base**(m-i))
    }

    //calculate the sum of the hashed letters of my pattern
    let patValue=0
    for (let i = 0; i < m; i++) {
        patValue+=hash(pattern[i],i)        
    }
    let hashValueP=patValue%mod


    let result=[] //holds the starting indexes of the matches

    let curValue=0
    let windowSize=0
    //rolling window of size m 
    for (let i = 0; i <= string.length; i++) {

        //the first m characters are accumulated
        if(windowSize<m){
            curValue+=hash(string[i],i)
            windowSize++
        }
        //windowSize===m  sliding the window 
        else{
            // console.log(pattern,string.slice(i-m,i),)
            // console.log(patValue,curValue,'\n')

            let hashValueCurr= curValue%mod;
            //consider equality for the PREVIOUS i as the LAST ELEMENT
            if (hashValueP===hashValueCurr){
// !!!WARNING: the below operation can reduce your runtime to O(n*m) if your hash / prime arent the correct ones 
                if(pattern===string.slice(i-m,i))result.push(i-m) 
            }

            if(i===string.length)break //consider the last window 
            //but dont go any further (cos there is no string[string.length])


            //SLIDING THE WINDOW MATHS

                //first remove the first element of my window
                curValue-=hash(string[i-m],0)
                // always multiply by 10 to roll the window
                curValue*=base
                //add my new element
                curValue+=hash(string[i],m-1)
            
        }

    }

    return result 
}



//more concise 
// average O(N) with a nice hash and prime , worst O(M*N),faster O(logN)
var RabinKarp=(pattern,string)=>{

    //SWITCH HERE FOR DIFFERENT VALUES
    let base=26 //the total distinct elements my string can have(for example 256 for ASCII, 26 for lowercase)
    let prime=1e9+9   // A PRIME NUMBER FOR BETTER PROBABILITY OF NO FALSE POSITIVE COLLISION ( has to be >pattern.length or str.length)
    let prehash=x=>x.charCodeAt(0)-64 // Maps any element of my string/array to a number
    let hash=(x,i)=>prehash(x)*(base**(m-i))


    let m=pattern.length,n=string.length
    let patValue=0, curValue=0, result=[] //holds the starting indexes of the matches

    //rolling  window of size m 
    for (let i = 0; i <= n; i++) {
       //calculate the sum of the hashed letters of my pattern and the first m letters of my string 
        if(i<m){
            curValue+=hash(string[i],i)
            patValue+=hash(pattern[i],i) 
        }
        //windowSize===m  sliding the window 
        else{

            let hashValueP=patValue%prime, hashValueCurr= curValue%prime;
            
            if (hashValueP===hashValueCurr){ //consider equality for the PREVIOUS i as the LAST ELEMENT
                //check for equality first
                if(pattern===string.slice(i-m,i))result.push(i-m)//??
            }
            if(i===n)break //consider the last window 
            curValue= (curValue-hash(string[i-m],0))*base+hash(string[i],m-1)     
        }
    }

    return result 
}

console.log(RabinKarp(
    'AAABA','AAAABAAAAABAAAAAAZBAZZAAAABBAAAABBAAAABAAAA'
))