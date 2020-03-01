//bad at direct access
// really good at inserting and deleting elements
// same amount of time add/remove elements


class LinkedList{
    constructor( ){
        this.head= this.tail = null
    }

    // adds to the end of the list
    append(value){
        //if the list is empty
        if(!this.tail){
            this.head=this.tail=new Node(value)
        }
        else{
            let oldTail=this.tail
            this.tail=new Node(value)
            oldTail.next=this.tail
            this.tail.prev=oldTail
        }

    }

    //adds to the beginning of the list
    prepend(value){
        //if the list is empty
        if(!this.head){
            this.head=this.tail=new Node(value)
        }
        else{
            let oldHead=this.head
            this.head=new Node(value)
            oldHead.prev=this.head
            this.head.next=oldHead
        }

    }

    deleteHead(){
        if(!this.head){
            return null
        }
        else{
            let removedHead=this.head
            //if there is one node on the list
            if(this.head===this.tail){
                this.head=this.tail=null
            }
            else{
                this.head=this.head.next
                this.head.prev=null
            }
            return removedHead.value
        }
    }

    deleteTail(){
        if(!this.tail){
            return null
        }
        else{
            let removedTail=this.tail
            if(this.head===this.tail){
                this.head=this.tail=null
            }
            else{
                this.tail=this.tail.prev
                this.tail.next=null
            }
            return removedTail.value
        }
    }

    search(value){
        let currentNode=this.head
        
        while(currentNode){
            if(currentNode.value==value){
                return currentNode
            }
            currentNode=currentNode.next
        }
        return null
    }

}

class Node{
    
    constructor(value, prev ,next){
        this.value  =value
        this.prev   =prev||null
        this.next   =next||null
    }

}

let list=new LinkedList()
list.append(1)
list.append(2)
list.append(3)


list.prepend(0)
list.prepend(-1)

console.log(list.search(23))
console.log(list.deleteHead())
console.log(list.deleteHead())
console.log(list)
console.log(list.deleteTail())
console.log(list)
