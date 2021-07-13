
// More complex but O(sqrt(N)*M) better complexity than Kuhn's

// Takes as Input a bipartite graph, and returns the maximum CARDINALITY(COUNT) Edges,
// Such that no two edges share the same Vertex


// What is an Augmenting path? ..
//  
/*  
    Initialize a matching
    while( you can augment it)
      augment it ( bfs  alternating disjoint shortest paths)
    return 
*/
let example=[
    [0,2],
    [3,4],
    [1,2],
    [2,3],
    [2]
]
let ex2=[
    [ 1 ],          [ 3, 4, 6, 8 ],
    [ 0, 3, 7 ],    [ 3, 4, 6, 8 ],
    [ 2, 5, 6, 9 ], [ 3, 6 ],
    [ 1, 5 ],       [ 0 ],
    [ 0, 7 ],       [ 8 ]
  ],
  ex3=[
    [ 1, 2, 5, 7 ],
    [ 1, 5 ],
    [ 1, 3, 5, 6 ],
    [ 2, 4 ],
    [ 1, 3, 5, 6 ],
    [ 6 ],
    [ 2, 7 ],
    [ 0 ]
  ]

/*
        Input :  adjacency
    ALREADY  bipartite ONLY
        U (n)       V(m)
    (       )   (        )
        adj[u]=[....v]
*/
// Notice, adj has LISTS elements, so adj[u1]=[v0,v2,v4...vk]
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
        // Essentially you are trying to find an augmenting alternating path
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
        if(unmatchedV.size===0)// if no augmenting path was found, terminate
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
// A matching[nodeV]=nodeU if matched u-v or -1 if no matching was found for that nodeV
//console.log(HopcroftMBM(5,5,example))
console.log(HopcroftMBM(8,8,ex3))