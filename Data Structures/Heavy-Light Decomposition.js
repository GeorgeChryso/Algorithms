
class SegmentTreeNode{
    constructor(l,r,A,combinationFunction=(a,b)=>a+b,invalidElement=0 ){
        this.l=l,this.r=r,this.mid=l+r>>1
        this.len=r+1
        this.comb=combinationFunction,
        this.invalidElement=invalidElement
        if(l!==r)
            this.leftChild=new SegmentTreeNode(this.l,this.mid,A,combinationFunction,invalidElement),
            this.rightChild=new SegmentTreeNode(this.mid+1,this.r,A,combinationFunction,invalidElement)
        else
            this.val=A[l]
        this.combine()
    }
    combine(){
        if(this.l!==this.r)
            this.val= this.comb(this.leftChild.val,this.rightChild.val)
    }
    rangeQuery(LEFT,RIGHT){
        if( LEFT<=this.l && this.r <=RIGHT)
            return this.val
        if(LEFT>this.r || RIGHT<this.l || LEFT>RIGHT)
            return this.invalidElement
        return this.comb(this.leftChild(LEFT,RIGHT),this.rightChild(LEFT,RIGHT))
    }
    pointUpdate(index,val){
        if(this.l===this.r)
            this.val=val
        else
            if(index<=this.mid)
                this.leftChild.pointUpdate(index,val)
            else
                this.rightChild.pointUpdate(index,val)
        this.combine()
    }
}
// input: just root
// queries: references to nodes of the tree
class HLD{
    constructor(root,isValueOnEdge=false){
        this.root=root,this.flag=isValueOnEdge,this.pos=0,
        this.nodescount=0
        this.build()
        //LCA variables
        this.time=0,this.m=Math.ceil(Math.log2(this.nodescount))
        this.buildSegAndLCA()
    }
    buildHL(node=this.root,depth=0,parent=this.root){
        node.isHeavy=false,node.depth=depth
        this.nodescount++
        let sz=1,maxChildSize=0,maxChild
        for(let child of node.children){
            child.parent=node
            let childSize=this.buildHL(child,depth+1)
            sz+=childSize
            if(childSize>maxChildSize)
                maxChildSize=childSize,maxChild=child
        }
        maxChild.isHeavy=true
        return sz
    }
    buildSegAndLCA(node=this.root,heavyparent=this.root,stack=[],parent=this.root){
        node.top=node,node.pos=this.pos++
        let position=0
        node.timeEntered=this.time++
        if(node.isHeavy)
            node.top=heavyparent,
            stack.push(node.val)
        node.ancestor=[...Array(this.m+1)]
        for(let bit=1;bit<=this.m;bit++)
            node.ancestor[bit]=node.ancestor[bit-1].ancestor[bit-1]
        for(let child of node.children){    
            let [ST,poz]=this.buildSegAndLCA(child,node.top,node.isHeavy?stack:[node.val],node)
            if(child.isHeavy)
                node.ST=ST,position=poz                       
        }
        node.timeExited=this.time++
        if(node.ST===undefined)
            if(node.isHeavy)
                this.ST=new SegmentTreeNode(0,stack.length-1,stack)
            else
                this.ST=new SegmentTreeNode(0,0,[node.val])
        this.stpos=position
        return [this.ST,position+1]
    }
    calcUP(node,steps){
        let curNode=node,result=0
        while(curNode&&steps>0){
            let curLen=curNode.ST.len-curNode.position
            result=result+curNode.ST.rangeQuery(curNode.position,curNode.position+steps)
            steps-=Math.min(curLen,steps)
            if(curNode.pos===this.root.pos)
                break
            curNode=curNode.top.parent
        }
        return result
    }
    isAncestorOf=(a,b)=> (a.timeEntered<=b.timeEntered && b.timeExited<=a.timeExited)
    findLCA=(a,b)=>{
        if(this.isAncestorOf(a,b) || this.isAncestorOf(b,a))
            return a.timeEntered<b.timeEntered?a:b
        //essentially means find the highest ancestor of a that is not an ancestor of b
        // the LCA will have to be the previous of that node.
        for(let bit=this.m;bit>=0;bit--)
            if(!this.isAncestorOf( a.ancestor[bit],b))
                a=a.ancestor[bit]
        return a.ancestor[0]
    }
    ////////////////////////////////////////EXTERNAL
    query(node1,node2){
        if(node1.pos>node2.pos)
            return this.query(node2,node1)
        if(node1.pos===node2.pos)
            return this.flag?0:node1.val
        let LCA=this.findLCA(node1,node2)
        if(LCA.pos===node1.pos)
            return this.calcUP(node2,node2.depth-LCA.depth)
        return this.calcUP(node1,node1.depth-LCA.depth)+this.calcUP(node1,node1.depth-LCA.depth)-LCA.val     
    }
    updateNODE=(node,newVAL)=>{
        node.val=newVAL
        node.ST.pointUpdate(node.position,newVAL)
    }
}



