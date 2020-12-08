
// Works in Directed Cyclic& Acyclic graphs with positive and Negative Edges and finds the min distance in up to N steps( n being the number of vertices) from src to Every other node
// I can actually compute the shortest path from the src to EVERY other vertex in O(V*E) time using Bellman Ford. BF uses dynamic programming. 

// Complexity O(N*E) (bigger than Dijkstra)
// N= number of nodes E=number of edges
let BellmanFord=(src,target,edges)=>{
    let distanceFromSource={}
    //only if i want to find the path aswell
    let prev={}
    //initialize the distance of every node with Infinity
    for (const [start,end,cost] of edges) {
        distanceFromSource[start]=Infinity
        distanceFromSource[end]=Infinity
        prev[start]=Infinity
        prev[end]=Infinity
    }

    distanceFromSource[src]=0
    
    //Number of Nodes
    let N=Object.keys(distanceFromSource).length

    // main
    for (let i = 1; i <=N-1; i++) { //i here means the number of  inbetween EDGES i m checking. For i=1 immediate edges are taken under consideration.
        for (const [start,end,cost] of edges) {
            if(distanceFromSource[start]===Infinity)continue
            if( distanceFromSource[start]+cost<distanceFromSource[end]){
                distanceFromSource[end]=distanceFromSource[start]+cost
                prev[end]=start
            }
        }
    }



    //you can check for a potential negative cycle  
    checkNegativeCycles(distanceFromSource,edges)
    // you can also find the path for the required node 
    let findPath=()=>{
        if(distanceFromSource[target]==Infinity)return false

        let path=[target]
        let currkey=target
        while(prev[currkey]!=Infinity){
            path.unshift(prev[currkey])
            currkey=prev[currkey]
        }
        console.log(path)
        return path
    }
    findPath()
    console.log(distanceFromSource)
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
console.log(BellmanFord(
    2,0,[
        [0, 1, 0],
        [0, 2, 3],
        [1, 2, 0]
    ]
    )
)