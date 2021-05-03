


// MODIFY THIS EVERY TIME.
class Node{
    constructor(val,left=null,right=null,parent=null,balancedFactor=0,height=0){
        this.val=val
        this.left=left,this.right=right,this.parent=parent
        this.balancedFactor=balancedFactor,this.height=height
    }
}

// CAN ONLY STORE UNIQUE VALUES ( what if the nodes have different characteristics? hmm)
class AVL{
    constructor(){
        this.nodeCount=0
        this.root=null
        //takes 2 nodes
        this.comparator=(a,b)=>a.val-b.val
    }
//-------------U S A B L E------------------\\
    NODIFY(val){
        return new Node(val)
    }
    contains(node,val){
        if(node===null)
            return false
        let compare=this.comparator(node,val)
       // console.log(compare,node,val)
        if(compare<0)
            return this.contains(node.left,val)
        if(compare>0)
            return this.contains(node.right,val)
        return true
    }
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

//--------- I N T E R N A L S -----------------\\
    //inserts newNode to target node
    ins(tree,value){
        if(tree===null)
            return value
        //(target is bigger? insert it to the left): else to the right
        if(this.comparator(value,tree.val)>0)
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
                    node.val=successor/////////////////////////////////
                    node.left=this.rem(node.left,successor)
                }   
                else{
                    let successor=this.findMin(node.right)
                    node.val=successor
                    node.right=this.rem(node.right,successor)
                }
            }
        }
        this.update(node)
        return this.rebalance(node)
    }
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
        else if(node.bf===2){
            if(node.right.bf>=0)
                return this.RR(node)
            else
                return this.RL(node)
        }
        return node
    }
    //update the balance factor and the height of the current node
    update(node){ 
        let leftHeight=-1,rightHeight=-1
        if(node.left)
            leftHeight=node.left.height
        if(node.right)
            rightHeight=node.right.height
        node.height=Math.max(leftHeight,rightHeight)+1
        node.balancedFactor=rightHeight-leftHeight
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

}


let S=new AVL()

