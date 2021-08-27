

// inputs: n number of nodes, root , adj 

// 1. be able to find dist(node1,node2) in O(logn) through LCA
// 2. create the centroid decomposition
// 3. queries ( e.g. closest marked node to node1 ) and updates (mark Node) in O(loglogn)

// INPUT IS DIRECTED, works for undirected input aswell ( no rooted tree)
// adj[node]=[...children]   (adj.length ==== n) 
let adj,n,root // INPUTS
//examples
adj=[ [1],[2,4,8],[5,3],[7,10],[],[6],[],[],[9],[],[11],[12],[]],n=13,root=0
adj=[[1,10],[2,7],[3,4],[],[5,6],[],[],[8],[9],[],[11],[12],[]]



// In the centroid tree, what I achieve is:
// for every node X in the original tree, every node in the neighborhood of X 
// is a child of X in the centroid tree.
// A node adjacent to the neighborhood of X in the original Tree 
// is a Parent of X in the centroid tree


class CentroidDecomposition{
    constructor(adj,n,root=0){
        this.adj=adj,this.n=n,this.root=root
        this.m=Math.ceil(Math.log2(n)),this.depth=[...Array(n)],this.subtreeSize=[...Array(n)],
        this.ancestor=[...Array(n)].map(d=>[...Array(this.m+1)]),
        this.isCentroid=[...Array(n)].map(d=>false),
        this.timeEntered=[...Array(n)],this.timeExited=[...Array(n)],this.time=0
        this.depth[root]=0
        this.DepthLCAdfs(root,root)

        // this.adj2=this.adj //////////////////////////IF ITS ALREADY BIDIRECTIONAL
        this.adj2=[...Array(n)].map(d=>[])
        for(let i=0;i<n;i++)
            for(let child of adj[i])
                this.adj2[child].push(i),
                this.adj2[i].push(child)
        // PROBLEM SPECIFIC
        this.isMarked=[...Array(n)].map(d=>false)
        this.closestMarkedNode=[...Array(n)] //in the Centroid Tree
        this.closestMarkedNodeDist=[...Array(n)].map(d=>Infinity)
        /////////////////////////////////
        this.DepthLCAdfs(root,root)
        this.subTreeSizesDFS(root,null)
        this.decoParent=[...Array(n)],
        this.adjD=[...Array(n)].map(d=>[]), //the NEW GRAPH after Decomposition (directed)
        this.newDecoRoot=this.findCentroidsDFS(root,null,n)
     
    }   
    // INTERNALS    
    DepthLCAdfs=(node,parent)=>{
        this.ancestor[node][0]=parent
        for(let bit=1;bit<=this.m;bit++)
        this.ancestor[node][bit]=this.ancestor[this.ancestor[node][bit-1]] [bit-1]
        this.timeEntered[node]=this.time++
        for(let child of this.adj[node])
            if(child!==parent)
                this.depth[child]=this.depth[node]+1,
                this.DepthLCAdfs(child,node)    
        this.timeExited[node]=this.time++
    }
    isAncestorOf=(a,b)=> (this.timeEntered[a]<=this.timeEntered[b] && this.timeExited[b]<=this.timeExited[a])
    LCA=(a,b)=>{
        if(this.isAncestorOf(a,b) || this.isAncestorOf(b,a))
            return this.timeEntered[a]<this.timeEntered[b]?a:b
        //essentially means find the highest ancestor of a that is not an ancestor of b
        // the LCA will have to be the previous of that node.
        for(let bit=this.m;bit>=0;bit--)
            if(!this.isAncestorOf(this.ancestor[a][bit],b))
                a=this.ancestor[a][bit]
        return this.ancestor[a][0]
    }
    //(count of edges betweeen 2 nodes)
    distance=(node1,node2)=>this.depth[node1]+this.depth[node2]-2*this.depth[this.LCA(node1,node2)]
    subTreeSizesDFS=(node,parent)=>{
        this.subtreeSize[node]=1
        for(let child of this.adj2[node])
            if(child!==parent&&!this.isCentroid[child])
                this.subtreeSize[node]+=this.subTreeSizesDFS(child,node)
        return this.subtreeSize[node]
    }
    // O(nlogn)
    findCentroidsDFS=(node,cparent,totalNodes,parent)=>{
        for(let child of this.adj2[node])//find and return the centroid of this path
            if(!this.isCentroid[child]&&this.subtreeSize[child]>Math.floor(totalNodes/2)&&child!==parent)
                return this.findCentroidsDFS(child,cparent,totalNodes,node)
        //if no centroid was found, the current node is the centroid
        this.isCentroid[node]=true,this.decoParent[node]=cparent
        for(let child of this.adj2[node])
            if (!this.isCentroid[child]) //find the centroids of the children subtrees
                this.subTreeSizesDFS(child,node),
                this.adjD[node].push(this.findCentroidsDFS(child,node,this.subtreeSize[child],node))
        return node
    }
    ///////////////////////////////// EXTERNALS
    // The whole idea is: 
    // Any optimal answer(for example closest marked node) for a node X,
    // not belonging to the neighborhood of X, 
    // has to go through the parent of X (in the centroid tree)
    // Each subtree in the centroid tree forms a connected component in the original tree
    // mark a node- O(loglogn) 
    pointUpdate(node){
        this.isMarked[node]=true,this.closestMarkedNode[node]=node
        this.closestMarkedNodeDist[node]=0
        let par=this.decoParent[node]
        while(par!==null){
            let d=this.distance(node,par)
            if(this.closestMarkedNodeDist[par]>d)
                this.closestMarkedNodeDist[par]=d,
                this.closestMarkedNode[par]=node
            par=this.decoParent[par]
        }
    }
    //find the closest marked node to node - O(loglogn) 
    nodeQuery(node){
        let par=this.decoParent[node],
            cdist=this.closestMarkedNodeDist[node],
            cnode=this.closestMarkedNode[node]
        while(par!==null){
            let d=this.distance(node,par)
            if(cdist>d+this.closestMarkedNodeDist[par])
                cdist=d+this.closestMarkedNodeDist[par],
                cnode=this.closestMarkedNode[par]
            par=this.decoParent[par]
        }
        // closest marked node,distance to closest marked
        return [ cnode,cdist]
    }
}

let CD=new CentroidDecomposition(adj,13,0)

console.log(CD.nodeQuery(0))
CD.pointUpdate(4)
console.log(CD.nodeQuery(3))