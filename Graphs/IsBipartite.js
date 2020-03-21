
// A  bipartite graph is a graph which ban be divided into two disjoint sets of vertices such that every edge connects vertices of one set to vertices of the other. 

// Given a list of Edges of an UNDIRECTED graph, determine if the given graph is bipartite


// Intuition, a bfs where each level gets a number
// either 1 or 2 , for its respective set 
// if an attempt is made to assign a number to a vertex to which a number is already is assigned,
// and the two nubmers are different immediately return false
let isBipartite= Edges=>{
    let set=new Set()
    Edges.forEach(([fr,to,cost])=>{set.add(fr);set.add(to)})

    console.log(set.size)
    //create the adjacency matrix first
    let adj=[...Array(set.size)].map(d=>[...Array(set.size)].map(q=>Infinity))
    
    //lettermapping
    let map=letter=>letter.charCodeAt(0)-65
    for (let [src,to,cost] of Edges) {
        [src,to]=[map(src),map(to)]
        adj[src][to]=cost
        adj[to][src]=cost
    }
    adj.forEach(d=>console.log('['+d+']'))

    let teamMemo=[...Array(adj.length)].map(d=>null)
    
    let visited=new Set()
    let q=[0]
    teamMemo[0]=0
    while(q.length){
        let ele=q.pop()

        //self cycle not acceptable
        if(adj[ele][ele]!==Infinity)return false 


        if(visited.has(ele))continue
        visited.add(ele)


        for (let j = 0; j < adj[ele].length; j++) {
            if(adj[ele][j]!==Infinity){
                if(teamMemo[j]===teamMemo[ele]&&teamMemo[j]!==null)return false //same team with children,false
                teamMemo[j]=teamMemo[ele]^1 //switch teams
                q.push(j)
            }
        }
        
     
    }
    
  

    return true
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

//bipartite
console.log(isBipartite(
    [   
        ['A','B',7],
        ['A','D',9],
        ['B','C',10],
        ['C','D',11],
    ]

))