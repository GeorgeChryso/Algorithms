// I want to calculate the  (n!)%p , where p is PRIME

// in O(pLog n (base p) )
let factMod=(n,p=1e9+7)=>{
    let result=1,k=n,curr=1, need=[]
    while(k>1)
        need.push(k%p),
        k= (k/p)>>0
    need.sort((a,b)=>a-b) //miniscule complexity( Log_p_(n) * log_2_(Log_p_(n)))
    for(let i=1;i<=n&&need.length;i++){
        curr*=i
        while(need.length&&i==need[0]){
            need.shift()
            if(( (n/p)>>0 )&1)
                result=p-result
            result=result*curr%p
        }
    }
    return result
}
console.log(factMod(110))


// Legendre's Formula: Let p be prime, and n is integer, then 
// vp[n!] is the number of times p appears inside n!.
// vp[n!]= Sum (n/ p**i) >>0

let multiplicity_factorial=( n, p)=> {
    let count = 0;
    while (n)       
        n = (n/ p) >>0,
        count += n;
    return count;
}
console.log(multiplicity_factorial(6,2))


