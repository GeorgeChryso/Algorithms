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
class MaxHeap {
    constructor(data = []) {
      this.data = data;
      this.comparator = (a, b) => b - a;
      this.heapify();
    }
  
    // O(nlog(n)). In fact, O(n)
    heapify() {
      if (this.length() < 2) return;
      for (let i = 1; i < this.length(); i++) {
        this.bubbleUp(i);
      }
    }
  
    // O(1)
    peek() {
      if (this.length() === 0) return null;
      return this.data[0];
    }
  
    // O(log(n))
    push(value) {
      this.data.push(value);
      this.bubbleUp(this.length() - 1);
    }
  
    // O(log(n))
    poll() {
      if (this.length() === 0) return null;
      const result = this.data[0];
      const last = this.data.pop();
      if (this.length() !== 0) {
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
      const lastIndex = this.length() - 1;
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

// O( (V+E)logV) due to PQ
// each poll operation is logE
var Prims=(Edges)=>{
    let Adjacency={}
    for (const [source,to,cost] of Edges) {
        if(Adjacency[source]===undefined)
            Adjacency[source]={},
            Adjacency[source][to]=cost
        else
            Adjacency[source][to]=cost
        if(Adjacency[to]===undefined)
            Adjacency[to]={},
            Adjacency[to][source]=cost
        else
            Adjacency[to][source]=cost
    } 
    let priorityQueue= new MaxHeap(),N=Object.keys(Adjacency).length,result=[]
    priorityQueue.comparator=([from1,to1,cost1],[from2,to2,cost2])=>cost1-cost2

    let visited=new Set(),start=Object.keys(Adjacency)[0]
    visited.add(start)
    // PUSH ALL THE EDGES INTO A PRIORITY QUEUE
    for (const other in Adjacency[start]) 
        if(Adjacency[start][other]!==Infinity)
            priorityQueue.push([start,other,Adjacency[start][other]])
    
    while(priorityQueue.heap.length && result.length!=N-1){
        var [fromc,toc,countc]=priorityQueue.poll()
        if(visited.has(toc))
            continue //continue polling until an unvisited destination is found

        result.push([fromc,toc,countc])
        visited.add(toc) //visit

        //add the correct new nodes
        for (const other in Adjacency[toc]) 
            if(Adjacency[toc][other]!==undefined&&!visited.has(other))
                priorityQueue.push([toc,other,Adjacency[toc][other]])
    }
    if(result.length!==N-1)
        return 'There is no MST'

    return result
}

// when we have more than one connected components(trees) aka a forest
// and we want to find multiple MSTs (all of them)
let primsForest=(adj)=>{
    let pq=new MaxHeap() //actually a  minheap :S
    pq.comparator=(a,b)=>a[1]-b[1]
    let seen=new Set()
    for(let i=0;i<n;i++){
        if(!seen.has(i))
            pq.push([i,0])
        while(pq.length()){
            let [node,val]=pq.poll()
            if(!seen.has(node)){
                seen.add(node)
                result+=val
                for(let [nei,val] of adj[node])
                    if(!seen.has(nei))
                        pq.push([nei,val])
            }
        }
    }
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