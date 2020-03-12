

// A Dijkstras optimization when the 
// MAXIMUM WEIGHT IS SMALL !!!!!!
// to improve the complexity to 
// O(E+WV) where W is the maximum edge weight, E is the number of edges and V is the nubmer of vertices
// which improves ElogV runtime of Dijkstra's SSSP algorithm

// Using Buckets for each possible Weight of a path
// so the maximum weight is always MaxEdgeWeight *(V-1)



let dials=(edges,source)=>{
    let distanceFromStart={}
    let maximumEdgeWeight=-1
    //find the maximum Weight and the number of Vertices
    for (const [start,to,cost] of edges) {
        distanceFromStart[start]=Infinity
        distanceFromStart[to]=Infinity
        maximumEdgeWeight=Math.max(maximumEdgeWeight,cost)
    }

    //number of Vertices
    let V=Object.keys(distanceFromStart).length
    
    let AdjacencyMatrix=[...Array(V)].map(d=>Array(V).fill(Infinity))
    for (const [start,to,cost] of edges) {
        AdjacencyMatrix[start][to]=cost
        //Change if Undirected
        AdjacencyMatrix[to][start]=cost
    }

    //so I need to create a bucket of maximumEdgeWeight(V-1) possible Path Weights
    let buckets=Array(V*maximumEdgeWeight+1).fill(null).map(d=>new Set())
    buckets[0].add(source)
    distanceFromStart[source]=0

 
    let index=0

    while(true){

        //if my curr bucket has no elements and there are possible buckets to move to
        while(!buckets[index].size && index<maximumEdgeWeight*V)index++

        if(index===maximumEdgeWeight*V)break


        //this can be optimized to be O(1), 
        // but here instead is O(n) because Sets dont have a pop operation
        //take the first node inside the bucket
        let u=null
        buckets[index].forEach(d=>u===null?u=d:null)
        buckets[index].delete(u)

        //try to relax each adjacent node v to my node u 
        for (let i = 0; i < AdjacencyMatrix[u].length; i++) {
            let [v,weight]=[i,AdjacencyMatrix[u][i]]
            
            if(distanceFromStart[u]+weight<distanceFromStart[v]){
                if(distanceFromStart[v]!==Infinity){
                    buckets[distanceFromStart[v]].delete(v)
                }
                distanceFromStart[v]=distanceFromStart[u]+weight
                buckets[distanceFromStart[v]].add(v)
            }
        }

    }

    return distanceFromStart
}


console.log(dials([
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