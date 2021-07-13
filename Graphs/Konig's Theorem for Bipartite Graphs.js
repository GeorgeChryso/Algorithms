// The cardinality of the Maximum Matching ( maximum set of edges with no 2 edges having the same vertex)
// EQUALS==============
// The minimum Vertex Cover which is:
// The minimum number of vertices such that every other vertex touches at least one of those vertices.




/// But the really hot take here is that we can produce a minimum Vertex Cover FROM a maximum Matching
// Konig was really a genius bastard

// Let's say we already have a maximum matching, aka a set of edges such that no 2 share a vertex. 
// No vertex inside our future minimum vertex cover can COVER more than ONE EDGE inside our MAXIMUM MATCHING,
// So we need a cover with as much vertices as the edges I already have in my maximum matching.

// let U be the UNMATCHED vertices in the LEFT SIDE
// obviously U(=L  , same goes for Z(=R, for the right side of my bipartite graph


/* Inputs:
    Bipartite Graph G
    where G[i]=[j1,j2,...] i is a left vertex, j is a right vertex
    n: left count of vertices
    m: right count of vertices
    maxMatching=[...Array(m)] where maxMatching[j]=i if matched else -1 
*/
let KonigMinVertexCover=(n,m,G,maxMatching)=>{
    // ******************************** CONSTRUCT THE MINIMUM VERTEX COVER.............
    //  1.orient the edges: from matching L<-R ,else (L->R)
    let L=[...Array(n)].map(d=>[]),R=[...Array(m)].map(d=>[])
    for(let i=0;i<n;i++)
        if(G[i].length)
        for(let j of G[i])
            if(maxMatching[j]===i)
                R[j].push(i)
            else
                L[i].push(j)
    // 2.perform a dfs from every U N M A T C H E D vertex in L to create Z:
    // Z contains the nodes reachable from every unexplored L vertex
    let matchedL=new Set(maxMatching),Z=[new Set(),new Set()]//=[ nodesfrom L,nodes from R]
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
    //3. take  (L-Z[0]) U Z[1]
    let MinVertexCover=[ new Set(),new Set()] // [ [nodes from left],[nodes from right]]
    for(let i=0;i<n;i++)
        if(!Z[0].has(i))
            MinVertexCover[0].add(i)
    MinVertexCover[1]=Z[1]
    return MinVertexCover
}
