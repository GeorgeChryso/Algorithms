//MILLER RABIN
// FERMAT'S LITTLE THEOREM
// BAILY PSW



// Naive 
// A divisor of x can be a number less than sqrt(x)
// so i am searching for a divisor in the range [2,sqrt(x)] checking %
// Complexity O(n)
let isPrime=n=>{
    for (let candidate = 0; candidate <= Math.sqrt(n); candidate++) 
        if(n%candidate==0)
            return true   
    return false
}
// The above naive implementations can have multiple optimizations:
// i.e: checking just the odds, etc

// Sieve of Eratosthenes finds ALL prime numbers in [1,n]
// and takes O(nloglogn) runtime and O(n) space
// so do NOT use it to calculate whether a single
// number is prime, the naive method is faster
// Idea: keep marking composites as not Prime,
// first mark 2 4 6 8 10
// then 3 6 9 
// then 4 8 etc
// those that are not marked, are not prime
let Eratosthenes=n=>{
    let isPrime=[...Array(n+1)].map(d=>true)
    isPrime[0]=false,isPrime[1]=false
    for (let i = 2; i <= n; i++) 
        if (isPrime[i] && i * i <= n) //notice that you never mark the first element of your iteration i.e. isPrime[i] as true
            for (let j = i*i ; j <= n; j += i)
                isPrime[j] = false;
    
    return isPrime.map((d,i)=>d?i:false).filter(d=>d) //return the primes
}

//faster optimization O(n)
// that also gets me the lowest prime factor of i
let EratosFaster=n=>{
    let lp=[...Array(n+1)].map(d=>false) //lowest prime factor of i
    ,pr=[]
    for (let i=2; i<=n; ++i) {
        if (lp[i] == 0) {
            lp[i] = i;
            pr.push(i);
        }
        for (let j=0; j<pr.length && pr[j]<=lp[i] && i*pr[j]<=n; ++j)
            lp[i * pr[j]] = pr[j];
    }
    console.log(lp)
   return pr
}

console.log(EratosFaster(16))


//Fermat's little theorem states that if gcd(a,p)=1, then 
// for a prime number p=> a**(p-1)%p=1
// In general,this does not hold for composites. 
// But in practice I ll have to basically check every such 
// case of  aε[2,p-2], which isnt better than the naive division above

//Miller Rabin Test for primality of n
// High probability of sucess, 75%

//returns true if n is probably prime
let MillerRabin=(n,iterations=5)=>{
    if(n<4) //the only primes below 4 are 2 and 3
        return n==2||n==3
    //88% of all numbers have a prime factor smaller than 100
    //so if i check if one of the primes in the range [0,100]
    // is a divisor, i have more chances of catching a composite
    // i can get all the primes in O(100) with sieve of eratosthenes
    // but it's easier to just manually check em for the same complexity
    if(n>100)
        for (let i = 4; i < 100; i++) 
            if(n%i==0)
                return false        
    

    let s=0,d=n-1//n-1 is even
    //basically writes n-1 as 2**(s) *d
    //in order to do that , we can instead 
    // keep shifting right s times// aka dividing by two
    // until i meet an odd number d 
    // then n-1 =( 2**s )* d for the reverse operation to hold
    while ((d & 1) == 0) {
        d >>= 1;
        s++;
    }
    //perform 5 tests of random integers a in the range [2,n-2]
    //if they fail one of the two Miller Rabin conditions, n is composite
    // if they pass, we check another random
    // we can increase the number of iterations, to be more sure of the result
    for (let i = 0; i < iterations; i++) {
        let a = 2 + ((Math.random()*(n-3)) >>0); //test the random integer a in the range [2,n-2]
        
        if (check_composite(n, a, d, s)) //through Fermat's Little Theorem
        //n is the number, a is the candidate, d is 
            return false;
    }
    return true
}

// number to check if prime, candidate for MR conditions, d
let check_composite=(n,a,d,s)=>{
    //raise a to the d modulo n 
    //through binary exponentiation
    let x=binExp(a,d,n) // x=[a^(d)] %n
    if(x==1||x==n-1){
        //check if the first condition holds
        return false  //if it holds then we assume it's not composite
    } 
    for (let r = 1; r < s; r++) { 
        x = (x * x) % n; //create  a^( (2^r) *d)
        if (x+1== n ){ //check if 2nd the condition holds
            return false; //if it holds then we assume it's not composite
        }
    }
    return true //if both of them dont hold, then its composite
}

let binExp=(x,n,mod)=>{
    let curr=x,result=1
    while(n){ 
        if(n&1)
            result=(result*curr)%mod
        curr=(curr*curr)%mod
        n>>>=1
    }
    return result
}

console.log(MillerRabin(1e9+7))
// let s='15311543154915531559156715711579158315971601160716091613161916211627163716571663166716691693169716991709172117231733174117471753175917771783178717891801181118231831184718611867187118731877187918891901190719131931193319491951197319791987199319971999200320112017202720292039205320632069208120832087208920992111211321292131213721412143215321612179220322072213222122372239224322512267226922732281228722932297230923112333233923412347235123572371237723812383238923932399241124172423243724412447245924672473247725032521253125392543254925512557257925912593260926172621263326472657265926632671267726832687'
// let n=s.length,candidates=[]
// for(let i=0;i<n-4;i+=4)
//     candidates.push(Number(s.slice(i,i+4)))
// console.log(candidates.length)
// //recognizes all 148 primes