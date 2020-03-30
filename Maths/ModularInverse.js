//calculate the modular inverse of an element mod m using the extended euclidean algorithm


 // way1 , consider that I m given a Linear Diophantine equation
 // a*x + n* y=1 , with unknown x and y
 // I can immediately find amodn 's inverse.


 let exEuc=(a,b)=>{

    let extendedEuclidean=( a,  b) =>{
        let x,y
        if (a == 0) {
            x = 0;
            y = 1;
            return [b,0,1];
        }
        let [g,x1,y1]= extendedEuclidean(b % a, a);
        x = y1- Math.floor(b / a) * x1;
        y = x1;
        return [g,x,y];
    }
    let gcd=extendedEuclidean(a,b) // find both the gcd and the solution to the LDequation,(the x,y)

    return gcd 
 }


 // A  number a has a modular inverse mod b  <=> gcd(a,b)=1
 // then ax+by=1 ====> x is the modular inverse of a modb
 // If a number a has a modular inverse modb , then I can find the triplet extended euclidean gives me
 // x is the inverse of a modb
// BUT, X CAN BE A NEGATIVE NUMBER, THAT'S WHY I HAVE TO  FIND THE EQUILEVANT POSITIVE NUMBER

let modInverse=(a,b)=>{

    let [g,x,y]=exEuc(a,b)
    if(g!==1)return "Not possible"
    
    x=(x%b+b)%b //picks the positive x
    return x
}

console.log(exEuc(10,12))
console.log(modInverse(10,12))


console.log(modInverse(11,13))