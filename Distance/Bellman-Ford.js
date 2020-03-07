


// Complexity O(N*E)
// N= number of nodes E=number of edges
let BellmanFord=(src,target,edges)=>{
    let distanceFromSource={}

    //initialize the distance of every node with Infinity
    for (const [start,end,cost] of edges) {
        distanceFromSource[start]=Infinity
        distanceFromSource[end]=Infinity
    }

    distanceFromSource[src]=0
    
    //Number of Nodes
    let N=Object.keys(distanceFromSource).length

    // main
    for (let i = 1; i <=N-1; i++) {
        for (const [start,end,cost] of edges) {

            if(distanceFromSource[start]===Infinity)continue
            if( distanceFromSource[start]+cost<distanceFromSource[end]){
                distanceFromSource[end]=distanceFromSource[start]+cost
            }
        }
    }



    //you can check for a potential negative cycle  
    checkNegativeCycles(distanceFromSource,edges)


    return distanceFromSource[target]

}



let checkNegativeCycles=(distances,edges)=>{

    for (const [start,end,cost] of edges) {
        //if we can find a better (smaller) distance by using one of the edges, then there is a negative cycle, which is NO BUENO cos Bellman doesnt work for negative Cycles
        if(distances[start]!==Infinity && distances[start]+cost<distances[end])return true
    }

    return false
}



console.log(BellmanFord(
    'A','E',
        [   
            ['A','B',7],
            ['A','C',9],
            ['A','F',14],
            ['B','C',10],
            ['B','D',15],
            ['C','B',10],
            ['C','D',11],
            ['C','F',2],
            ['D','B',15],
            ['D','E',6],
            ['D','C',11],
            ['E','D',6],
            ['E','F',9],
            ['F','E',9],
            ['F','C',2],
            ['F','A',14]
        ]
    
))