// Binary heap is the implementation of the Priority Queue A.D.T.

//minHeap
class BinaryHeap{
    constructor(){
        this.heap=[]
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    

    push(element){
        this.heap.push(element)
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        while(this.hasParent(index)&&(this.heap[index]<this.getParent(index))){
            //swap the two elements until the Invariant is reached
            [this.heap[index],this.heap[Math.floor((index-1)/2)]]= [this.heap[Math.floor((index-1)/2)],this.heap[index]]
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }

    bubbleDown(index){
        while(this.hasLeft(index)&&(this.heap[index]>this.getLeftChild(index)||(this.hasRight(index)&&this.heap[index]>this.getRightChild(index)) )){

            if(!this.hasRight(index)){
                [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                index=index*2+1
            }
            else{

                if(this.getLeftChild(index)<=this.getRightChild(index)){
                  [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                  index=index*2+1
                }
                else {
                  [this.heap[index],this.heap[index*2+2]]=[this.getRightChild(index),this.heap[index]]
                  index=index*2+2  
                }
                
            }
        }
    }
}



let hp=new BinaryHeap()

let topush=[2,1,32,1,0,2,5,0]

topush.forEach(d=>{
    hp.push(d)
    console.log(hp.heap)
})

console.log(hp.poll())
console.log(hp.heap)
