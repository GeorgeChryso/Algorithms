
// FINDS THE MAX FLOW====MINIMUM CUT OF A DIRECTED ACYCLIC WEIGHTED GRAPH
// Max flow( from a source node u to a sink node v): is the maximum amount of flow that we can send from u and receive from v 
// Min cut:  the minimum sum of edges that we have to remove so that there is no PATH from the source to the sink

//Note: the source has no incoming edges and the sink has no outgoing edges
// MAX FLOW===MIN CUT



// Set the result flow of each set to 0
// Look for a path that has a positive flow total
// Subtract the minimum edge's cost along this path from all the edges of the path, and add it to the reverse path

//example
var cap=[
    [0,7,0,0,4,0],
    [0,0,5,3,0,0],
    [0,0,0,0,0,8],
    [0,0,3,0,0,5],
    [0,3,0,2,0,0],
    [0,0,0,0,0,0]
],
Adj=[[1,4],[2,3],[5],[2,5],[1,3],[]]

//Using the EDMONG KARP BFS STYLE O(V*E^2)
let FF=(source,target)=>{
    
    let n  //nodes
    let capacity =[...Array(n)].map(d=>[...Array(n)]) //the given capacity costs
    let adj=[...Array(n)].map(d=>[]) //given somehow (our graph)
//------------
    n=6,capacity=cap,adj=Adj //EXAMPLE. REPLACE
//------------
    let totalFlow=0,
        parent=[...Array(n)].map(d=>0),
        newFlow
        console.log(capacity)

    let resultFlow=[...Array(n)].map(d=>[...Array(n)].map(d=>'-'))
    // bfs has to return the minimum edge cost of an (positive) path from start to target
    // while maintaining the parent array, which holds the path I'm currently at. This path will 
    // later be updated regarding its capacity
    let bfs=()=>{
        parent=[...Array(n)].map(d=>-1)
        parent[source]=-2
        let q=[ [source,Infinity] ]
        while(q.length){
            let [cur,flow]=q.pop()
            for(let next of adj[cur]) //keep expanding while maintaining the parent (path)
                if(parent[next]===-1 && capacity[cur][next]>0){
                    parent[next]=cur
                    let newFlow=Math.min(flow,capacity[cur][next])
                    if(next===target) 
                        return newFlow
                    q.push([next,newFlow])
                }
        }
        return 0 //if there is no such path anymore the algorithm ends
    }
    while(newFlow=bfs()){ // and this gets to 0 
        totalFlow+=newFlow
        let cur=target
        while(cur!==source){ //update the path
            let prev=parent[cur]
            capacity[prev][cur]-=newFlow
            capacity[cur][prev]+=newFlow
            cur=prev
        }
    }

    // Recreate the actual flows used for each edge
    for(let i=0;i<n;i++)
        if(adj[i])
            for(let next of adj[i])
                resultFlow[i][next]=capacity[next][i]

    console.log(resultFlow)    

    // EDIT: I can also find the min Cut edges that can be removed 
    let minCutEdges=[],group=[...Array(n)] //groupsource=1,groupsink=0
    for(let i=0;i<n;i++)
        group[i]=Number(resultFlow[0][i]>0)
    for(let i=1;i<n;i++)
        if(adj[i])
            for(let next of adj[i])
                if(group[i]!==group[next])
                    minCutEdges.push( [i,next])
                    
    console.log(minCutEdges)
    return totalFlow
}


console.log(FF(0,5))