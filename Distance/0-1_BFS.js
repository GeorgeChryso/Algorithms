

// Input Constraint
// Every weight  of every edge has to be either 0 or 1 
//  !!!!!!!!!!!!!!Or Generally 0 and X,X>0 !!!!!!!!!!!!!

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

               
        if(seen.has(polled))continue
        seen.add(polled)

        for (const [src,to,cost] of edges) {

            //optional for Letter inputs
            [src,to]=[numberify(src),numberify(to)]


            if(src===front && cost+distFromSource[src]<distFromSource[t] && !seen.has(to)){
                distFromSource[to]=cost+distFromSource[src]

                // MAIN O(E) REASON
                if(cost===1) q.push(to) // next level
                else q.unshift(to)  //to push a vertex with a same level)

            }
        }

    }

    return distFromSource

}

//Can we apply the same trick if our edge weights can only be 0 and x (x >= 0)?
// Yes 

//Can we apply the same trick if our edge weights are x and x+ 1(x >=0)?
// No, If 2 nodes have distance 0 with each other they are Interchangable
// whereas any other distance wouldnt cut it 

//Can we apply the same trick if our edge weights are x and y (x, y >= 0)?
// No 