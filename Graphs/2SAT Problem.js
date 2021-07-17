


// Given multiple clauses () where each clause () has 2 literals inside ,
// solve for the values, so that the resulting clause is TRUE

//example (a && ¬b) || (¬a && b) || (¬a && ¬b) || (a && ¬c)
// answer : a,b,c=true/false

// Graph Solution: 
// We can represent each variable as a node. Negations are different nodes.
// Each pair (a,b) generates 2 edges: !a->b and !b->a
// So we can find if there IS a solution iff NO NODE BELONGS TO THE SAME SCC AS ITS NEGATION



let example=[ 8, [ [1,4],[4,5],[0,2],[5,6],[0,3]] ]

// Solution in O(number of clauses  +  number of variables)
// input: let us assume 5 different nodes 0,1,2,3,4
// then we will assume that their inverses are 5,6,7,8,9
// so the input is an array of arrays [ [a,b], [b,c], [d,a] ] etc
// n is the number of TOTAL vertices (+their negations)
let twoSAT=(n,CLAUSES)=>{
    let neg=node=> (node + n/2) % n
    //0 Construct the graph
    let adj={},edges=[]
    let addadj=(from,to)=>{
        if(adj[from]===undefined)
            adj[from]=new Set()
        adj[from].add(to)
    }
    for(let [f,t] of CLAUSES){
        let [nf,nt]=[neg(f),neg(t)]
        addadj(nf,t),addadj(nt,f)
        edges.push([nf,t]),edges.push([nt,f])
    }

    //1 find the SCC of each node through kosaraju/tarjan so we know that there is a solution
    let [toposort,SCC,SCClist]=Kosaraju(adj)
    // assert that no node belongs to the same component as its inverse
    for(let i=0;i<n;i++)
        if(SCC[i]===SCC[neg(i)])
            return false
    
    //2 find the topological sort of the graph (already found through Kosaraju's)
    // process it in reverse
    let result=[...Array(n)],seenSCC=new Set()
    let checkComp=SCCid=>{
        if(seenSCC.has(SCCid))
            return
        seenSCC.add(SCCid)
        for(let node of SCClist[SCCid])
            if(result[node]===undefined)
                result[node]=true,
                result[neg(node)]=false      
    }
    for(let node of toposort.reverse())
        checkComp(SCC[node])
    return result.slice(n/2)
}

let Kosaraju=next=>{
    let topoSort=topoSortDFS(next),T=transpose(next),
        SCC=[],seen=new Set()
    let dfs=(node,component)=>{
        if(!seen.has(node)){
            seen.add(node)
            if(T[node])//change if children array
                for(let nei of T[node]) // Add any Unprocessed child to component
                    dfs(nei,component)
            component.push(node)
        }
    }
    for(let node of topoSort)
        if(!seen.has(node))
            SCC.push([]),
            dfs(node,SCC[SCC.length-1])
    
    // alternative result as a list of numbers
    let res={}
    for(let i=0;i<SCC.length;i++)
        for(let node of SCC[i])
            res[node]=i
    return [topoSort,res,SCC]
}
let topoSortDFS=next=>{
    let result=[],seen=new Set()
    let dfs=node=>{
        if(!seen.has(node)){
            seen.add(node)
            if(next[node]&&next[node].size)//change if children array
                next[node].forEach(child=>dfs(Number(child)))
            result.unshift(node)
        }
    }
    for(let node in next)
        dfs(Number(node))//
    return result
}
let transpose=next=>{
    let result={}
    for(let node in next){
        node=Number(node)
        if(next[node]&&next[node].size)
            next[node].forEach(child=>{
                child=Number(child)
                if(result[child]===undefined)
                    result[child]=new Set()
                result[child].add(node)
        })
    }
    return result
}

console.log(twoSAT(example[0],example[1]))
console.log(twoSAT(6,[[0,1],[0,4],[3,2],[3,5]])) // no answer