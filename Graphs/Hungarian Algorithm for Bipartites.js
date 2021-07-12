

// FIND THE BEST BIPARTITE MATCHING OF A GRAPH aka the matching that MINIMIZES THE COST OF EDGES
// multiply everything with -1 to find the MAXIMUM matching instead. 



// O(N^4)
// Input( nxm matrix) where adj[i][j] is the cost of the edgefrom i to j 
// i belongs to the left part of the ALREADY BIPARTITE GRAPH and j to the right
let HungarianMBM1=(adjU)=>{

    //Step 0, create 0-cost edges by deleting the minimum from each row and column
    let n=adjU.length,m=adjU[0].length  
    for(let i=0;i<n;i++){
        let min=Math.min(...adjU[i])
        adjU[i]=adjU[i].map(d=>d-min)
    }
    for(let j=0;j<m;j++){
        let min=Infinity
        for(let i=0;i<n;i++)
            min=Math.min(min,adjU[i][j])
        for(let i=0;i<n;i++)
            adjU[i][j]-=min
    }

    while(true){
        //build a graph that has only the 0 weight edges
        let G=[...Array(n)].map(d=>[])
        for(let i=0;i<n;i++)
            for(let j=0;j<m;j++)
                if(adjU[i][j]===0)
                    G[i].push(j)
        //find the maximum bip matching on the 0 edge graph using KUHN in O(N^2M)
        let maxMatching=KuhnMBM(n,m,G)
        //if the matching is perfect( aka has n  edges, then we re donezo)
        if(maxMatching.reduce((a,c)=>a+ Number(c!==-1),0)===n)
            return maxMatching

        // ********************************
        // Construct the minimum vertex cover, having the maxMatching, through Konig's theorem

        let MinVertexCover=[ [...], [...]] // [ [nodes from left],[...nodes from right]]
        //******************************* 
        // Find the Delta (overall Min) for nodes that dont belong in the minCover
        let Delta=Infinity
        for(let i=0;i<n;i++)
            for(let j=0;j<m;j++)
                if(!MinVertexCover[0].has(i) && !MinVertexCover[1].has(j))
                    Delta=Math.min(Delta,adjU[i][j])
        // modify the Graph
        for(let i=0;i<n;i++)
            for(let j=0;j<m;j++)
                if(!MinVertexCover[0].has(i) && !MinVertexCover[1].has(j))
                    adjU[i][j]-=Delta
                else if(MinVertexCover[0].has(i) && MinVertexCover[1].has(j))
                    adjU[i][j]+=Delta
    }           
    

}
let KuhnMBM=(n,k,adj)=>{
    let seen=new Set(),// corresponds to the vertices of the left part
    // matching[vertex of second part]= vertex of the first part it's connected with
        matching=[...Array(k)].map(d=>-1)
    //returns true if it was a able to find an augmentung path from the vertex v
    let dfs=(v)=>{
        if(seen.has(v))
            return false
        seen.add(v)
        if(adj[v])
            for(let nei of adj[v])
                if(matching[nei]===-1 || dfs(matching[nei])){
                    matching[nei]=v
                    return true
                }
        return false
    }
    //try a dfs from every vertex of the left part
    for(let v=0;v<n;v++,seen=new Set) 
        dfs(v)
    return matching
}