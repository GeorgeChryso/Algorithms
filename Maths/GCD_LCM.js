


 // nice GCD problem : LC 1819
//GCD through euclidean theorem
//in O(log(Min(a,b)))
let gcd=(a,b)=>{
    while(b){
        a=a%b
        let temp=a
        a=b
        b=temp
    }
    return a
}
// gcd(0,a)=a, when

console.log(gcd(1180,481))

//LCM through the formula LCM(a,b)=a*b/GCD(a,b)
let LCM=(a,b)=>{
    return a*b/gcd(a,b)
}

console.log(LCM(4,5),LCM(4,2))