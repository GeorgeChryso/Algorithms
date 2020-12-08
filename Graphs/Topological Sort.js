
//O(V+E)

//number of vertices, [...[next,previous]]
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