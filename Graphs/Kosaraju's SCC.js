

// SCC of a DIRECTED graph, can contain cycles
// idea: 2x DFS 
// 1 to find the topological ordering of the graph
// and 1 on the transpose(reverse) graph. 

//the input is an object/array of sets/arrays where
// next[node]=[child1,child2,...]
//Input nodes are NUMBERS:
// O(n)
let Kosaraju=next=>{
    let topoSort=topoSortDFS(next),T=transpose(next)
    let SCC=[],seen=new Set()
    let dfs=(node,component)=>{
        node=Number(node)
        if(!seen.has(node)){
            SCC.push()
            seen.add(node)
            if(T[node]&&T[node].size)//change if children array
                T[node].forEach(child=>dfs(Number(child),component))
            component.push(node)
        }
    }
    topoSort.forEach(node=>{
        node=Number(node)
        if(!seen.has(node)){
            SCC.push([])
            dfs(node,SCC[SCC.length-1])
        }
    })
    return SCC
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


let graph={
    1:new Set([2]),
    2:new Set([3]),
    3:new Set([1,4,5]),
    4:new Set([9,6]),
    5:new Set([6]),
    6:new Set([7]),
    7:new Set([8]),
    8:new Set([6]),
    9:new Set([7])
}
console.log(Kosaraju(graph))