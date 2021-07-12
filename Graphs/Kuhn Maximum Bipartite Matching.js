
// MAXIMUM CARDINALITY OF EDGES SUC H THAT NO 2 EDGES SHARE A VERTEX
// So this is a bit different to Min Cost Max Flow
// I'm given a nxm bipartite graph, and I want to find as many edges as I can, 
// such that no edge shares a vertex. There is no cost associated with the edges here, I just want to
// find the maximum number of those edges, such that they do not share a vertex.


// Essentially implementing Burge's Lemma: 
// A matching is maximum iff there are no augmaenting paths relative to it

// Kuhn's algorithm TLDR:
// 1. take an empty matching
// 2. while an augmenting path exists(search through dfs/bfs), update it
// 3. return the maximum matching

let example=[
    [0,2],
    [3,4],
    [1,2],
    [2,3],
    [2]
]

// Runtime O(N^2*M), where N are the vertices of the first part, and M the vertices of the second part
// SO IT IS ALWAYS AN OPTION TO REVERSE THE GRAPH FOR BETTER COMPLEXITY
// the graph is bipartite already
// the left part has n vertices (0,...,n-1)
// the right part has k vertices (0,...,k)
// adj[vertices of the first part]= [list of vertices ofthe second part] 
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

console.log(KuhnMBM(5,5,example))