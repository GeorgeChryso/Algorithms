
// Keeps track of Elements which are split onto one or more Disjoint sets.
// Union(A,B)=> merges the SETS A, B belong TO. (A and B are elements)
// FIND(A)=> finds the SET A belongs to. 


// Implementation through the use of an Array
class UnionFind {

    constructor(size){
        //the total count of different elements(not groups) in this union find
        this.count=size
        //tracks the sizes of each of the components(groups/sets)
        //groupsize[a] returns how many elements the component with root a has 
        this.groupSize=[...Array(size)] 
        //number of components(groups) in the union find
        this.numComponents=size
        //points to the parent of i, if parent[i]=i, i is a root node
        this.parent=[...Array(size)]  //which is also the index of the group

        //put every element into its own group
        // rooted at itself
        for (let i = 0; i < size; i++) {
            this.groupSize[i]=1 
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
        // inbetween elements to that root aswell
        while(element!=root){
            let next=this.parent[element]
            this.parent[element]=root
            element=next
        }
        
        return root
    }   

    //Unifies the sets containing A and B
    // if not already unified 
    // α(n) --Amortized constant time 
    union(A,B){
        let root1=this.find(A) //parent of A
            ,root2=this.find(B) //parent of B
        if(root1===root2) //already unified
            return false    
        // I want to put the set with fewer elements 
        // to the one with more elemenets
        if(this.groupSize[root1]<this.groupSize[root2]){
            this.groupSize[root2]+=this.groupSize[root1]
            this.parent[root1]=root2
            this.parent[A]=this.parent[B]=root2
        }
        else {
            this.groupSize[root1]+=this.groupSize[root2]
            this.parent[root2]=root1
            this.parent[A]=this.parent[B]=root1
        }

        this.numComponents-- //cos 1 less group, since i merged 2
        return true
    }

    //same parent=>samegroup
    sameGroup=(A,B)=>this.find(A)==this.find(B)

    //essentially the groupSize of its parent's group
    sizeOfGroup=(A)=>this.groupSize[this.find(A)]

}



class DS {
    constructor(n) {
      this.id = [...Array(n).keys()];
      this.rank = Array(n).fill(0);
    }
    
    find(i) {
      if (i !== this.id[i]) 
        this.id[i] = this.find(this.id[i]);
      return this.id[i];
    }
    
    union(i, j) {
      const [I, J] = [this.find(i), this.find(j)];
      if (I === J) return false;
      const [rankI, rankJ] = [this.rank[I], this.rank[J]];
      if (rankI < rankJ) this.id[I] = J;
      else if (rankI > rankJ) this.id[J] = I;
      else {
        this.id[I] = J;
        this.rank[J]++;
      }
      return true;
    }
    sameGroup=(A,B)=>this.find(A)==this.find(B)
    sizeOfGroup=A=>this.rank[this.find(A)]
  }


  //object based uniion find
  class DS {
    constructor() {
      this.id = {}
      this.rank = {}  //numComponents
    }
    add=(key)=>{ //add a new object
        this.id[key]=key
        this.rank[key]=0
    }
    find(i) {
      if(this.id[i]===undefined){
         return -1
      }
      if (i !== this.id[i]) 
        this.id[i] = this.find(this.id[i]);
      return this.id[i];
    }
    
    union(i, j) {
      const [I, J] = [this.find(i), this.find(j)];
      if(I===null||J===null)
            return false
      if (I === J) return false;
      const [rankI, rankJ] = [this.rank[I], this.rank[J]];
      if (rankI < rankJ) this.id[I] = J;
      else if (rankI > rankJ) this.id[J] = I;
      else {
        this.id[I] = J;
        this.rank[J]++;
      }
      return true;
    }
    sameGroup=(A,B)=>this.find(A)==this.find(B)
    sizeOfGroup=A=>this.rank[this.find(A)]
  }



  // Good for: 
  // Painting contiguous subarrays (OFFLINE):
  // Given queries [L,R,color] , you paint the subarray [L,R] with that color
  // then you need to query a point for its final color
  