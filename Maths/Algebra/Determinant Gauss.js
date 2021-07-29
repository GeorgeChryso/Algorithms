
// O(N^3)
let DetG=A=>{
    if(A.length!==A[0].length)
        return 0
    let DET=1,EPS=1e-9,n=A.length

    for (let i=0; i<n; i++) {
        let k = i;
        //find the row OF the biggest abs of col i 
        for (let j=i+1; j<n; j++)
            if ( Math.abs(A[j][i]) >  Math.abs(A[k][i]))
                k = j;
        // if 0, no sol
        if ( Math.abs(A[k][i]) < EPS) 
            return 0
        // switch row i, with row k
        for (let q=i; q<n; q++)
            [A[k][q], A[i][q] ] =[A[i][q],A[k][q]]

        if (i != k)
            DET = -DET;
        DET *= A[i][i];
        for (let j=i+1; j<n; j++)
            A[i][j] /= A[i][i];
        for (let j=0; j<n; j++)
            if (j != i && Math.abs(A[j][i]) > EPS)
                for (let k=i+1; k<n; k++)
                    A[j][k] -= A[i][k] * A[j][i];
    }
    return DET
}

let example=[ [1,3,2],[-3,-1,-3],[2,3,1]],example1=[[1,2,-3],[2,-1,2],[3,2,4]],
    example2=[ [1,3,1,4],[3,9,5,15],[0,2,1,1],[0,4,2,3]]
    example3=[ [5,2,1,4,6],[9,4,2,5,2],[11,5,7,3,9],[5,6,6,7,2],[7,5,9,3,3]],
    example4=[[5,4],[8,2]]
console.log(DetG(example))
console.log(DetG(example1))
console.log(DetG(example2))
console.log(DetG(example3))
console.log(DetG(example4))