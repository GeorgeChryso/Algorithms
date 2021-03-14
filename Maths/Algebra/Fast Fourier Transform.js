let ArrayToComplex=A=>A.map(d=>[d,0])
let cAdd=([a,b],[c,d])=>[Number(a+c),Number(b+d)]
let cSubtr=([a,b],[c,d])=>[Number(a-c),Number(b-d)]
let cMul=([a,b],[c,d])=>[Number(a*c-b*d),Number(a*d+b*c)]
let cDiv2=([a,b])=>[a/2,b/2]

let fft=(A,wantInvert=false)=>{
    let n=A.length,a0=[...Array(n>>1)],a1=[...Array(n>>1)]
    if(n==1 )
        return 
    for (let i = 0; 2 * i < n; i++) 
        a0[i] = [...A[2*i]],a1[i] =[...A[2*i+1]]

    fft(a0,wantInvert)
    fft(a1,wantInvert)
    let ang=2*Math.PI/n*(wantInvert?-1:1),
        w=[1,0],wn=[Math.cos(ang),Math.sin(ang)]
    for (let i = 0; 2 * i < n; i++) {
        A[i] = cAdd(a0[i] , cMul(w ,a1[i]))
        A[i + (n>>1)] = cSubtr(a0[i], cMul(w,  a1[i]));
        if (wantInvert) 
            A[i]=cDiv2(A[i]),
            A[i + (n>>1)] =cDiv2(A[i + (n>>1)])
        w=cMul(w , wn);
    }
    return A
}

let callMeFFT=(A)=>{
    while(A.length & (A.length - 1))
        A.push(0) //make its length a power of two
    return fft(ArrayToComplex(A))
}

//CALL
//console.log(fft(ArrayToComplex([1,2,3,4])))


// Multiply 2 Polynomials in O(nlogn)
let MultiplyPolys=(A,B)=>{
    let n=1
    while(n<A.length+B.length)
        n<<=1
    let fA=[...Array(n)].map((d,i)=>i<A.length?[A[i],0]:[0,0]),
        fB=[...Array(n)].map((d,i)=>i<B.length?[B[i],0]:[0,0])

    fft(fA,false)
    fft(fB,false)
    for(let i=0;i<n;i++)
        fA[i]=cMul(fA[i],fB[i])
    fft(fA,true)
    let result=[...Array(n)]
    for(let i=0;i<n;i++)
        result[i]=Math.round(fA[i][0])
    return result
}

console.log(MultiplyPolys(
    [5,0,0,-2 ,4],[3,0,1]
))


// Multiply 2 LONG NUMBERS in O(nlogn)
let multiplyLongArithm=(A,B,base=10)=>{
    let result=MultiplyPolys(A,B),n=result.length,carry=0
    for(let i=0;i<n;i++)
        result[i]+=carry,
        carry=(result[i]/base)>>0,
        result[i]%=base
    while(result.length>1&&result[result.length-1]===0)
        result.pop()
    return result
}

console.log(multiplyLongArithm(
        [1,2,3],[3,2],10
))



/// Applications: Given 2 arrays A,B, find the number of ways to creat  all the sums that cointain at least 1 element from both A and B
let findNumWays=(A,B)=>{
    let mxA=Math.max(...A),mxB=Math.max(...B),
        fA=[...Array(mxA+1)].map(d=>0),
        fB=[...Array(mxB+1)].map(d=>0)
    for(let c of A)
        fA[c]=1
    for(let c of B)
        fB[c]=1
    return MultiplyPolys(fA,fB) // index:sum value:num of ways to create it 
}
console.log(findNumWays(
    [1,2,3],[2,4]
))