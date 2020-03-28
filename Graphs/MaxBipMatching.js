//MCBMatching through Augmenting Paths

let HungarianMCBM=edges=>{
    

    let adjacency=[]
    let nodes=new Set()
    let visited=new Set()
    let match={}

    let dfs=node=>{
        if(visited.has(node))return 0
        visited.add(node)
        for (const adj in adjacency[node]) {
                if(match[adj]==-1  || dfs(match[adj])){
                    match[node]=adj
                    match[adj]=node
                    return 1
                }
        }
        return 0

    }


    while(true){
        let boolean=false


        if(boolean==false)break
    }   


    let MCBM=0
    for (const val of match) {
        MCBM+=(val!==-1)
    }

    return MCBM
}


