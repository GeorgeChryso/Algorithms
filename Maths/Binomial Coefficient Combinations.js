

// combinations
// n choose k  

// 5 choose 2 = 5!/(2!*3!)
// order does not matter, just out of 5 elements how many 2-groups can u create
// the answer is 10 
// {1,2},{1,3},{1,4},{1,5}
// {2,3},{2,4},{2,5}
// {3,4},{3,5}
// {4,5}

var combinations=(n,k)=>{
    var dp=[...Array(n+1)].map(d=>[...Array(k+1)].map(d=>0))
    //basecases
    for (let i = 0; i <=n; i++) 
        dp[i][0]=1,dp[i][i]=1 
    
    for (let i = 1; i <=n; i++) 
        for (let k = 1; k <i; k++) 
            dp[i][k]=dp[i-1][k-1]+dp[i-1][k]      
                  
    return dp[n][k]
 }

console.log(combinations(5,2))