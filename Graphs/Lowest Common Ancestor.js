
// queries of the form [node1.val,node2.val] 
// Segment Tree+ eulerian path approach
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
            dfs(child,h+1),
            euler.push(node.val)
    }
    dfs(root)
    //================================================
    // Idea: LCA(u1,u2)= the vertex that minimizes height between indices 
    // euler[first[u1]], ....., euler[first[u2]]
    // So essentially min range queries that return the node with the min value 
    //================================================
    // Ok so now I have 5 ways of solving queries of the form (u1,u2)
    // 1. SQRT decomposition => O(n) preprocessing + O(sqrt(N))queries
    // 2. Segment TREE       => O(N) preprocessing + O(logN ) queries
    // 3. Sparse Table       => O(nlogn) preproc   + O(1) queries ( cant be updated tho)
    // 4. Binary Lifting     => O(nlogn) preproc   + O(logN) queries
    // 5. Farach Colton Bender=> O(N) preproc +  O(1) queries
    class STnode{
        constructor(l,r){
            this.l=l,this.r=r,this.node,this.L,this.R
            if(l!==r)
                this.L=new STnode(l, l+r>>1),this.R=new STnode((l+r>>1) +1,r),
                this.update()
            else
                this.node=euler[l]
        }
        update(){
            if(this.l!=this.r)
                this.node=(height[this.L.node]<height[this.R.node])?this.L.node:this.R.node
        }
        rangeQuery=(left,right)=>{
            if(left>right)
                return this.rangeQuery(right,left)
            if( left<= this.l && this.r <=right)
                return this.node
            else if (left>this.r||right<this.l)
                return -Infinity
            let [nl,nr]=[this.L.rangeQuery(left,right),this.R.rangeQuery(left,right)]
            return (nl!==-Infinity&&(nr===-Infinity||height[nl]<height[nr]))?nl:nr
        }
    }
    let S=new STnode(0,euler.length-1)
    return queries.map( ([U,V])=> S.rangeQuery( first[U], first[V] )[0])
}



//binary lifting through binary search (nlogn processing + logHlogN queries)
let LCA=(root,adj,queries,n)=>{
    let adj=[...Array(n)].map(d=>[]),
    ancestor=[...Array(n)].map(d=>new Object)

    let kthancestor=(node,k)=>{
        if(k===0)
            return node
        for(let bit=Math.log2(n)+1;bit>=0;bit--)
            if(k&(1<<bit))
                node=ancestor[node][1<<bit]
        return node
    }

    let dfs=(node,stack=[],height=0)=>{
        stack.push(node)
        ancestor[node][0]=node
        for(let i=0;stack.length-1- (1<<i) >=0;i++)
            ancestor[node][1<<i]=stack[stack.length-1-(1<<i)]
        for(let nei of adj[node])
            dfs(nei,stack,height+1)
        stack.pop()
    }
    dfs(root)       
    return queries.map( ([u,v])=>{
        if(height[u]<height[v])
            [u,v]=[v,u]
        //move u by diff
        let diff=height[u]-height[v],res
        if(diff>0)
            u=kthancestor(u,diff)
        let lo=0,hi=height[u],res
        while(lo<=hi){
            let mid=lo+hi>>1,
                [uu,vv]=[kthancestor(u,mid),kthancestor(v,mid)]
            if(uu===vv)
                res=uu,
                hi=mid-1
            else
                u=uu,v=vv,
                lo=0,hi=hi-mid
        }
        return res
    })
}

// Strict Binary Lifting => O(nlogn preprocessing) + O(logn queries)
let LCA=(root,adj,queries,n)=>{
    let adj=[...Array(n)].map(d=>[]),m=Math.ceil(Math.log2(n)),
        ancestor=[...Array(n)].map(d=>[...Array(m+1)])
        timeEntered=[...Array(n)],timeExited=[...Array(n)],time=0

    let isAncestorOf=(a,b)=> (timeEntered[a]<=timeEntered[b] && timeExited[b]<=timeExited[a])

    let dfs=(node,parent)=>{
        timeEntered[node]=time++
        ancestor[node][0]=parent
        // essentially means to go up 2**bit => go up 2**(bit-1)+ another 2**(bit-1) 
        for(let bit=1;bit<=m;bit++)
            ancestor[node.val][bit]=ancestor[ ancestor[node.val][bit-1] ] [bit-1]
        for(let child of adj[node])
            dfs(child,node)
        timeExited[node]=time++
    }
    dfs(root,root)      
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
    return queries.map( ([u,v])=>LCA(u,v))
}