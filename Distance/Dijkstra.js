

// unidirectional input
// src='A', Target='C', distances=[[A,B,1], [A,C,0],[C,K,2],...]
var dijkstras=(src,Target,distances)=>{

    //source: [distances[i]]
    let connections={}
    //key:node name, val: its dist from source node
    let finalizedDist={}
    let sptSet=new Set() //all the nodes,whose minimum distance from source
    // is finalized.

    console.log(src,Target,distances)
    for (const [source,tar,cost] of distances) {
         connections[source]==undefined?connections[source]=[[source,tar,cost]]:connections[source].push([source,tar,cost])
         finalizedDist[source]=Infinity    //populate distance for n nodes
         finalizedDist[tar]=Infinity
    }
 
    let priorityQueue=new minBinaryHeap()
    priorityQueue.comparator=(a,b)=>a[2]-b[2]

    priorityQueue.push([src,src,0])
    finalizedDist[src]=0

  
    let totalNodes=Object.keys(connections).length

    while(sptSet.size!==totalNodes){
        let currentElement=priorityQueue.poll()
        while(sptSet.has(currentElement[1])&&priorityQueue.heap.length!==0){
            currentElement=priorityQueue.poll()
        }
        sptSet.add(currentElement[1])

        for (const [cur,to,cost] of connections[currentElement[1]]) {
            priorityQueue.push([cur,to,cost])
            if(finalizedDist[cur]+cost<finalizedDist[to]){
                finalizedDist[to]=finalizedDist[cur]+cost
            }
        }

    }

    return finalizedDist[Target]
}




//minHeap
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



// Keep track of the path aswell
var dijkstras=(src,Target,distances)=>{

    //source: [distances[i]]
    let connections={}
    //key:node name, val: its dist from source node
    let finalizedDist={}
    let prev={}
    let sptSet=new Set() //all the nodes,whose minimum distance from source
    // is finalized.

    console.log(src,Target,distances)
    for (const [source,tar,cost] of distances) {
         connections[source]==undefined?connections[source]=[[source,tar,cost]]:connections[source].push([source,tar,cost])
         finalizedDist[source]=Infinity    //populate distance for n nodes
         finalizedDist[tar]=Infinity
         prev[source]=Infinity
         prev[tar]=Infinity
    }
 
    let priorityQueue=new minBinaryHeap()
    priorityQueue.comparator=(a,b)=>a[2]-b[2]

    priorityQueue.push([src,src,0])
    finalizedDist[src]=0

  
    let totalNodes=Object.keys(connections).length

    while(sptSet.size!==totalNodes){
        let currentElement=priorityQueue.poll()
        while(sptSet.has(currentElement[1])&&priorityQueue.heap.length!==0){
            currentElement=priorityQueue.poll()
        }
        sptSet.add(currentElement[1])

        for (const [cur,to,cost] of connections[currentElement[1]]) {
            priorityQueue.push([cur,to,cost])
            if(finalizedDist[cur]+cost<finalizedDist[to]){
                finalizedDist[to]=finalizedDist[cur]+cost
                prev[to]=cur
            }
        }

    }

    //actually, I m essentially reversing the order of the previous array starting from my target
    let findPath=()=>{
        if(finalizedDist[Target]==Infinity)return false

        let path=[Target]
        let currkey=Target
        while(prev[currkey]!=Infinity){
            path.unshift(prev[currkey])
            currkey=prev[currkey]
        }
        return path
    }

    console.log(findPath())

    return finalizedDist[Target]
}



console.log(dijkstras(
    'A','E',
        [   
            ['A','B',7],
            ['A','C',9],
            ['A','F',14],
            ['B','C',10],
            ['B','D',15],
            ['C','B',10],
            ['C','D',11],
            ['C','F',2],
            ['D','B',15],
            ['D','E',6],
            ['D','C',11],
            ['E','D',6],
            ['E','F',9],
            ['F','E',9],
            ['F','C',2],
            ['F','A',14]
        ]
    
))