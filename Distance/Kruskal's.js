//Finds the MST of an UNDIRECTED WEIGHTED GRAPH
//using UNION FIND

// Complexity O(ElogE+ElogV) because sorting takesd LogE find/union take logV
let Kruskals=edges=>{

    //optional(incase im not given the total number of different Vertices)
    let diffVertices=new Set()
    //sort ascending + check the total number of Vertices
    edges.sort(([source,to,cost],[source2,to2,cost2])=>{
        diffVertices.add(source) 
        diffVertices.add(to)
        diffVertices.add(source2)
        diffVertices.add(to2)
        return cost-cost2
        }
    )

    let uf=new UnionFind
    
    // The construction is based on a mapping
    // essentially mapping my Vertices into a number
    let mapping={}
    let id=0 
    diffVertices.forEach(d=>mapping[d]=id++)
    uf.construction(diffVertices.size)

    let result=[]
    for (const [source,to,cost] of edges) {
        // the MST consists of N-1 nodes N being the total number of Vertices
        if(result.length===diffVertices.size-1)break

        //if they re not in the same group, Unite the groups amd push said edge to my result
        if(!uf.sameGroup(mapping[source],mapping[to])){
            uf.union(mapping[source],mapping[to])
            result.push([source,to,cost])
        }
    }

    return result
}


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





console.log(Kruskals(
    [   
        ['A','B',7],
        ['A','C',9],
        ['A','F',14],
        ['B','C',10],
        ['B','D',15],
        ['C','D',11],
        ['D','B',15],
        ['D','E',6],
        ['D','C',11],
        ['F','E',9],
        ['F','C',2],
    ]

))