/*input :  n=number of nodes, (0,...,n-1)
           adj[node]=[..children],
           root=number,values=[Array(n)] such that values[node]=the value of the node
    queries: (node number,node number)

    *** YOU NEED TO MODIFY THE SEGMENT TREE MERGING FUNCTION FOR EACH CASE SEPERATELY **
    (and the queries too)
*/
class STnode{
    constructor(l,r){
        this.val=0,this.l=l,this.r=r,this.mid=this.l+this.r>>1
        if(l!==r)
            this.leftChild=new STnode(l,this.mid),
            this.rightChild=new STnode(this.mid+1,r),
            this.mergeChildren()
    }
    mergeChildren(){ /////////// UPDATE THIS FOR EACH CASE 
        if(this.l!==this.r)
            this.val=this.leftChild.val+this.rightChild.val //example :addition
    }
    pointUpdate(node,newVal){
        if(this.l===this.r)
            this.val=newVal
        else{
            if(node<=this.mid)
                this.leftChild.pointUpdate(node,newVal)
            else
                this.rightChild.pointUpdate(node,newVal)
        }
    }
    rangeQuery(left,right){
        if(left<=this.l&&this.r<=right)
            return this.val
        if(left>right || left> this.r || right < this.l)
            return 0 ///////this toooo
        return this.leftChild.rangeQuery(left,right)+this.rightChild.rangeQuery(left,right)
    }
}
class HLDadj{
    constructor(n,adj,root,values){
        this.parent=[...Array(n)],this.root=root,this.adj=adj,this.n=n
        this.depth=[...Array(n)],this.heavy=[...Array(n)].map(d=>-1), // heavy[parent]=child when that edge is heavy
        this.head=[...Array(n)],this.pos=[...Array(n)] // the head of the current heavy path and the position of the traversal (such that heavy paths are visited consecutively)
        this.depth[root]=0,this.parent[root]=root
        this.curpos=0
        this.dfs()
        this.decompose()
        this.ST=new STnode(0,n-1,this.pos)
        for(let i=0;i<n;i++)
            this.ST.pointUpdate(this.pos[i],values[i])
    }
    //externals
    query(node1,node2){
        let res = 0; // UPDATE THIS FOR EACH CASE
        for (; this.head[node1] != this.head[node2]; node2 = this.parent[this.head[node2]]) {
            if (this.depth[this.head[node1]] > this.depth[this.head[node2]])
                [node1,node2]=[node2,node1]
            //takes the deepest node 
            let cur_heavy_path_max = this.ST.rangeQuery(this.pos[this.head[node2]], this.pos[node2]);
            res += cur_heavy_path_max ///////////////UPDATE THIS
        }
        if (this.depth[node1] > this.depth[node2])
            [node1,node2]=[node2,node1]
        //node1 is now the LCA of the starting nodes btw
        let last_heavy_path_max =this.ST.rangeQuery(this.pos[node1], this.pos[node2]);
        res+=last_heavy_path_max //UPDATE THIS 
        return res;
    }
    updateNode(node,newVal){
        this.ST.pointUpdate(this.pos[node],newVal)
    }
    //internals
    dfs(node=this.root){
        let size=1,maxChildSize1=0
        for(let child of this.adj[node])
            if(child!==this.parent[node]){
                this.parent[child]=node,
                this.depth[child]=this.depth[node]+1
                let childSize=this.dfs(child)
                size+=childSize
                if(childSize>maxChildSize1)
                    maxChildSize1=childSize,this.heavy[node]=child
            }
        return size
    }
    //it visits the heavy paths first, such that the position
    // of a node is consecutive to another only if they belong to the same heavy path
    decompose(node1=this.root,node2=this.root){
        this.head[node1] = node2, this.pos[node1] = this.curpos++;
        if (this.heavy[node1] != -1) //visit the heavy edges first. 
            this.decompose(this.heavy[node1], node2);
        for (let child of this.adj[node1]) 
            if(child!==this.parent[node1] && child!==this.heavy[node1])
                this.decompose(child, child)
    }

} 