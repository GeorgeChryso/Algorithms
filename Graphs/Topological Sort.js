
//O(V+E)

//number of verties, [...[next,previous]]
var topoSort = function(n, prerequisites) {
    let adj=[...Array(n)].map(d=>[...Array(n)].map(q=>0)) 
    for (const [next,prev] of prerequisites) {
        adj[prev][next]=1
    }

    //has cycles? through naive dfs TLE O(V+E)
    let visited=[...Array(n)].map(d=>0)
    let finished=new Set()
    let hasCycles=node=>{
        if(visited[node])return true
        if(finished.has(node))return false
        visited[node]=true
        finished.add(node)
        if(adj[node])
           for (let i = 0; i < adj[node].length; i++) {
                if(adj[node][i]){
                    if(hasCycles(i))return true
                }               
           }
        visited[node]=false
        return false
    }
    for (let i = 0; i < n; i++) {   
        if(hasCycles(i))return [] 
    }

    //topo sort O(V+E)
    visited=new Set()
    let result=[]
    let dfs=(node)=>{
        if(node===undefined||visited.has(node))return
        visited.add(node)
        for (let i = 0;adj[node]&& i < adj[node].length; i++) {
           if(adj[node][i]) dfs(i)            
        }
        result.unshift(node)
    }

    for (let i = 0; i < n; i++) {
        dfs(i)        
    }
    
    return result
};