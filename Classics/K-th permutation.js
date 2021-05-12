// Given a sequence of numbers / letters- find the k-th  (lexico) permutation


// The naive way=> O( k*n ) runtime + O(n) space  // Notice that k<=(n!) 
// Essentially start from the first permutation (ascending order) 
// and repeat "Next Permutation" k times
var getKthPermutation = function(A,k) {
    var nextPermutation = function(A) {
        let j=A.length-1
        while(j>0&&A[j-1]>=A[j])
            j--
        if(j==0)
            return A.reverse() //OR -1 ( CASE OF THE BIGGEST PERMUTATION)
        // j is now the position of the biggest element in the chain  [BIGGEST>=,...>=,end]
        let element=A[j-1] //We need to place A[j-1] inside this chain, so it replaces its next bigger element
        for(let i=A.length-1;i>=0;i--)
            if(A[i]>element){
                A[j-1]=A[i]
                A[i]=element
                break
            }
        // then we need to reverse the sorted list [A[j],...end]=>[A[end],..A[j]]
        for(let i=j;i<A.length-1-i+j;i++)
            [A[i],A[A.length-1-i+j]]=[A[A.length-1-i+j],A[i]]
    };
//=========Sort first according to some criteria=========\\
    // A.sort((a,b)=>) 
    for(let i=0;i<k-1;i++)
        nextPermutation(A)
    return A
};


