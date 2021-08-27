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
// of a number
let binExp=(x,n,mod=1e9+7)=>{
    let curr=x,result=1
    while(n){ //using binary exponentiation
        if(n&1)
            result=(result*curr)%mod
        curr=(curr*curr)%mod
        n>>>=1
    }
    return result
}

//bigInt alternative
let binExp=(x,n,mod=BigInt(1e9+7))=>{
    let curr=BigInt(x),result=1n
    n=BigInt(n)
    while(n){ //using binary exponentiation
        if(n&1n)
            result=(result*curr)%mod
        curr=(curr*curr)%mod
        n>>=1n
    }
    return Number(result)
}
console.log(binExp(2,8))
//bigint 2
const powmod = (a, b, mod=BigInt(1e9+7)) => { let r = 1n;a=BigInt(a),b=BigInt(b);while (b > 0n) { if (b % 2n == 1) r = r * a % mod; b >>= 1n; a = a * a % mod; } return r; };

let matrixMult=(A,B,mod=1e9+7)=>{
    let n1=A.length,m1=A[0].length,n2=B.length,m2=B[0].length
    //A*B
    if(m1==n2){
        let M=[...Array(n1)].map(d=>[...Array(m2)])
        for(let i=0;i<n1;i++)
            for (let jj = 0; jj < m2; jj++){
                let res=0
                for(let j=0;j<m1;j++)
                        res= (res+A[i][j]*B[j][jj])%mod
                M[i][jj]=res
            }
        return M
    }
    //B*A, if A*B is not possible
    if(m2==n1)
        return matrixMult(B,A)
    return 'Impossible'
}
let binexpMatrix=(A,k,mod=1e9+7)=>{
    let curr=A,n=A.length,m=A[0].length,result=[...Array(n)].map((d,i)=>[...Array(m)].map((d,j)=>Number(i===j)))
    if(n!==m) // we can only exponentiate square matrices
        return 'Impossible'
    while(k){ //using binary exponentiation
        if(k&1)
            result=matrixMult(result,curr,mod)
        curr=matrixMult(curr,curr,mod)
        k>>>=1
    }
    return result
}

console.log(matrixMult(
    [ [1,3],[2,0],[1,-2]], [[2,1,3],[4,-1,2]]
 ))
console.log(binexpMatrix(
    [ [1,3],[2,0]],0
))
