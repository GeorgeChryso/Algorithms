// Binary heap is the implementation of the Priority Queue A.D.T.

console.log(Math.floor(3/2))
//minHeap
class BinaryHeap{
    constructor(){
        this.heap=[]
    }


    hasParent=(index)=>index<1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1>this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2>this.heap.length-1
    getRightChild(index){
        return this.heap[2*index+2]
    }

    push(element){
        this.heap.push(element)
        bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        while(this.hasParent(index)&&this.heap[index]<getParent(index)){
            [this.heap[index],this.heap[Math.floor((index-1)/2)]]= [this.heap[Math.floor((index-1)/2)],this.heap[index]]
        }
    }

}

