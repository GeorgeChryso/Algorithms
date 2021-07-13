

// FIND THE BEST BIPARTITE MATCHING OF A GRAPH aka the matching that MINIMIZES THE COST OF EDGES
// multiply everything with -1 to find the MAXIMUM matching instead. 

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! N <= M  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let example=[ [15,10,9],
              [9,15,10],
              [10,12,8] ]
let example2=[ [9,2,7,8],[6,4,3,7],[5,8,1,8],[7,6,9,4]],
    example3=[ [5,7,11,6,7],[8,5,5,6,5],[6,7,10,7,3],[10,4,8,2,4]],
    ex4=[
        [
          120, 23, 99, 28,
          110, 23, 88, 97
        ],
        [
          127, 16, 100,  27,
          105, 16,  95, 102
        ],
        [
          100, 11, 127,   0,
          114, 11,  68, 125
        ],
        [
          18, 125,  9, 118,
           4, 125, 50,  11
        ],
        [
          100, 11, 127,   0,
          114, 11,  68, 125
        ],
        [
          113, 30, 106,  21,
          103, 30,  81, 104
        ],
        [
          60, 83, 39, 88,
          42, 83, 28, 37
        ],
        [
           2, 109, 25, 102,
          20, 109, 34,  27
        ]
      ]

// O(N^4) ( or 5 with Kuhn)
// Input( nxm matrix) where adj[i][j] is the cost of the edgefrom i to j 
// Output: Matching[j]=i or -1 if no matchinge exists for the RIGHT node j 
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
        //find the maximum bip matching on the 0 edge graph using Hopcroft/Kuhn
        let maxMatching=HopcroftMBM(n,m,G)
        //if the matching is perfect( aka has n  edges, then we re donezo)
        if(maxMatching.reduce((a,c)=>a+ Number(c!==-1),0)===n)
            return maxMatching

        // ******************************** CONSTRUCT THE MINIMUM VERTEX COVER.............
        // Construct the minimum vertex cover, having the maxMatching, through Konig's theorem
        //  ->1.orient the edges: from matching L<-R ,else (L->R)
        let L=[...Array(n)].map(d=>[]),R=[...Array(m)].map(d=>[])
        for(let i=0;i<n;i++)
            if(G[i])
            for(let j of G[i])
                if(maxMatching[j]===i)
                    R[j].push(i)
                else
                    L[i].push(j)
        // ->2. perform a dfs from every U N M A T C H E D vertex in L
        let matchedL=new Set(maxMatching),Z=[new Set(),new Set()]
        // Z contains the nodes reachable from every unexplored L vertex
        let explore=(node,isL=1)=>{
            let adj=isL?L:R,memo=isL?Z[0]:Z[1]
            if(memo.has(node))
                return
            memo.add(node)
            if(adj[node])
                for(let nei of adj[node])
                    explore(nei,isL^1) 
        }
        for(let i=0;i<n;i++)
            if(!matchedL.has(i))
                explore(i)

        let MinVertexCover=[ new Set(),new Set()] // [ [nodes from left],[nodes from right]]
        for(let i=0;i<n;i++)
            if(!Z[0].has(i))
            MinVertexCover[0].add(i)
        MinVertexCover[1]=Z[1]

        //******************************* ......................................................
        // Find the Delta (overall Min) for nodes that dont belong in the minCover
        let Delta=Infinity
        for(let i=0;i<n;i++)
            for(let j=0;j<m;j++)
                if(!MinVertexCover[0].has(i) && !MinVertexCover[1].has(j))
                    Delta=Math.min(Delta,adjU[i][j])
        // modify the original Graph
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
let HopcroftMBM=(n,m,adjU)=>{
    let adjV=[...Array(m)].map(d=>[])
    // Create the inverse adjacency (from V)
    for(let i=0;i<n;i++)
        if(adjU[i])
            for(let nei of adjU[i])
                adjV[nei].push(i)
    //we begin with an empty matching, where Matching[V]= Ui if matched, or -1
    let Matching=[...Array(m)].map(d=>-1),
        unmatchedU=new Set([...Array(n)].map((d,i)=>i))
    while(true){
        //do alternating bfs (from every unmatched vertex from U) until you find an UNMATCHED vertex from V
        let q=[...Array.from(unmatchedU)],isU=1,unmatchedV=new Set(),
            seenU=new Set(q),seenV=new Set()
        while(q.length && unmatchedV.size===0){
            let adj=isU?adjU:adjV,temp=new Set(),
                seen=isU?seenV:seenU
            for(let node of q)
                for(let nei of adj[node])
                    if(!seen.has(nei) && ((isU&& Matching[nei]!==node ) || (isU==0&& Matching[node]===nei))){
                        if(isU&&(Matching[nei]===-1))
                            unmatchedV.add(nei)
                        temp.add(nei),seen.add(nei)
                    } 
            q=[...Array.from(temp)],isU^=1
        }
        if(unmatchedV.size===0)
            break
        //from each UNMATCHED VERTEX from V found, perform an ALTERNATING dfs to find augmenting paths
        seenU=new Set(),seenV=new Set()
        let dfs=(node,isU=0)=>{
            let adj=isU?adjU:adjV,seen=isU?seenU:seenV
            if(!seen.has(node)){
                seen.add(node)
                if(isU&&unmatchedU.has(node))
                    return true
                for(let nei of adj[node])
                    // at V? > only unused Edges // at U? > only used Edges
                    if(((isU===0&&Matching[node]!==nei)||(isU===1&&Matching[nei]===node)) &&dfs(nei,isU^1)){
                        if(isU===0)
                            Matching[node]=nei,
                            unmatchedU.delete(nei)
                        return true
                    }    
            }
            return false
        }
        unmatchedV.forEach(v=>dfs(v,0))
    }
    return Matching
}


console.log(HungarianMBM1(ex4))