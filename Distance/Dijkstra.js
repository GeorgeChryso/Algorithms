
// O(|E|+|V|logV)
var dijkstras=(n,source,target,edges)=>{
    let adj=[...Array(n)].map(d=>[]),
        minD=[...Array(n)].map(d=>Infinity), // min distance from source
        pq=new minBinaryHeap((a,b)=>a[1]-b[1]), //[node,minDistFromSource]
        visited=[...Array(n)].map(d=>false)
    //create adjacency
    for(let [f,t,val] of edges)
        adj[f].push([t,val]),
        adj[t].push([f,val]) //remove if directed
    //run dijkstras
    pq.push([source,0])
    minD[source]=0
    while(pq.length()){
        let [node,minDfromSource]=pq.poll()
        if(visited[node])
            continue
        visited[node]=true
        for(let [nei,cost] of adj[node])
            if(minD[nei]>minDfromSource+cost)
                minD[nei]=minDfromSource+cost,
                pq.push([nei,minD[nei]])
    }
    return minD[target]
}
//minHeap
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



// O( V**2 ) for DENSE GRAPHS 
var dijkstrasDENSE=(n,source,target,edges)=>{
    let adj=[...Array(n)].map(d=>[...Array(n)].map(d=>Infinity)),
        minD=[...Array(n)].map(d=>Infinity) // min distance from source
    //create adjacency
    for(let [f,t,val] of edges)
        adj[f][t]=val,
        adj[t][f]=val //remove if directed
    minD[source]=0
    for(let i=0;i<n;i++) //try to better minD[j] by going through i
        for(let j=0;j<n;j++)
            if(minD[j]>minD[i]+adj[i][j])
                minD[j]=minD[i]+adj[i][j]
    return minD[target]
}




// count number of Paths from [0,n-1] with the MINIMUM DISTANCE
var countPaths = function(n, edges) {
    let adj=[...Array(n)].map(d=>[]),mod=1e9+7,pq=new BinaryHeap(),
        minD=[...Array(n)].map((d,i)=>i?Infinity:0),
        numWays=[...Array(n)].map((d,i)=>0),
        visited=[...Array(n)].map(d=>false)
    
    for(let [f,t,v] of edges)
        adj[Number(f)].push([Number(t),Number(v)]),
        adj[Number(t)].push([Number(f),Number(v)])
    
    numWays[0]=1
    pq.push([0,0]) 
    while(pq.length()){
        let [node,v]=pq.poll()
        if(visited[node])
            continue
        visited[node]=true
        for(let [nei,val] of adj[node])
            if(minD[nei]>minD[node]+val)
                minD[nei]=minD[node]+val,
                numWays[nei]=numWays[node],
                pq.push([nei,minD[node]+val])
            else if(minD[nei]===minD[node]+val)
                numWays[nei]= (numWays[nei]+numWays[node])%mod
    }
    return numWays[n-1]
}


