


// Given an undirected / directed graph find the strongly connected components
//+




//tarjan's critical nodes for edges instead
//so the connection between two Strongly Connected Components is what I'm looking for
// so I can just 
// 1.find the components
// 2.see if they re connected
var criticalConnections = function(n, EDGES) {
    
    let adj=[...Array(n)].map(d=>new Set()),
        timeVisited=[...Array(n)].map(d=>0),
        lowestIdReachable=[...Array(n)]
 
    //build the graph
    for(let [x,y] of EDGES)
        adj[x].add(y),
        adj[y].add(x) //<=========== DELETE IF IT'S DIRECTED 
    
    let seen=new Set(),time=0,stack=[],scc=[],bridges=[]
    let dfs=(node,parent=-1)=>{
        if(lowestIdReachable[node]!==undefined)
            return lowestIdReachable[node]
        seen.add(node),stack.push(node)
        timeVisited[node]=time,lowestIdReachable[node]=time++

        adj[node].forEach(child=>{
            if(lowestIdReachable[child]===undefined)
                lowestIdReachable[node]=Math.min(lowestIdReachable[node],dfs(child,node))
            else if(seen.has(child)&&child!==parent)
                lowestIdReachable[node]=Math.min(lowestIdReachable[node],timeVisited[child])
        })
        //this finds bridges (EDGES between strongly conn components)
        adj[node].forEach(child=>{
            if(lowestIdReachable[child]!==undefined && lowestIdReachable[child]!==lowestIdReachable[node]&&!seen.has(child))
                bridges.push([child,node])
        })
        //node is the root of the scc
        if(lowestIdReachable[node]===timeVisited[node]){
            scc.push([])
            let curr
            do{
                curr=stack.pop()
                seen.delete(curr)
                scc[scc.length-1].push(curr)
            }
            while(stack.length&&curr!==node)
        }
        return lowestIdReachable[node]
    }
    dfs(0)

    let sccOf={}//maps a node to its scc (the index on scc)
    for(let i=0;i<scc.length;i++)
        for(let node of scc[i])
            sccOf[node]=i

            
    //OPTIONAL, DELETE IF YOU DONT WANT CRITICAL NODES
    let criticalNodes=new Set()
    bridges.forEach(([f,t])=>{
        let c1=sccOf[f],c2=sccOf[t]
        if(scc[c1].length!==1)
            criticalNodes.add(f)
        if(scc[c2].length!==1)
            criticalNodes.add(t)
    })
    console.log('strongly connected components:', scc)
    console.log('bridges / critical connections ', bridges) //their removal separates to 2 or more SCCs
    console.log('critical nodes',Array.from(criticalNodes)) //their removal separates to 2 or more SCCs 
    console.log(lowestIdReachable)
};
console.log(criticalConnections(
    4,
    [[0,1],[1,2],[2,0],[1,3]]
))