

//naive-trial division

// There is no divisor larger than sqrt(n)
// O(sqrt(n))
let trialDivision=n=>{
    if(n==1)
        return [ [],[]]
    // primefactors and their powers
    let primefactors=[],powers=[]
    for(let divisor=2;divisor*divisor<=n;divisor++){
        let pow=0
        while(n%divisor==0)
            pow++,n/=divisor
        if(pow)
            primefactors.push(divisor),powers.push(pow)
    }
    primefactors.push(n),powers.push(1) //push the number itself
    return [primefactors,powers]
}

console.log(trialDivision(21))

//precomputed primes up to sqrt(n) with Sieve and only check those
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
console.log(trialOptimized(21))




let fermat=n=>{
    let a=Math.ceil(Math.sqrt(n)),
        b2=a*a-n,b=Math.round(Math.sqrt(b2))
    while(b*b!==b2)
        a++,
        b2 = a*a - n,
        b=Math.round(Math.sqrt(b2))
    return a-b
}
console.log(fermat(21))
