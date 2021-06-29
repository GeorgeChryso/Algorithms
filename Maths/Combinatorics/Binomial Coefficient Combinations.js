

// combinations
// n choose k  

// 5 choose 2 = 5!/(2!*3!)
// order does not matter, just out of 5 elements how many 2-groups can u create
// the answer is 10 
// {1,2},{1,3},{1,4},{1,5}
// {2,3},{2,4},{2,5}
// {3,4},{3,5}
// {4,5}

var combinations=(n,k,mod=1e9+7)=>{
    var dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>0n))
    //basecases
    for (let i = 0; i <=n; i++) 
        dp[i][0]=1n,dp[i][i]=1n
    
    for (let i = 1; i <=n; i++) 
        for (let k = 1; k <i; k++) 
            dp[i][k]=(dp[i-1][k-1]+dp[i-1][k])%BigInt(mod) 
                  
    return dp[n][k]
 }

 console.log(combinations(200,100))


//returns BigInt, better on memory
let memo=new Map()
var combinations=(n,k,mod=BigInt(1e9+7))=>{
    let key=[n,k].toString()
    if(!memo.has(key)){
        let res
        if(k==0||n==k)
            res= 1n
        else
            res=(combinations(n-1,k-1)+combinations(n-1,k))%mod
        memo.set(key,res)
    }
    return memo.get(key)
}
console.log(combinations(200,100))



// Stars and Bars technique
// Say I have n indistinguishable balls and I want to divide them into k distinguishable containers
// the number of ways to do that is combinations( n+k-1,k-1)



// let N=61,P=43787  (P>> MAX(N-K,K))
// BINOMIAL COEFFICIENT  ( N CHOOSE K ) MOD LARGE PRIME P========================================
let factorial=[...Array(N+1)].map(d=>1)
for (let i = 1; i <= N; i++) 
    factorial[i] = (factorial[i - 1] * i) % P;

var extendedEuclidean=( a,  b) =>{
    if (a == 0) 
        return [b,0,1];
    let [g,x1,y1]= extendedEuclidean(b % a, a),
        x = y1- Math.floor(b / a) * x1,
        y = x1;
    return [g,x,y];//gcd,solution x , solution to y
}
var modInverse=(a,b)=>{
    let [g,x,y]=extendedEuclidean(a,b)
    if(g!==1)return "Not possible" 
    return (x%b+b)%b 
}
//THIS WORKS FOR 1E9+7
var combinationsModP=(N,K,P=1e9+7)=>{ //SINGLE QUERY O(logP)
    // IF WE WANT SINGLE QUERIES WE CAN DO IT IN O(LogP)=> O(N+ Q*logP) for Q queries
    return  ((factorial[N] * modInverse(factorial[K],P)) %P  *modInverse(factorial[N - K],P))% P ;
}
console.log(combinationsModP(61,4,43787))

//  THIS TAKES O(P) space. So if P is 1e9+7 this will TLE
let ModInverse=[...Array(P+1)]
    ModInverse[1]=1
for(let i=2;i<=P;i++)
    ModInverse[i]= P-  ((P/i)>>0)*ModInverse[P%i]  %P

var combinationsModP=(N,K,P)=>{ //SINGLE QUERY O(1)
    return  ((factorial[N] * ModInverse[ factorial[K] ] )%P  * ModInverse[ factorial[N - K]] ) % P;
}
console.log(combinationsModP(61,4,43787))



//===========================================================

// (N CHOOSE K) MOD ( P^b  ),where P is prime (P^b is obviously not prime)
//  ONLY IF  p <= Max( N-K,K)
// So the problem here is that   if X=Max(N-K,K)>=p then necessarily X=( p^c1 )*.... *
// where c1 is some power of the prime, which means that X is not coprime with our prime, since its divisible by it. 

// so what we can do is create a function  which basically is X! rid of its prime factor P 

//  g(X)= __X!__
//          P^c

// then (N CHOOSE K ) % MOD (P^B=)= 
//   ____N!____ %P   =  _________g(N)* P^c1______  = ___g(N)__  * P^(c1-c2-c3)
//    (N-K)! K!         g(K)* P^c2 * g(N-K) * P^c3  g(K) g(N-K)
// c1,c2,c3 are the multiplicities of N,  K, N-K respectively 
// can be calculated through thjreo jreo


// So we want to calculate (N choose K) mod (P^b) ,where P <= Max(N-K,K)

//var N , K , P , b 
let g=[...Array(N+1)].map(d=>1), //the value of g(X)=X!/P^C(X)
    c=[...Array(N+1)].map(d=>0), // C(x) , the biggest power of p such  that (X!)%(p^C)==0 (multiplicity)
    powC={0:1},currentPowerP=1

for(let i=1;i<=N;i++)
    if(i===P*currentPowerP)
        c[i]=c[i-1]+1,
        g[i]=g[i-1]*currentPowerP,
        currentPowerP=currentPowerP*P,
        powC[c[i]]=currentPowerP
    else
        c[i]=c[i-1],
        g[i]=g[i-1]*i

// SINGLE QUERY IN O(LOG(P**b))
var extendedEuclidean=( a,  b) =>{
    if (a == 0) 
        return [b,0,1];
    let [g,x1,y1]= extendedEuclidean(b % a, a),
        x = y1- Math.floor(b / a) * x1,
        y = x1;
    return [g,x,y];//gcd,solution x , solution to y
}
var modInverse=(a,b)=>{
    let [g,x,y]=extendedEuclidean(a,b)
    if(g!==1)return "Not possible" 
    return (x%b+b)%b 
}
let binom=(N,K,P,b)=>{ //O(log(P**b))
    let mod=P**b
    if(c[N]-c[N-K]-c[K]>=b)
        return 0
    return  ((((g[N] * modInverse( g[K],mod))%mod) * modInverse(g[N-K],mod)%mod) * powC[c[N]-c[N-K]-c[K]]) %mod 
}

// MANY QUERIES IN O(1),but extra O(P**b) precomputation +space
let  ModInverse=[...Array(P**b+1)].map(d=>1)
for(let i=2;i<=P**b;i++)
    ModInverse[i]= P**b-  (((P**b)/i)>>0)*ModInverse[(P**b)%i]  %(P**b)
let binom=(N,K,P,b)=>{ //O(1)
    let mod=P**b
    if(c[N]-c[N-K]-c[K]>=b)
        return 0
    return  ((((g[N] * ModInverse[g[K]])%mod) * ModInverse[g[N-K]]%mod) * powC[c[N]-c[N-K]-c[K]]) %mod 
}


                // WHEN N IS HUUUUUUUUUGE
//======================LUCAS THEOREM===================================///
// (N choose K) % Prime =  Π  ( (ni choose ki)  mod Prime) 

// where N= n0 + p*n1 +p^2 *n2 +...+ p^q *nq  ( BASE P expansion  of N ...and K)