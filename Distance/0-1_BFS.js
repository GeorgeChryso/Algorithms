

// Input Constraint
// Every weight  of every edge has to be either 0 or 1 

// Complexity O(E) where E is the number of Edges

// Lemma
// During the Execution of BFS the queue Holding the vertices only contains elements from
// AT MAX TWO SUCCESSIVE LEVELS OF THE BFS tree


// Eseentially BFS+ Dijkstra's
let BFS01=(edges,source,n)=>{

    let numberify=letter=>letter.charCodeAt(0)-65


    let distFromSource={}
    for (let i = 0; i < n; i++) {
        distFromSource[i]=Infinity        
    }
    //basecase -Numberify for nodes as letters
    distFromSource[numberify(source)]=0

    let q=[numberify(source)]

    while(q.length){

        let front=q.shift()

        for (const [src,to,cost] of edges) {
            if(src===front && cost+distFromSource[src]<distFromSource[t]){
                distFromSource[to]=cost+distFromSource[src]

                // MAIN O(E) REASON
                if(cost) q.push(to)
                else q.unshift(to)
            }
        }

    }

    return distFromSource

}