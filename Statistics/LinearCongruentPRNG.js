





let mod=2**32
let multiplier=33797
let increment=1
let seed=1
let generateRandom=()=>{ //generates a random number
    seed=(seed*multiplier+increment)%mod
    return seed
}

//test
let arr=[...Array(10)].map(d=>0)
for (let i = 0; i < 100000; i++) {
    arr[generateRandom()%10]++
}
console.log(arr)