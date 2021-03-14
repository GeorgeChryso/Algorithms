
// WITH 2 UNKNOWNS X,Y
// are of the form aX+bY=c, where a,b,c are known
// to find any solution when u have 2 unkwnons i can use the Extended Euclidean Algorithm

var extendedEuclidean=( a,  b) =>{
    if (a == 0) 
        return [b,0,1];
    let [g,x1,y1]= extendedEuclidean(b % a, a),
        x = y1- Math.floor(b / a) * x1,
        y = x1;
    return [g,x,y];//,solution x , solution to y
}

var find_random_solution=(a,b,c)=>{
    //first solve ax1+bx2=gcd(a,b)
    let [g,x1,y1]=extendedEuclidean( Math.abs(a), Math.abs(b))
    if(c%g) //no solution
        return [-Infinity,-Infinity]
    let x=x1*((c/g)>>0),y=y1*((c/g)>>0)
    if(a<0)x*=-1
    if(b<0)y*=-1

    return [x,y]
}
let gcd=(a,b)=>{
    while(b){
        a=a%b
        let temp=a
        a=b
        b=temp
    }
    return a
}

//there are infinitely many solutions once I know 1 of them
var find_ALL_solutions=(a,b,c)=>{
    let [x,y]=find_random_solution(a,b,c),
        g=gcd(a,b)
    if(x==y&&y==-Infinity)
        return 0
    //PRINT THE FIRST 10 solutions
    for(let k=1;k<=10;k++)
        console.log([x+k*b/g,y-k*b/g])
}
console.log(find_ALL_solutions( 2,7,1))


//find + count solutions in a given interval for x and y
// for example   xE [minX,maxX] , yE[minY,maxY]
var find_Constrained_solutions=(a,b,c,minX,maxX,minY,maxY)=>{
    let [x,y]=find_random_solution(a,b,c),g=gcd(a,b)
        a=(a/g)>>0
        b= (b/g )>>0
    let [sign_a,sign_b]=[ (-1)**Number(a>0),(-1)**Number(b>0)]
    if(x==y&&y==-Infinity)
        return 0

    let shift_solution=(a,b,count)=>{x+=count*b,y-=count*a}
    
    shift_solution( a, b, ((minX - x) / b)>>0);
    if (x < minX)
        shift_solution( a, b, sign_b);
    if (x > maxX)
        return 0;
    let lx1 = x;

    shift_solution( a, b, ((maxX - x) / b)>>0);
    if (x > maxX)
        shift_solution( a, b, -sign_b);
    let rx1 = x;

    shift_solution(  a, b, -(((minY - y) / a)>>0));
    if (y < minY)
        shift_solution(  a, b, -sign_a);
    if (y > maxY)
        return 0;
    let lx2 = x;

    shift_solution(  a, b, -(((maxY - y) / a) >>0));
    if (y > maxY)
        shift_solution(a, b, sign_a);
    let rx2 = x;

    if (lx2 > rx2){
        let temp=lx2
        lx2=rx2
        rx2=temp
    }
        
    let [lx,rx] = [ Math.max(lx1, lx2), Math.min(rx1, rx2)]
    if (lx > rx)
        return 0;
    console.log([lx,rx])
    //print all the solutions
    let curx=lx,cury=(c-a*lx)/b
    while(curx<rx)
        console.log(curx,cury),
        curx+=(b/g)>>0,cury= (c-a*curx)/b

    return ((rx - lx) / Math.abs(b))>>0 + 1;
}

console.log(find_Constrained_solutions(2,3,26,2,30,1,30))



// Getting the number of solutions for ANY number of Unknowns
// let a0x0+a1x1+...+anxn=S ,where ai and S are known: then find the number of solutions using DP
// so it's like solving knapsack with repetition?
// where x>=0 (the solutions)
let findCountSolutions=(A,S,Mod=1e9+7)=>{
    let n=A.length,
        dp=[...Array(n+1)].map(d=>[...Array(S+1)].map(d=>0))
    dp[0][0]=1
    //dp[i][j]= the number of solutions using the first i coefficients ai so that sum j can be achieved
    for (let i = 1; i <= n; i++) 
        for (let j = 0; j <= S; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j >= A[i-1])
                dp[i][j] += dp[i][j - A[i-1]]; //so essentially i m using repetition of A[i]
            dp[i][j] %= Mod;
        }
    return dp[n][S]
}

console.log(findCountSolutions([1,1,1],3))