


class heap{

    constructor(){
        this.arr=[]
        this.length=this.arr.length
    }

}



let dijkstras=(src,Target)=>{

    //key:node name, val: its dist from source node
    let dist={}
    //populate distance for n nodes
    for (let i = 1; i <= n; i++) {
        dist[i]=Infinity
    }

    let sptSet=new Set() //all the nodes,whose minimum distance from source
    // is finalized.
    
    dist[src]=0


    return dist[Target]
}