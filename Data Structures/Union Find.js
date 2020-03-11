



// Implementation through the use of an Array
class UnionFind {

    constructor(){
        //the number of elements in this union find
        this.size
        //tracks the sizes of each of the components(groups/sets)
        this.sz
        //number of components(groups) in the union find
        this.numComponents
        //points to the parent of i, if id[i]=i, i is a root node
        this.id=[] 
    }

    //construction -O(n) n=size:The total number of elements
    //put every element into its own group
    construction(size){
        if(size<=0)return 'Wrong size'
        this.size=this.numComponents=size 
        this.sz=[...Array(size)] 
        this.id=[...Array(size)] 

        for (let i = 0; i < size; i++) {
            this.sz[i]=i     
            this.id[i]=i            
        }
    }

    //returns to which component (group) my element belongs to 
    // α(n) --Amortized constant time 
    // Update: Also compresses the paths so that each child points to its 
    // parent
    find(element){
        let root=element
        while(root!=this.id[root])root=this.id[root]

        // Compression, point the element to its parent if its not already pointed
        while(element!=root){
            let next=this.id[element]
            this.id[element]=root
            element=next
        }
        
        return root
    }   

    //Unifies the sets containing A and B
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A)
        let root2=this.find(B)

        // I want to put the set with fewer elements 
        // to the one with more elemenets


        if(this.sz[root1]<this.sz[root2]){
            this.sz[root2]+=this.sz[root1]
            this.id[root1]=this.id[root2]
        }
        else {
            this.sz[root1]+=this.sz[root2]
            this.id[root2]=this.id[root1]
        }

        this.numComponents-- //cos 1 less group
    }

    sameGroup=(A,B)=>this.find(A)==this.find(B)
    sizeOfGroup=(A)=>this.sz[this.find(A)]
    //total size of elements inthe Union Find set
    size=()=>this.size
    totalGroups=()=>this.numComponents

}