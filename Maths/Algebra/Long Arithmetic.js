


// representation of big number using a base (for example 100)
// 20.135=base(10)=> [5,3,1,0,2]
// 20.135=base(100)=>[35,01,2]
// 20.135=base(1000)=>[135,20]
let addition=(a,b,base=10)=>{
    let carry=0
    for(let i=0;i< Math.max(a.length,b.length)||carry;i++){
        if(i===a.length)
            a.push(0)
        a[i]+= carry+ (i<b.length?b[i]:0)
        carry= Number(a[i]>=base)
        if(carry)
            a[i]-=base
    }  
    return a
}

console.log(addition( [9,2,3,9],[1,2,3,9,9]))
console.log(addition( [78,56],[00,91],100))
console.log(addition( [1,0,1],[1,1,1],2))

// Doesnt support negative results, so even if a =2 and b=3 a-b=1
let subtraction=(a,b,base=10)=>{
    //determine what's bigger, a or b
    let i=a.length-1,j=b.length-1
    while(i>=0&&j>=0&&a[i--]===b[j--])
        null

    if(i<0||j<0){
        if(i<0&&j<0)
            return [0] //equals
        else if(i<0)
            return subtraction(b,a,base)
    }
    if(i>=0&&j>=0)
        if(b[j]>a[i])
            return subtraction(b,a,base)

    let carry=0
    for(let i=0;i< b.length||carry;i++){
        a[i]-= carry+ (i<b.length?b[i]:0)
        carry=Number(a[i]<0)
        if(carry)
            a[i]+=base
    }  
    while(a.length>1&&a[a.length-1]===0) //remove leading zeroes
        a.pop()
    return a
}
console.log(subtraction( [1,2,3,9,9],[9,2,3,9]))

//a*b when b<base
let multiplicationShortB=(a,b,base=100)=>{
    let carry=0
    for(let i=0;(i<a.length)|| carry; i++){
        if(i===a.length)
            a.push(0)
        let cur=carry+ a[i]*b
        a[i]=cur%base
        carry=(cur/base)>>0
    }
    while(a.length>1&&a[a.length-1]===0)
        a.pop()
    return a
}
// a*b when b>base
let multiplicationLongB=(a,b,base=100)=>{
    let c=[...Array(a.length+b.length)].map(d=>0)//result
    for(let i=0;(i<a.length); i++)
        for (let j = 0,carry=0;( j < b.length)||carry; j++) {
            let cur=c[i+j]+a[i]*(j<b.length?b[j]:0) + carry
            c[i+j]= cur%base
            carry=(cur/base)>>0
        }
    while(c.length>1&&c[c.length-1]===0)
        c.pop()
    return c
}
console.log(multiplicationLongB(
    [1,2,3],[3,2,1],10
))

// a/b when b<base
let divisionShort=(a,b,base=10)=>{
    let carry = 0;
    for (let i=a.length-1; i>=0; --i) {
        let cur = a[i] + carry* base;
        a[i] = (cur / b)>>0
        carry =(cur % b)
    }
    while (a.length > 1 && a[a.length-1] == 0)
        a.pop()
    return [a,carry] //[ result, remainder]
} 