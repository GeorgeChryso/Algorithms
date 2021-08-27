// Binary heap is the implementation of the Priority Queue A.D.T.

//minheap TRASH COMPLEXITY
class minBinaryHeap{
    constructor(c){
        this.heap=[]
        //this is the simplest comparator between a and b and returns 
        // a positive number if a >b
        // a negative number if a < b
        // or 0 when a ===b, 
        // adjusting this for every situation will allow me to use heaps outside of the 
        // just numbers context
        this.comparator=c
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
let hp=new minBinaryHeap()

let topush=[2,1,32,1,0,2,5,0]

topush.forEach(d=>{
    hp.push(d)
    console.log(hp.heap)
})

// console.log(hp.poll())
// console.log(hp.heap)

console.log('abc'-'abb')


// OK COMPLEXITY
class BinaryHeap {
  constructor(comparator=null) {
    this.data=[]
    this.comparator = (a, b) => b - a; // Modify this
    this.heapify();
  }
  heapify() {
    for (let i = 1;this.length() < 2 &&i < this.length(); i++) 
      this.bubbleUp(i);
  }
  push(value) {
    this.data.push(value);
    this.bubbleUp(this.length() - 1);
  }
  poll() {
    if (this.length() === 0) return null;
    let [result,last] =[this.data[0],this.data.pop()]
    if (this.length()) 
      this.data[0] = last,
      this.bubbleDown(0)
    return result;
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) 
        this.swap(index, parentIndex),
        index = parentIndex
      else 
        break;
    }
  }
  bubbleDown(index) {
    const lastIndex = this.length() - 1;
    while (true) {
      let [leftIndex,rightIndex,findIndex] = [index * 2 + 1,index * 2 + 2,index]
      if (
        leftIndex <= lastIndex &&
        this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
      ) 
        findIndex = leftIndex;
      if (
        rightIndex <= lastIndex &&
        this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
      ) 
        findIndex = rightIndex;
      
      if (index !== findIndex) 
        this.swap(index, findIndex),
        index = findIndex
      else 
        break;
      
    }
  }
  peek=()=>this.data[0]||null
  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [this.data[index2],this.data[index1]];
  }
  length=()=>this.data.length;
}


//maxheap with a memo for O(nlogn) removals
class maxBinsaryHeap{
    constructor(){
        this.heap=[]
        this.comparator=(a,b)=>b-a
        this.valComparison=()=>null
        this.store={} //this will store my heaps values as keys, and sets as values,sets that contain the key's position on my heap, it will provide nlogn loookup and removal
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
        if(this.store[this.valComparison(element)]!==undefined)
            this.store[this.valComparison(element)].add(this.heap.length-1)
        else{
            this.store[this.valComparison(element)]=new Set()
            this.store[this.valComparison(element)].add(this.heap.length-1)
        }
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(
            this.hasParent(index)&&
            (this.comparator(this.heap[index],this.getParent(index))>=0)
            ){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
        
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1){
            this.store[this.valComparison(this.heap[this.heap.length-1])].delete(this.heap.length-1)
            return this.heap.pop()
        }

        let result=this.heap[0]

        this.swap(0,this.heap.length-1)
        this.store[this.valComparison(this.heap[this.heap.length-1])].delete(this.heap.length-1)
        this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&( this.comparator(this.heap[index],this.getLeftChild(index))<0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))<0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
   
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))>=0){
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

    heapify() {
        if (this.length() < 2) return;
        for (let i = 1; i < this.length(); i++) {
          this.bubbleUp(i);
        }
      }


      // I have to create a remove function that works in O(logn time)
    remove=(height)=>{

        if(!this.store[height].size){
            return
        }
        else{
            let index=-1
          
            for (const value of this.store[height].values()) {
                index=value
                break;
            }
            this.swap(index,this.heap.length-1) 
            this.store[this.valComparison(this.heap[this.heap.length-1])].delete(this.heap.length-1)
            this.heap.pop() //O(1)
            this.bubbleDown(index) //logn
        }

    }


    swap=(a,b)=>{
        if(a===b)return
        if(this.valComparison(this.heap[a])!=this.valComparison(this.heap[b])){
            this.store[this.valComparison(this.heap[a])].delete(a)
            this.store[this.valComparison(this.heap[a])].add(b)
            this.store[this.valComparison(this.heap[b])].add(a)
            this.store[this.valComparison(this.heap[b])].delete(b)
        }
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}
  // I can implement a priority queue through Self balancing Binary Search Trees aswell

  function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }
  
  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },
  
    pop: function() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },
  
    remove: function(node) {
      var length = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < length; i++) {
        if (this.content[i] != node) continue;
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        // If the element we popped was the one we needed to remove,
        // we're done.
        if (i == length - 1) break;
        // Otherwise, we replace the removed element with the popped
        // one, and allow it to float up or sink down as appropriate.
        this.content[i] = end;
        this.bubbleUp(i);
        this.sinkDown(i);
        break;
      }
    },
  
    size: function() {
      return this.content.length;
    },
  
    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n], score = this.scoreFunction(element);
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
        parent = this.content[parentN];
        // If the parent has a lesser score, things are in order and we
        // are done.
        if (score >= this.scoreFunction(parent))
          break;
  
        // Otherwise, swap the parent with the current element and
        // continue.
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
      }
    },
  
    sinkDown: function(n) {
      // Look up the target element and its score.
      var length = this.content.length,
      element = this.content[n],
      elemScore = this.scoreFunction(element);
  
      while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
          child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
          child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score))
            swap = child2N;
        }
  
        // No need to swap further, we are done.
        if (swap == null) break;
  
        // Otherwise, swap and continue.
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
    }
  };