//Finds the MST of an UNDIRECTED WEIGHTED GRAPH





// just Adjacency Matrix- No heap. O(V**2)
var Prims=(Edges)=>{
    let Adjacency={}
    for (const [source,to,cost] of Edges) {
        if(Adjacency[source]===undefined){
            Adjacency[source]={}
            Adjacency[source][to]=cost
        }
        else{
            Adjacency[source][to]=cost

        }
        if(Adjacency[to]===undefined){
            Adjacency[to]={}
            Adjacency[to][source]=cost
        }
        else{
            Adjacency[to][source]=cost
        }
    }
    let totalNodes=Object.keys(Adjacency).length



    let keys={} //determines what node will be processed next
    // essentially saves the distance from a visited note to an unvisited one
    // The unvisited key with the minimum distance will be processed next during my for loop
    let Parents={} //helps with the final representatio nof my MST

    //Initialize both keys and Parents
    Object.keys(Adjacency).forEach(d=>{
        keys[d]=Infinity
        Parents[d]=null
    })
    

    //pick randomly the first Key and set its keys' value to 0 in order for it 
    // to be picked first inside the for loop
    keys[Object.keys(keys)[0]]=0
    let result=[]  


    let visited=new Set()

    for (let count = 0; count < totalNodes-1; count++) {
        

        // finds the key which has the minimum keys value and hasnt yet been chosen
        // and essentially saves me 1 loop (O(n^2)=>O(n))
        // There is an optimization using a Priority queue here in order
        // for me to be able to find the minimum element faster
        let min=Infinity
        let minKey=-1
        for (const key in keys) {
            if(!visited.has(key)&&keys[key]<min){
                min=keys[key]
                minKey=key
            }
        } 
        visited.add(minKey)

        if(min===Infinity)break


        //updates the keys and Parents matrix
        for (const vertex in keys) {
            if(!visited.has(vertex)&&Adjacency[minKey][vertex]<keys[vertex]){
                keys[vertex]=Adjacency[minKey][vertex]
                Parents[vertex]=minKey
            }
        }

    }
        

    

    return result
}


// with a PQ (minheap)
class minBinaryHeap{
    constructor(){
        this.heap=[]
        //this is the simplest comparator between a and b and returns 
        // a positive number if a >b
        // a negative number if a < b
        // or 0 when a ===b, 
        // adjusting this for every situation will allow me to use heaps outside of the 
        // just numbers context
        this.comparator=(a,b)=>a-b
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length

    peek=()=>this.heap[0]

    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))<0)){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1)return this.heap.pop()

        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&(this.comparator(this.heap[index],this.getLeftChild(index))>0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))>0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))<=0){
                    //and swap
                    this.swap(index,index*2+1)
                    index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  this.swap(index,index*2+2)
                  index=index*2+2

                }
                
            }
        }
    }
    swap=(a,b)=>{
        if(a===b)return
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}

// O( (V+E)logV) due to PQ
// each poll operation is logE
var Prims=(Edges)=>{
    let Adjacency={}
    for (const [source,to,cost] of Edges) {
        if(Adjacency[source]===undefined){
            Adjacency[source]={}
            Adjacency[source][to]=cost
        }
        else{
            Adjacency[source][to]=cost

        }
        if(Adjacency[to]===undefined){
            Adjacency[to]={}
            Adjacency[to][source]=cost
        }
        else{
            Adjacency[to][source]=cost
        }
    } 
    let N=Object.keys(Adjacency).length

    let result=[]

    let priorityQueue= new minBinaryHeap()
    priorityQueue.comparator=([from1,to1,cost1],[from2,to2,cost2])=>cost1-cost2

    let visited=new Set()
    let start=Object.keys(Adjacency)[0]
    visited.add(start)

    for (const other in Adjacency[start]) {
        if(Adjacency[start][other]!==Infinity)priorityQueue.push([start,other,Adjacency[start][other]])
    }

    while(priorityQueue.heap.length && result.length!=N-1){
        var [fromc,toc,countc]=priorityQueue.poll()
        if(visited.has(toc))continue //continue polling until a valid element is found

        result.push([fromc,toc,countc])
        visited.add(toc)

        //add the correct new nodes
        for (const other in Adjacency[toc]) {
            if(Adjacency[toc][other]!==undefined&&!visited.has(other)){
                priorityQueue.push([toc,other,Adjacency[toc][other]])
            }
        }
        
    }
    if(result.length!==N-1)return 'There is no MST'

    return result
}
console.log(Prims(
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