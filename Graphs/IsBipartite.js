
// A  bipartite graph is a graph which ban be divided into two disjoint sets of vertices such that every edge connects vertices of one set to vertices of the other. 

// Given a list of Edges of an UNDIRECTED graph, determine if the given graph is bipartite


// Intuition, a dfs where each node is 0 or 1 => O(n)
let isBipartite=(edges)=>{
    let vertices=new Set(),
        adj={},color={}
    for(let [f,t,cost] of edges){
        if(adj[f]===undefined)
            adj[f]=new Set()
        if(adj[t]===undefined)
            adj[t]=new Set()
        vertices.add(f),vertices.add(t)
        adj[f].add(t),adj[t].add(f)
    }
    let dfs=(node,col)=>{
        if(color[node]!==undefined)
            return color[node]==col
        color[node]=col
        return Array.from(adj[node]).every(nei=>dfs(nei,col^1))
    }
    let res=dfs(edges[0][0],0)
    //corner case: multiple connected components
    return res&&(Array.from(vertices).every(vertex=>color[vertex]!==undefined))
}


console.log(isBipartite(
    [   
        ['A','B',7],
        ['A','C',9],
        ['A','F',14],
        ['B','C',10],
        ['B','D',15],
        ['C','D',11],
        ['D','B',15],
        ['D','E',6],
        ['D','C',11],
        ['F','E',9],
        ['F','C',2],
    ]

))


console.log(isBipartite(
    [   
        ['A','B',7],
        ['A','D',9],
        ['B','C',10],
        ['C','D',11],
    ]

))