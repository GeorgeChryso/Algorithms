




// O(V*E) 
// essentially BFS+Bellman Ford
let SPFA=(n,edges,source)=>{

    let distancefromStart={}

    //optional for Letter Input
    let numberify=letter=>letter.charCodeAt(0)-65
    

    for (let i = 0; i < n; i++) {
        distancefromStart[i]=Infinity        
    }
    //basecase
    distancefromStart[numberify(source)]=0

    let seen=new Set()
    let q=[ numberify(source)]
    while(q.length){
        let polled=q.shift()


        
        if(seen.has(polled))continue
        seen.add(polled)


        for (let [src,to,cost] of edges) {

            //optional
            [src,to]=[numberify(src),numberify(to)]

            if( polled===to&& 
                distancefromStart[polled]+cost < distancefromStart[to] &&
                !seen.has(to)){

                distancefromStart[to]=distancefromStart[polled]+cost
                q.push(to)
            }
            
            //If the graph is undirected you ll have to test both the to and src
            if(polled===to&& 
               distancefromStart[to]+cost < distancefromStart[src] &&
               !seen.has(src)){
                distancefromStart[src]=distancefromStart[polled]+cost
                q.push(src)
            }
        }

    }

    return distancefromStart
}



console.log(SPFA(
6,    [   
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
    ,'A'

))