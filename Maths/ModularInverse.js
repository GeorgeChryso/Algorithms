//calculate the modular inverse of an element mod m using the extended euclidean algorithm


 // way1 , consider that I m given a Linear Diophantine equation
 // a*x + n* y=1 , with unknown x and y
 // I can immediately find amodn 's inverse.


 let modInv=(a,n)=>{

    let x,y
    let extendedEuclidean=(a,n)=>{

        let s=0, olds=1
        let r=n, oldr=a
        while(r){
            let quotient=oldr/r;
            [oldr,r]=[r,oldr-quotient*r]
            [olds,s]=[s,olds-quotient*s]
    
        }
        //gcd(0,n)= n

        x=s
        y=r
        return quotient
    }
    
    
    let gcdan=extendedEuclidean(a,n) // find both the gcd and the solution to the LDequation,(the x,y)

    if(gcdan==1){
        x= (x%n + n )%n
        return x
    }
    return 'no inverse possible' 
 }


console.log(modInv(3,2))