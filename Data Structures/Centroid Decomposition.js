

// inputs: n number of nodes, root , adj 

// 1. be able to find dist(node1,node2) in O(logn) through LCA
// 2. create the centroid decomposition
// 3. queries ( e.g. closest marked node to node1 ) and updates (mark Node) in O(loglogn)

// INPUT IS DIRECTED, works for undirected input aswell ( no rooted tree)
// adj[node]=[...children]   (adj.length ==== n) 
let adj,n,root // INPUTS
//example
adj=[ [1],[2,4,8],[5,3],[7,10],[],[6],[],[],[9],[],[11],[12],[]],n=13,root=0


let m=Math.ceil(Math.log2(n)),depth=[...Array(n)],subtreeSize=[...Array(n)],
    ancestor=[...Array(n)].map(d=>[...Array(m+1)]),
    isCentroid=[...Array(n)].map(d=>false),
    timeEntered=[...Array(n)],timeExited=[...Array(n)],time=0
depth[root]=0
let DepthLCAdfs=(node,parent)=>{
    ancestor[node][0]=parent
    for(let bit=1;bit<=m;bit++)
        ancestor[node][bit]=ancestor[ancestor[node][bit-1]] [bit-1]
    timeEntered[node]=time++
    for(let child of adj[node])
        if(child!==parent)
            depth[child]=depth[node]+1,
            DepthLCAdfs(child,node)    
    timeExited[node]=time++
}
let isAncestorOf=(a,b)=> (timeEntered[a]<=timeEntered[b] && timeExited[b]<=timeExited[a])
let LCA=(a,b)=>{
    if(isAncestorOf(a,b) || isAncestorOf(b,a))
        return timeEntered[a]<timeEntered[b]?a:b
    //essentially means find the highest ancestor of a that is not an ancestor of b
    // the LCA will have to be the previous of that node.
    for(let bit=m;bit>=0;bit--)
        if(!isAncestorOf(ancestor[a][bit],b))
            a=ancestor[a][bit]
    return ancestor[a][0]
}
//(count of edges betweeen 2 nodes)
let distance=(node1,node2)=>depth[node1]+depth[node2]-2*depth[LCA(node1,node2)]
//make the EDGES 2 BIDIRECTIONAL.  
//////////DELETE AND REPLACE WITH ADJ IF ITS ALREADY BIDIRECTIONAL
let adj2=[...Array(n)].map(d=>[])
for(let i=0;i<n;i++)
    for(let child of adj[i])
        adj2[child].push(i),
        adj2[i].push(child)
// adj2=adj //////////////////////////IF ITS BIDIRECTIONAL
let subTreeSizesDFS=(node,parent)=>{
    subtreeSize[node]=1
    for(let child of adj2[node])
        if(child!==parent&&!isCentroid[child])
            subtreeSize[node]+=subTreeSizesDFS(child,node)
    return subtreeSize[node]
}
// O(nlogn)
let findCentroidsDFS=(node,cparent,totalNodes,parent)=>{
    for(let child of adj2[node])//find and return the centroid of this path
        if(!isCentroid[child]&&subtreeSize[child]>Math.floor(totalNodes/2)&&child!==parent)
            return findCentroidsDFS(child,cparent,totalNodes,node)
    //if no centroid was found, the current node is the centroid
    isCentroid[node]=true,decoParent[node]=cparent
    for(let child of adj2[node])
        if (!isCentroid[child]) //find the centroids of the children subtrees
            subTreeSizesDFS(child,node),
            adjD[node].push(findCentroidsDFS(child,node,subtreeSize[child],node))
    return node
}
DepthLCAdfs(root,root)
subTreeSizesDFS(root,null)
let decoParent=[...Array(n)],
    adjD=[...Array(n)].map(d=>[]), //the NEW GRAPH after Decomposition (directed)
    newDecoRoot=findCentroidsDFS(root,null,n)
console.log(newDecoRoot,LCA(5,6))