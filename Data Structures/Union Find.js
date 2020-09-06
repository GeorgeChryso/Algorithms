
// Keeps track of Elements which are split onto one or more Disjoint sets.
// Union(A,B)=> merges the SETS A, B belong TO. (A and B are elements)
// FIND(A)=> finds the SET A belongs to. 


// Implementation through the use of an Array
class UnionFind {

    constructor(){
        //the total count of different elements(not groups) in this union find
        this.count
        //tracks the sizes of each of the components(groups/sets)
        this.groupSize=[]
        //number of components(groups) in the union find
        this.numComponents
        //points to the parent of i, if parent[i]=i, i is a root node
        this.parent=[] //which is also the index of the group
    }

    //construction -O(n) n=size:The total number of elements
    //put every element into its own group
    construction(size){
        if(size<=0)return 'Wrong size'
        this.count=this.numComponents=size 
        this.groupSize=[...Array(size)] 
        this.id=[...Array(size)] 

        for (let i = 0; i < size; i++) {
            this.groupSize[i]=i     
            this.parent[i]=i            
        }
    }

    //returns to which component (group) my element belongs to 
    // α(n) --Amortized constant time 
    // Update: Also compresses the paths so that each child points to its 
    // parent
    find(element){
        let root=element
        //find the parent of the group the elemnt belongs to
        // When root===parent[root] is always the parent of that group (root)
        while(root!=this.parent[root])
            root=this.parent[root]

        // Compression, point the element to its parent if its not already pointed
        // Tldr: Not only do I point my element to its actual root, i point any
        // inbetween element to the root aswell
        while(element!=root){
            let next=this.parent[element]
            this.parent[element]=root
            element=next
        }
        
        return root
    }   

    //Unifies the sets containing A and B
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A) //parent of A
            ,root2=this.find(B) //parent of B

        // I want to put the set with fewer elements 
        // to the one with more elemenets
        if(this.groupSize[root1]<this.groupSize[root2]){
            this.groupSize[root2]+=this.groupSize[root1]
            this.parent[root1]=this.parent[root2]
        }
        else {
            this.groupSize[root1]+=this.groupSize[root2]
            this.parent[root2]=this.parent[root1]
        }

        this.numComponents-- //cos 1 less group, since i merged 2
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}