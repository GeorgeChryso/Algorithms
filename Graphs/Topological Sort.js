
//O(V+E)

//number of vertices, [...[next,previous]]
// Topologically Sort the elements of a DAG
var topoSort = function(n, prerequisites) {
    let next={}, distinctElements=new Set()
    for (const [nextElement,prev] of prerequisites){
        if(next[prev]===undefined)
            next[prev]=new Set()
        next[prev].add(nextElement)

        distinctElements.add(prev)
        distinctElements.add(nextElement)
    }

    //has cycles? through naive dfs TLE O(V+E)
    if(hasCycles(next,n))
        return []
    
    //topo sort O(V+E)
    let result=[],visited=new Set()
    let dfs=(node)=>{
        if(node===undefined||visited.has(node))
            return
        visited.add(node)
        if(next[node]&&next[node].size)
            next[node].forEach(d=>dfs(d))
        result.unshift(node)
    }
    distinctElements.forEach(d=>dfs(d))
    return result
};


let hasCycles=( next,n)=>{
    let visited=[...Array(n)].map(d=>0),finished=new Set()
    let hasCycles=node=>{
        if(visited[node])
            return true
        if(finished.has(node))
            return false
        visited[node]=true
        finished.add(node)
        if(next[node]&&next[node].size)
            next[node].forEach(d=>{
                    if(hasCycles(d))
                        return true
            })
        visited[node]=false
        return false
    }
    for (let i = 0; i < n; i++) 
        if(hasCycles(i))
            return true
    return false
}


//topo Sort when an Object of Sets/Arrays is the input
// inputs are Numbers.
let topoSortDFS=next=>{
    let result=[],seen=new Set()
    let dfs=node=>{
        if(!seen.has(node)){
            seen.add(node)
            if(next[node]&&next[node].size) //change.size if array
                next[node].forEach(child=>dfs(Number(child)))
            result.unshift(node)
        }
    }
    for(let node in next)
        dfs(Number(node))//
    return result
}

console.log(topoSortDFS([[4,3,1],[3,2,4],[3],[4],[]]))
console.log(topoSortDFS( {
    0:new Set([4,3,1]),
    1:new Set([3,2,4]),
    2:new Set([3]),
    3:new Set([4]),
    4:new Set([]) } ))