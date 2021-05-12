class Queue{
    constructor(){
        this.arr=[]
        
    }
    length=()=>this.arr.length
    
    //push an element in the end of the queue
    push=(el)=>this.arr.push(el)

    //remove the element that was pushed first
    pop=()=>{
        if(this.length()
            )return this.arr.shift()
        return null
    }

    //peek at the element that was pushed last()
    front=()=>this.arr[this.arr.length-1]

    //peek at the element that was pushed first()
    rear=()=>this.arr[0]
}



let q=new Queue

let tobepushed=[1,2,4,5,3,1,2]
tobepushed.forEach(d=>q.push(d))

while(q.length()){
   console.log(q.pop()) 
}



class Node{
    constructor(val,prev=null,next=null){
        this.prev=prev
        this.next=next
        this.val=val
    }
}
class DEQueue{
    constructor(){
        this.start=this.end=null,this.size=0,
        this.freq={}    
    }
    length=()=>this.size
    push(element){
        this.size++
        this.freq[element]=(this.freq[element]||0)+1
        if(this.start===null)
            return this.start=this.end=new Node(element)
        let newEnd=new Node(element,this.end)
        this.end.next=newEnd
        this.end=newEnd
    }
    unshift(element){
        this.size++
        this.freq[element]=(this.freq[element]||0)+1
        if(this.start===null)
            return this.start=this.end=new Node(element)
        let newStart=new Node(element,null,this.start)
        this.start.prev=newStart
        this.start=newStart
    }
    pop(){
        this.freq[this.end.val]--
        this.size--
        let toreturn=this.end.val
        this.end=this.end.prev
        if(this.end===null)
            this.start=null
        else
            this.end.next=null
        return toreturn
    }
    shift(){
        this.size--
        this.freq[this.start.val]--
        let toreturn=this.start.val
        this.start=this.start.next
        if(this.start===null)
            this.end=null
        else
            this.start.prev=null
        return toreturn
    }
    has(val){
        return this.freq[val]!==undefined&&this.freq[val]>0
    }
}