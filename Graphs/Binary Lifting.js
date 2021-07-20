
// Given a tree , we want to resolve queries of  the from [node,k]
// that returns the k-th ancestor of a node

// The idea is to save for each node its 1st,2nd, its 4th, ...its (2^k) ancestor
// and 

// There are only logN powers of 2  <= N, so an NlogN preprocessing can yield us each 2**kth ancestor of a node
var TreeAncestor = function(n, parent) {
    let adj=[...Array(n)].map(d=>[]),
        ancestor=[...Array(n)].map(d=>new Object)
    for(let i=1;i<n;i++)
        adj[parent[i]].push(i)
    let dfs=(node,stack=[])=>{
        stack.push(node)
        for(let i=0;stack.length-1- (1<<i) >=0;i++)
            ancestor[node][1<<i]=stack[stack.length-1-(1<<i)]
        for(let nei of adj[node])
            dfs(nei,stack)
        stack.pop()
    }
    dfs(0)       
    this.A=ancestor,this.n=n
};
TreeAncestor.prototype.getKthAncestor = function(node, k) {
     let res=node
     for(let bit=Math.log2(this.n)+1;bit>=0&&k!==0;bit--)
        if((k&(1<<bit))&& this.A[res][1<<bit]!==undefined)
            res=this.A[res][1<<bit]
     return res===node?-1:res
};