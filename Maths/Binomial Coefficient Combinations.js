

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

var waysToSplit = function(A) {
    let n=A.length,prefix=[...Array(n+1)].map(d=>0),mod=1e9+7,result=0
    for(let i=0;i<n;i++)
        prefix[i+1]=prefix[i]+A[i]

    for(let i=0;i<n-2;i++){
        let firstpart=prefix[i+1]-prefix[0]
        let lo=i,hi=n-1
        while(lo<hi){
            let mid=(lo+hi)>>1
            if(prefix[mid]-prefix[i]>=firstpart)
                hi=mid
            else
                lo=mid+1
        }
        console.log('bi')
        let v1=lo
        lo=i,hi=n-1
        while(lo<hi){
            let mid=(lo+hi)>>1
            if(prefix[mid]-prefix[i]>firstpart)
                hi=mid
            else
                lo=mid+1
        }
        console.log('bi')

        let v2=hi
        console.log(v1,v2)
        result= (result+( v2-v1) )% mod
    }
    return result
    
};

console.log(waysToSplit(
    [1,2,2,2,5,0]))