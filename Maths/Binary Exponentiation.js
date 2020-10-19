// the idea is simple
// raise an integer x to the power of N
// in O(logN) time

//How?
// Write N as sum of binary numbers
// example N=27=16+8+2+1=11011
// so i only have to calculate these powers and multiply them
// in order to get X**27=X^1 * X ^2 * X^8* X^16
// so write N as binary and do the shizzle

// so the mod here serves for cases of overflow,in case of modular inverse you need to replace this 
let binExp=(x,n,mod=1e9+1)=>{
    let curr=x,result=1
    while(n){ //using binary exponentiation
        if(n&1)
            result=(result*curr)%mod
        curr=(curr*curr)%mod
        n>>>=1
    }
    return result
}

console.log(binExp(2,8))