/*
   Things that can dramatically affect the problem's solution:
       1)  The elements are distinct => can be solved in O(n^2)
*/
// O(n^2)
let kthPermutation=(A,k)=>{
    let n=A.length,fact=[1,1],result=[]
    for(let i=2;i<=n;i++)
        fact.push(fact[fact.length-1]*i)
    A.sort((a,b)=>a-b) // find the LOWEST permutation (delete if you re already at the smallest)
    for(let q=0;q<n;q++){
        let j=0,times=fact[A.length-1]
        while((times*(j+1))<k)
            j++
        result.push(A.splice(j,1)[0])
        k-=times*(j)
    }
    return result
}
// O(nlogn)
let kthPerm=(A,k)=>{
    class Node{
        constructor(val,left=null,right=null,parent=null,bf=0,height=0){
            this.val=val
            this.left=left,this.right=right,this.parent=parent
            this.bf=bf,this.height=height
            this.SubTreeNodes=1
        }
    }
    // CAN ONLY STORE UNIQUE VALUES
    class AVL{
        constructor(){
            this.nodeCount=0
            this.root=null
        }
    //===M O D I F Y   FOR     COMPLEX     NODES==\\
        NODIFY(val){  //should return a new node based on the stats given
            return new Node(val)
        }
        comparator=(node1,node2)=>{// basic comparator that returns <0,0,>0 if node1>node2,node1==node2,node1<node2
            return node1.val-node2.val
        }
    //-------------U S A B L E------------------\\
        //returns true if the value was inserted successfully
        //returns false if the value already exists
        insert(NODE){ //O(logn) 
            if(NODE===null)
                return false
            NODE=this.NODIFY(NODE)
            if(!this.contains(this.root,NODE)){
                this.root=this.ins(this.root,NODE)
                this.nodeCount++
                return true
            }
            return false
        }
        remove(NODE){ 
            if(NODE===null)
                return false
            NODE=this.NODIFY(NODE)
           // console.log(this.contains(this.root,new Node(7)))
            if(this.contains(this.root,NODE)){
                this.root=this.rem(this.root,NODE)
                this.nodeCount--
                return true
            }
            return false
            //rebalance the tree
        }
        has(NODE){
            NODE=this.NODIFY(NODE)
            return this.contains(this.root,NODE)
        }
        traversalASC(){ //O(n)
            let result=[]
            let dfs=(node)=>{
                if(!node)
                    return
                dfs(node.left)
                result.push(node)
                dfs(node.right)
            }
            dfs(this.root)
            return result
        }
        findNextSmaller(NODE){
            NODE=this.NODIFY(NODE)
            let cur=this.root,result=null
            while(cur!==null){
                if(this.comparator(cur,NODE)<0)
                    result=cur,
                    cur=cur.right
                else
                    cur=cur.left
            }
            if(result===null)
                return false // no such element
            return result
        }
        findNextBigger(NODE){
            NODE=this.NODIFY(NODE)
            let cur=this.root,result=null
            while(cur!==null){
                if(this.comparator(cur,NODE)<=0)
                    cur=cur.right
                else
                    result=cur,
                    cur=cur.left
            }
            if(result===null)
                return false // no such element
            return result
        }
        findKthelement(k){
            if(this.nodeCount<k)
                return null
            return this.findKth(this.root,k)
        }
    //--------- I N T E R N A L S -----------------\\
        contains(node,val){
            if(node===null)
                return false
            let compare=this.comparator(node,val)
            if(compare<0) //node<val
                return this.contains(node.right,val)
            if(compare>0)
                return this.contains(node.left,val)
            return true
        }
        //inserts newNode to target node
        ins(tree,value){
            if(tree===null)
                return value
            //(target is bigger? insert it to the left): else to the right
            if(this.comparator(tree,value)>0)
                tree.left=this.ins(tree.left,value)
            else
                tree.right=this.ins(tree.right,value)
            //update balance factor of the target
            this.update(tree) 
            return this.rebalance(tree) //balance the target if it needs rebalancing
        }
        rem(node,elem){
            if(node===null)
                return null
            //search an existing node with the given value
            let compare=this.comparator(elem,node)//-----
            if(compare<0)
                node.left=this.rem(node.left,elem)
            else if(compare>0)
                node.right=this.rem(node.right,elem)
            else{ //node found
                 //remove the node and replace it with its sucessor
                if(node.left===null)
                    return node.right
                else if(node.right===null)
                    return node.left
                else{ //still has both subtrees? 
                    if(node.left.height>node.right.height){
                        let successor=this.findMax(node.left)/////
                        node.left=this.rem(node.left,successor)
                    }   
                    else{
                        let successor=this.findMin(node.right)
                        node.right=this.rem(node.right,successor)
                    }
                }
            }
            this.update(node)
            return this.rebalance(node)
        }
        //find the min and max node of the subtree rooted at (node)
        findMin=(node)=>node.left?this.findMin(node.left):node
        findMax=(node)=>node.right?this.findMax(node.right):node
        //balances the subtree rooted at node if it is imbalanced (has balancefactor=+-2)
        //and returns the now balanced node
        rebalance(node){  //4 cases, 4 rotations
            if(node.bf==-2){
                if(node.left.bf<=0)
                    return this.LL(node)
                else
                    return this.LR(node)
            }
            else if(node.bf==2){
                if(node.right.bf>=0)
                    return this.RR(node)
                else
                    return this.RL(node)
            }
            return node
        }
        //update the balance factor and the height of the current node
        update(node){ 
            let leftHeight=node.left!==null?node.left.height:-1,rightHeight=node.right!==null?node.right.height:-1
            node.height=Math.max(leftHeight,rightHeight)+1
            node.bf=rightHeight-leftHeight
            node.SubTreeNodes=1+(node.left===null?0:node.left.SubTreeNodes )+(node.right===null?0:node.right.SubTreeNodes)
        }
    
        //4 cases of unbalanced trees
        LL=(node)=>this.rightRotation(node)
        RR=(node)=>this.leftRotation(node)
        LR(node){
            node.left=this.leftRotation(node.left)
            return this.LL(node)
        }
        RL(node){
            node.right=this.rightRotation(node.right)
            return this.RR(node)
        }
        //2 total rotations that work on RR and LL cases
        leftRotation(node){
            let newParent=node.right
            node.right=newParent.left
            newParent.left=node
            this.update(node)
            this.update(newParent)
            return newParent
        }
        rightRotation(node){
            let newParent=node.left
            node.left=newParent.right
            newParent.right=node
            this.update(node)
            this.update(newParent)
            return newParent
        }
        findKth(node,k){
            let leftCount=node.left?node.left.SubTreeNodes:0
            if(leftCount+1===k)
                return node.val
            if(leftCount+1<k)
                return this.findKth(node.right,k-leftCount-1)
            return this.findKth(node.left,k)
        }
    }
    let n=A.length,fact=[1],result=[],
        S=new AVL(),freq={}
    for(let i=1;i<=n;i++)
        fact.push(fact[fact.length-1]*i),
        S.insert(A[i-1]),
        freq[A[i-1]]=(freq[A[i-1]]||0) +1
    
    let res=[]
    for(let q=0;q<n;q++){
        let times=fact[n-1],j=Math.ceil(k/times)
        res.push(S.findKthelement(j))
        S.remove(S.findKthelement(j))
        k-=times*(j)
        n--
    }
    return result
}
/*
    2) There can be repetition of elements
    // USE a hashset and an AVL tree for fast removals/insertions
*/