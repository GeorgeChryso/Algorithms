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
console.log(Eratosthenes(16))


//Fermat's little theorem states that if gcd(a,p)=1, then 
// for a prime number p=> a**(p-1)%p=1
// In general,this does not hold for composites. 
// But in practice I ll have to basically check every such 
// case of  aε[2,p-2], which isnt better than the naive division above

