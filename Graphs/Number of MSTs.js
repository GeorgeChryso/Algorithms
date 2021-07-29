

// Kirchoff's Theorem:
// Input: Connected Undirected Graph
// BUT: THERE CAN BE MULTIPLE EDGES BETWEEN 2 NODES U,V
let countMSTS=G=>{
    // G[u][v]= Number of edges between nodes u,v
    let n=G.length
    // Constuct a Degree Matrix, which is a nxn diagonal matrix where D[u][u]=#of edges (u,x)
    let D=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    for(let node=0;i<n;i++)
        for(let nei=0;nei<n;nei++)
            D[node][node]+=G[node][nei]
    
    // Create the Laplacian Matrix L=D-G
    let L=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    for(let i=0;i<n;i++)
        for(let j=0;j<n;j++)
            L[i][j]=D[i][j]-G[i][j]

    L.pop(),L=L.map(a=>a.slice(0,a.length-1))
    return DetG(L)
}

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