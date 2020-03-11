


//DE MonoQ
// every item is pushed/removed only once 
// O(n) push
class Monoq{

    constructor(){
        this.q=[]
    }
    
    getMax=()=>this.size?this.q[this.size-1]:null
    getMin=()=>this.size()?this.q[0]:null
    size=()=>this.q.length

    pollMax=()=>this.q.pop()

    pollMin=()=>this.q.shift()

    pushMax(element){
        while(this.size&&this.getMax()>element)this.pollMax()
        this.q.push(element)
    }

    pushMin(){
        while(this.size&&this.getMin()<element)this.pollMin()
        this.q.unshift(element)
    }

}