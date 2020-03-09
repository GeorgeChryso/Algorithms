//Finds the MST of an UNDIRECTED GRAPH





// just Adjacency Matrix- No heap. O(V**2)


var Prims=(Edges)=>{
    let Adjacency={}
    for (const [source,to,cost] of Edges) {
        if(Adjacency[source]===undefined){
            Adjacency[source]=[[to,cost]]
        }
        else{
            Adjacency[source].push([to,cost])
        }
        
        if(Adjacency[to]===undefined){
            Adjacency[to]=[[source,cost]]
        }
        else{
            Adjacency[to].push([source,cost])
        }
    }



    let visited=new Set()
    //add a random node to visited to start the process
    visited.add(Object.keys(Adjacency)[0])
    console.log(Adjacency)
    let result=[]
    while(visited.size!==Object.keys(Adjacency).length){

        let minEntry=[Infinity,Infinity,Infinity]
        
        for (const vis of visited.values()) {
            for (const [to,cost] of Adjacency[vis]) {
                if(!visited.has(to)&&cost<minEntry[2]){
                    minEntry=[vis,to,cost]
                }
            }
        } 

        visited.add(minEntry[1])
        result.push(minEntry)
    }

    return result
}



console.log(Prims(
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