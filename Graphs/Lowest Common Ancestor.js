
// queries of the form [node1.val,node2.val] 
let LCA=(root,adj,queries,n)=>{
    let euler=[],    //stores thje order of the vertices in the dfs
        first=[...Array(n)],    // stores the first occurence of each vertex i in euler
        height=[...Array(n)]    //stores the distance of each node from root 
    //1 DFS for eulerian tour 
    let dfs=(node,h=0)=>{
        if(!node)
            return
        euler.push(node.val)
        if(first[node.val]===undefined)
            first[node.val]=euler.length-1
        height[node.val]=h
        for (let child of adj[node])
            dfs(child,h+1)
        if(euler[euler.length-1].val!==node.val)
            euler.push(node.val)
    }
    dfs(root)
    // Idea: LCA(u1,u2)= the vertex that minimizes height between indices 
    // euler[first[u1]], ....., euler[first[u2]]
    // So essentially min range queries that return the node with the min value 

    // Ok so now I have 5 ways of solving queries of the form (u1,u2)
    // 1. SQRT decomposition => O(n) preprocessing + O(sqrt(N))queries
    // 2. Segment TREE       => O(N) preprocessing + O(logN ) queries
    // 3. Sparse Table       => O(nlogn) preproc   + O(1) queries ( cant be updated tho)
    // 4. Binary Lifting     => O(nlogn) preproc   + O(logN) queries
    // 5. Farach Colton Bender=> O(N) preproc +  O(1) queries
    class STnode{
        constructor(l,r){
            this.l=l,this,this.r=r,this.node
            if(l!==r)
                this.L=new STnode(l, l+r>>1),this.R=new STnode(l+r>>1 +1,r),
                this.update()
            else
                this.node=euler[l]
        }
        update(){
            if(this.l!=this.r)
                this.node=(height[this.L.node]<height[this.R.node])?this.L.node:this.R.node
        }
        rangeQuery=(left,right)=>{
            if( left<= this.l && this.r <=right)
                return this.node
            else if (left>this.r||right<this.l)
                return undefined
            let [nl,nr]=[this.L.rangeQuery(left,right),this.R.rangeQuery(left,right)]
            return (nr===undefined||height[nl]<height[nr])?nl:nr
        }
    }
    let S=new STnode(0,euler.length-1)
    return queries.map( ([U,V])=> S.rangeQuery( first[U], first[V] )[0])
}