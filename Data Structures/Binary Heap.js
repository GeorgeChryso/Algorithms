// Binary heap is the implementation of the Priority Queue A.D.T.

//minheap
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


let hp=new minBinaryHeap()

let topush=[2,1,32,1,0,2,5,0]

topush.forEach(d=>{
    hp.push(d)
    console.log(hp.heap)
})

console.log(hp.poll())
console.log(hp.heap)



class maxBinaryHeap{
    constructor(){
        this.heap=[]
        this.comparator=(a,b)=>b-a
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length

    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))>0)){
            //swap the two elements until the Invariant is reached
            [this.heap[index],this.heap[Math.floor((index-1)/2)]]= [this.heap[Math.floor((index-1)/2)],this.heap[index]]
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
       
        while(this.hasLeft(index)&&( this.comparator(this.heap[index],this.getLeftChild(index))<0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))<0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
   
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))>=0){
                    //and swap
                  [this.heap[index],this.heap[index*2+1]]=[this.getLeftChild(index),this.heap[index]]
                  index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  [this.heap[index],this.heap[index*2+2]]=[this.getRightChild(index),this.heap[index]]
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
}


//alternative
class MaxHeap {
    constructor(data = []) {
      this.data = data;
      this.comparator = (a, b) => b - a;
      this.heapify();
    }
  
    // O(nlog(n)). In fact, O(n)
    heapify() {
      if (this.size() < 2) return;
      for (let i = 1; i < this.size(); i++) {
        this.bubbleUp(i);
      }
    }
  
    // O(1)
    peek() {
      if (this.size() === 0) return null;
      return this.data[0];
    }
  
    // O(log(n))
    push(value) {
      this.data.push(value);
      this.bubbleUp(this.size() - 1);
    }
  
    // O(log(n))
    poll() {
      if (this.size() === 0) return null;
      const result = this.data[0];
      const last = this.data.pop();
      if (this.size() !== 0) {
        this.data[0] = last;
        this.bubbleDown(0);
      }
      return result;
    }
  
    // O(log(n))
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = (index - 1) >> 1;
        if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
          this.swap(index, parentIndex);
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    // O(log(n))
    bubbleDown(index) {
      const lastIndex = this.size() - 1;
      while (true) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;
        let findIndex = index;
        if (
          leftIndex <= lastIndex &&
          this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
        ) {
          findIndex = leftIndex;
        }
        if (
          rightIndex <= lastIndex &&
          this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
        ) {
          findIndex = rightIndex;
        }
        if (index !== findIndex) {
          this.swap(index, findIndex);
          index = findIndex;
        } else {
          break;
        }
      }
    }
  
    // O(1)
    swap(index1, index2) {
      [this.data[index1], this.data[index2]] = [
        this.data[index2],
        this.data[index1]
      ];
    }
  
    // O(1)
    length() {
      return this.data.length;
    }
  }


//maxheap with a memo for O(nlogn) removals
class maxBinaryHeap{
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


