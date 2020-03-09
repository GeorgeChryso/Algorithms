//Finds the MST of an UNDIRECTED GRAPH





// just Adjacency Matrix- No heap. O(V**2)


var Prims=(Edges)=>{
    let Adjacency={}
    for (const [source,to,cost] of Edges) {
        if(Adjacency[source]===undefined){
            Adjacency[source]={}
            Adjacency[source][to]=cost
        }
        else{
            Adjacency[source][to]=cost

        }
        if(Adjacency[to]===undefined){
            Adjacency[to]={}
            Adjacency[to][source]=cost
        }
        else{
            Adjacency[to][source]=cost
        }
    }
    let totalNodes=Object.keys(Adjacency).length



    let keys={}
    let Parents={}
    Object.keys(Adjacency).forEach(d=>{
        keys[d]=Infinity
        Parents[d]=null
    })
    


    let visited=new Set()
    //add a random node to visited to start the process
    keys[Object.keys(keys)[0]]=0
    let result=[]  


    
    for (let count = 0; count < totalNodes-1; count++) {
        

        //findminKey
        let min=Infinity
        let minKey=-1
        for (const key in keys) {
            if(!visited.has(key)&&keys[key]<min){
                min=keys[key]
                minKey=key
            }
        } 
        visited.add(minKey)

        if(min===Infinity)break

        for (const vertex in keys) {
            if(!visited.has(vertex)&&Adjacency[minKey][vertex]<keys[vertex]){
                keys[vertex]=Adjacency[minKey][vertex]
                Parents[vertex]=minKey
            }
        }

    }
        
    console.log(Parents,keys)


    

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