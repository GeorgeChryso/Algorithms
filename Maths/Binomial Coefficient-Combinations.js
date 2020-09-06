

// combinations
// n choose k  

// 5 choose 2 = 5!/(2!*3!)
// order does not matter, just out of 5 elements how many 2-groups can u create
// the answer is 10 
// {1,2},{1,3},{1,4},{1,5}
// {2,3},{2,4},{2,5}
// {3,4},{3,5}
// {4,5}


//can be calculated using dp

var N=10// set total number  of elements 
var memo=[...Array(N+1)].map(d=>[...Array(N+1)])
var combinations=(n,k)=>{
    //base cases
    if(n===k||k===0)return 1
    if(memo[n][k]!==undefined)return memo[n][k]
    memo[n][k]=combinations(n-1,k-1)+combinations(n-1,k)
    return memo[n][k]
}



//alternative
var N=6// set total number  of elements 
var dp=[...Array(N+1)].map(d=>[...Array(N+1)].map(d=>0))
//basecases
for (let i = 1; i <=N; i++) {
    dp[i][0]=1 //combinations n take 0 is 1 
    dp[i][i]=1 //combinations n take n is  1 
}
var combinations=(n,k)=>{
    for (let i = 1; i <=N; i++) {
        for (let k = 1; k <i; k++) {
            dp[i][k]=dp[i-1][k-1]+dp[i-1][k]            
        }        
    }
    return dp[n][k]
}

console.log(
    combinations(5,2)
)