// The algorithm from D´Esopo-Pape will work faster than Dijkstra's algorithm and the Bellman-Ford algorithm in most cases, and will also work for negative edges. However not for negative cycles.

// Generally faster than Dijkstras and Bellman but Worst case 2**N
let dEsopoPape=(edges,source)=>{
    
    let distanceFromStart={}
    //find the maximum Weight and the number of Vertices
    for (const [start,to,cost] of edges) {
        distanceFromStart[start]=Infinity
        distanceFromStart[to]=Infinity
    }
    distanceFromStart[source]=0
    
    //number of Vertices
    let V=Object.keys(distanceFromStart).length
    
    let AdjacencyMatrix=[...Array(V)].map(d=>Array(V).fill(Infinity))
    for (const [start,to,cost] of edges) {
         AdjacencyMatrix[start][to]=cost
         //Change if Undirected
         AdjacencyMatrix[to][start]=cost
    }

    //if m[i]===0 the distance has already been calculated(maybe not final)
    // if m[i]===1 the distance of vertex i is currently being calculated
    // if m[i]===2 the distance of vertex i has not yet been calculated
    let m=[...Array(V)].map(d=>2) //map everything to 2

    let q=[source]
    while(q.length){
        let u=q.shift()
        m[u]=0
        for (let i = 0; i < AdjacencyMatrix[u].length; i++) {
            let [v,cost]=[i,AdjacencyMatrix[u][i]]
            if(distanceFromStart[u]+cost<distanceFromStart[v]){
                distanceFromStart[v]=distanceFromStart[u]+cost
                if(m[v]==2){
                    m[v]=1
                    q.push(v)
                }
                else if(m[v]==0){
                    m[v]=1
                    q.unshift(v)
                }

            }

        }
    }

    return distanceFromStart

}


console.log(dEsopoPape([
    [0,1,4],
    [0,7,8],
    [1,2,8],
    [1,7,11],
    [2,3,7],
    [2,8,2],
    [2,5,4],
    [3,4,9],
    [3,5,14],
    [4,5,10],
    [5,6,2],
    [6,7,1],
    [6,8,6],
    [7,8,7]
],0))