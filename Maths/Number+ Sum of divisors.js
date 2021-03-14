


// Step 1:
// get the prime factorization of n 
let EratosFaster=n=>{
    let lpf=[...Array(n+1)].map(d=>false), //lowest prime factor of i
        primes=[]
    for (let i=2; i<=n; ++i) {
        if (!lpf[i]) 
            lpf[i] = i,primes.push(i)
        for (let j=0; j<primes.length && primes[j]<=lpf[i] && i*primes[j]<=n; ++j)
            lpf[i * primes[j]] = primes[j];
    }
   return primes
}
// O(sqrt(n))
let trialOptimized=n=>{
    if(n==1)
        return [ [],[]]
    //calculate all primes up to sqrt(n) => O(sqrtN)
    let primes=EratosFaster(n),primefactors=[],powers=[]
    for(let prime of primes){
        if(prime*prime>n)break
        let pow=0
        while(n%prime===0)
            pow++,n/=prime
        if(pow)
            primefactors.push(prime),powers.push(pow)
    }
    primefactors.push(n),powers.push(1) //push the number itself
    return [primefactors,powers]
}


// if n= (p1^e1 )*( p2^e2) * ... * (pk^ek)
// then count of divisors= (e1+1)*(e2+1)*...*(ek+1)
let numberOfDivisors=(n,mod=1e9+7)=>{
    let [primefactors,powers]=trialOptimized(n),result=1
    primefactors.forEach( (prime,i)=>result= (result * (powers[i]+1 )% mod) %mod )
    return result
}
console.log(numberOfDivisors(12))

let sumOfDivisors=(n)=>{ //modulo can be tricky cos it needs modular inverse
    let [primefactors,powers]=trialOptimized(n),result=1

    primefactors.forEach( (prime,i)=>
        result*= (prime**(powers[i]+ 1)-1) /(prime-1)
    )
    return result
}
console.log(sumOfDivisors(6))