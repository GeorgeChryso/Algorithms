/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(!root)
        return []
    let result=[], q=[root]
    while(q.length){
        let temp=[],nonullexists=false
        for(let node of q){
            if(node){
                result.push(node.val)
                temp.push(node.left,node.right)
                if(node.left!==null||node.right!==null)
                    nonullexists=true
            }
            else
                result.push(null)
        }
        if(!nonullexists)
            break
        q=temp
    }
    return result.join(',') // once an array[null,2] is joined(',')=>it becomes ',2'
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(!data.length)
        return null
    data=data.split(',') // so once a string ',2' is split(',') it becomes [,2]
    let root=new TreeNode(data.shift()),temp=[root]
    while(temp.length){
        let ntemp=[]
        while(temp.length&&data.length){
            let curr=temp.shift()
            if(curr==''||curr==null)
                continue
            let d1=data.shift(),d2=data.shift()
            curr.left=d1!==``?new TreeNode(d1):null 
            curr.right=d2!==``?new TreeNode(d2):null
            ntemp.push(curr.left||``,curr.right||``) //thats why i need to be pushing ``
        }
        temp=ntemp
    }
    return root
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */