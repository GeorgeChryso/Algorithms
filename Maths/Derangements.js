



//returns the number of derangements for n different objects
// aka the number of permutations where NO element keeps its original position
let Derangements=n=>{
    let dp=[...Array(n+1)].map(d=>1)
    for (let i = 1; i <=n; i++)
        dp[i]=dp[i-1]*i + (-1)**i        
    return dp[n]
}

//alternatively
let Derangements2=n=>{
    let dp=[...Array(n+1)].map(d=>0)
    dp[2]=1
    for (let i = 3; i <=n; i++)
        dp[i]= (i-1)*(dp[i-1]+dp[i-2])    
    return dp[n]
}

let tests=[0,1,2,3,4,5,6,7,8,9,10,11,12,13]

console.log(tests.map(d=>Derangements(d)))

console.log(tests.map(d=>Derangements2(d)))
