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



    let keys={} //determines what node will be processed next
    let Parents={} //helps with the final representatio nof my MST

    //Initialize both keys and Parents
    Object.keys(Adjacency).forEach(d=>{
        keys[d]=Infinity
        Parents[d]=null
    })
    

    //pick randomly the first Key and set its keys' value to 0 in order for it 
    // to be picked first inside the for loop
    keys[Object.keys(keys)[0]]=0
    let result=[]  


    let visited=new Set()

    for (let count = 0; count < totalNodes-1; count++) {
        

        // finds the key which has the minimum keys value and hasnt yet been chosen
        // and essentially saves me 1 loop (O(n^2)=>O(n))
        // There is an optimization using a Priority queue here in order
        // for me to be able to find the minimum element faster
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


        //updates the keys and Parents matrix
        for (const vertex in keys) {
            if(!visited.has(vertex)&&Adjacency[minKey][vertex]<keys[vertex]){
                keys[vertex]=Adjacency[minKey][vertex]
                Parents[vertex]=minKey
            }
        }

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