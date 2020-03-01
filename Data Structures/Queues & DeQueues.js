class Queue{
    constructor(){
        this.arr=[]
        
    }
    length=()=>this.arr.length
    
    //push an element in the end of the queue
    push=(el)=>this.arr.push(el)

    //remove the element that was pushed first
    pop=()=>{
        if(this.length())return this.arr.shift()
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


class DEQueue{
    constructor(){
        this.arr=[]
    }
    length=()=>this.arr.length
    
    //push an element in the end of the queue
    append=(el)=>this.arr.push(el)
    //push an element in the front of the queue
    prepend=(el)=>this.arr.unshift(el)

    //remove the element that was pushed first
    deleteFirst=()=>{
        if(this.length())return this.arr.shift()
        return null
    }
    //remove the element on the end of the array
    deleteLast=()=>{
        if(this.length())return this.arr.pop()
        return null
    }

    //peek at the element at the end of the array
    front=()=>this.arr[this.arr.length-1]
    //peek at the element at the start of the array
    rear=()=>this.arr[0]
}