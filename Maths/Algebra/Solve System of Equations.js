


// Gaussian Elimination O(n*m* min(n,m))


// System type: Ax=B, A is a nxm matrix, B is a nx1 matrix
// and you re asked to return a 1xm matrix X=[....]
// INPUT: AB is a Nx(M+1) matrix where the last COLUMN IS B
// OUTPUT: [ number of solutions, solution]
let SLAE=(AB)=>{
    let n=AB.length,m=AB[0].length-1,
        X=[...Array(m)].map(d=>0),EPS=1e-10,
        where=[...Array(m)].map(d=>-1)

    for (let col=0, row=0; col<m && row<n; col++,row++) {
        let sel = row;
        for (let i=row; i<n; ++i)
            if (Math.abs(AB[i][col]) > Math.abs(AB[sel][col]))
                sel = i;
        if ( Math.abs(AB[sel][col]) < EPS)
            continue;
        for (let i=col; i<=m; i++)
            [AB[sel][i], AB[row][i]] =[AB[row][i],AB[sel][i]]
        where[col] = row;
        for (let i=0; i<n; i++)
            if (i != row) {
                let c = AB[i][col] / AB[row][col];
                for (let j=col; j<=m; j++)
                    AB[i][j] -= AB[row][j] * c;
            }
    }

    for (let i=0; i<m; ++i)
        if (where[i] != -1)
            X[i] = AB[where[i]][m] / AB[where[i]][i];
    for (let i=0; i<n; ++i) 
        if (Math.abs( X.reduce((a,c,j)=> a+c*AB[i][j],0) - AB[i][m] ) > EPS)
            return [0,-1];
    for (let i=0; i<m; ++i)
        if (where[i] == -1)
            return [Infinity,X];
    return [1,X]
}   


//solution [1, [2,1,-2]]
let example=[[2, -3, 1,-1],
[1, -1, 2,-3],
[3, 1, -1,9]]
console.log(SLAE(example))

// Infinite Solutions
let example2=[
    [-1, 1, 2,0],
    [1, 2, 1,6],
    [-2, -1, 1,-6]
]
console.log(SLAE(example2))

//No solution
let example3=[
    [1, -1, 4,-5],
    [3, 0, 1,0],
    [-1, 1, -4,20]
]
console.log(SLAE(example3))



