
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
        let q=[...Array.from(unmatchedU)],isU=1,unmatchedV=new Set(),
            seenU=new Set(),seenV=new Set() 
        while(q.length && unmatchedV.size===0){
            let adj=isU?adjU:adjV,temp=new Set(),
                seen=isU?seenU:seenV,memo=isU?seenV:seenU
            for(let node of q){
                seen.add(node)
                for(let nei of adj[node])
                    if(!memo.has(nei)){
                        if(isU&&Matching[nei]===node) //ALTERNATING EDGES, from U always use unmatched edges.
                            continue
                        if(isU&&(Matching[nei]===-1))
                            unmatchedV.add(nei)
                        temp.add(nei)
                    } 
            }
            q=[...Array.from(temp)],isU^=1
        }
        if(unmatchedV.size===0)
            break
        //from each UNMATCHED VERTEX from V found, perform a dfs to find augmenting paths
        seenU=new Set(),seenV=new Set()
        let dfs=(node,isU=0,procU,procV)=>{
            let adj=isU?adjU:adjV,proc=isU?procU:procV
            if((isU&&seenU.has(node)) || (isU===0&&seenV.has(node)) || proc.has(node))
                return false
            proc.add(node)
            if(isU&&unmatchedU.has(node))
                return true
            for(let nei of adj[node])
                // at U? > only used Edges
                // at V? > only unused Edges
                if(((isU===0&&Matching[node]!==nei)||(isU===1&&Matching[nei]==node)) && dfs(nei,isU^1,procU,procV)){
                    if(isU===0)
                        Matching[node]=nei,
                        seenU.add(nei),
                        seenV.add(node),
                        unmatchedU.delete(nei)
                    return true
                }    
            return false
        }
        unmatchedV.forEach(v=>dfs(v,0,new Set(),new Set()))
        console.log(Matching)
    }
    return Matching
}
// A matching[nodeV]=nodeU if matched u-v or -1 if no matching was found for that nodeV
console.log(HopcroftMBM(5,5,example))