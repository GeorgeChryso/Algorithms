//calculate the modular inverse of an element mod m using the extended euclidean algorithm


 // way1 , consider that I m given a Linear Diophantine equation
 // a*x + n* y=1 , with unknown x and y
 // I can immediately find amodn 's inverse.



let extendedEuclidean=( a,  b) =>{
    if (a == 0) 
        return [b,0,1];
    
    let [g,x1,y1]= extendedEuclidean(b % a, a),
        x = y1- Math.floor(b / a) * x1,
        y = x1;
    return [g,x,y];//gcd,solution x , solution to y
}
 

 // A  number a has a modular inverse mod b  <=> gcd(a,b)=1
 // then ax+by=1 ====> x is the modular inverse of a modb
 // If a number a has a modular inverse modb , then I can find the triplet extended euclidean gives me
 // x is the inverse of a modb
// BUT, X CAN BE A NEGATIVE NUMBER, THAT'S WHY I HAVE TO  FIND THE EQUILEVANT POSITIVE NUMBER

let modInverse=(a,b)=>{

    let [g,x,y]=extendedEuclidean(a,b)
    if(g!==1)return "Not possible" //gcd(a,mod) has to be 1 for the inverse to exist
    
    return (x%b+b)%b //picks the positive x
}



console.log(extendedEuclidean(7,15))
console.log(modInverse(7,15))


console.log(modInverse(11,13))



// By Fermat's little theorem ,only when M is prime
// I can calculate the multiplicative inverse of X modulo M
// intantly, it is X**(M-2), but this can overflow, so let's do it 
// step by step using %M each time

//calculates the Modular Multiplicative inverse of X modulo M
// Fermat's little theorem states taht 
// x**(p-1)%p =1
// that means that (x* x**(p-2) )%p=1
// but that means that  x**(p-2) is the multiplicative inverse of x mod p
let FMLT=(X,M)=>{
    //if (M) not prime, return 'USE EXTENDED EUCLIDEAN INSTEAD'
// ===================================
//     TOADD, PRIMALITY TEST FOR M that runs in less than O(M)
// ===================================
    //so i want to raise X to the M-2
    //but not only i have to avoid overflow,
    // i need to do this in O(logM), using binary exponentiation
    //idea: any integer can be split into powers of two
    //so i can split M
    // example M=27=16+8+2+1=11011
    // so i only have to calculate these powers and multiply them
    // in order to get X**27=X^1 * X ^2 * X^8* X^16
    let power=M-2 // have to raise x to M-2
    let curr=X,result=1
    while(power){ //using binary exponentiation
        if(power&1)
            result=(result*curr)%M
        curr=(curr*curr)%M
        power>>>=1
    }
    return result
}

console.log(FMLT(43,10007))