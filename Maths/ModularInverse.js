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


console.log(exEuc(10,12))