

// So this only works for a DAG.
// the whole concept is a BFS traversal, wheer
// the nodes inside the q have an indegree of 0 for each iteration

//input is an object of Sets or an array of arrays/sets. 
// where next[node]=Set{nodes}
let Kahn=next=>{
    let indegree={},q=[],result=[]
    for(let node in next)
        if(next[node])
            next[node].forEach(child=>
                indegree[child]=(indegree[child]||0)+1)
    
    for(let node in next)
        if(indegree[node]===undefined) //indeg=0
            q.push(node)

    while(q.length){
        let temp=[]
        q.forEach(node=>{
            if(next[node])
                next[node].forEach(child=>{
                    indegree[child]--
                    if(indegree[child]==0)
                        temp.push(child)
                })
            result.push(node)
        })
        q=temp
    }
    return result
}

console.log(Kahn([[4,3,1],[3,2,4],[3],[4],[]]))
console.log(Kahn( {
    0:new Set([4,3,1]),
    1:new Set([3,2,4]),
    2:new Set([3]),
    3:new Set([4]),
    4:new Set([]) } ))