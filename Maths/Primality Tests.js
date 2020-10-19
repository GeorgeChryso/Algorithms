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



//Fermat's little theorem states that if gcd(a,p)=1, then 
// for a prime number p=> a**(p-1)%p=1
// In general,this does not hold for composites. 
// But in practice I ll have to basically check every such 
// case of  aε[2,p-2], which isnt better than the naive division above

