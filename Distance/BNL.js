// Given points in x-y axis determine the skyline
 

let skyline=(nodes)=>{

    let dominatedElements=new Set()

    let result=[]

    for (let i = 0; i < nodes.length; i++) {
        let [cx,cy,cname]=nodes[i]
        for (let j = 0; j < nodes.length; j++) {
            if (i===j||dominatedElements.has(i))continue;
            let [tx,ty,tname]=nodes[j]


            // dominion relationship
            // i is dominated by j when 
            if(tx<=cx&&ty<=cy){
                dominatedElements.add(i)
                break
            }

            //reached the end without being dominated=> add it to the skyline
            if(j===nodes.length-1)result.push(cname)
        }            

    }

    return result
}





let edges=[
    [1,10,'a'],
    [3.2,8,'b'],
    [4,6,'c'],
    [7,8,'d'],
    [9,9,'e'],
    [7,6,'f'],
    [3,5,'g'],
    [5.1,5,'h'],
    [5,3,'i'],
    [6,5,'j'],
    [6,3,'l'],
    [10,1,'m'],
    [9,3,'n']
]

console.log(
    skyline(
        edges
    )
)



