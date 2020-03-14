// Given points in x-y axis determine the skyline
 

let skyline=(nodes)=>{

    let dominatedElements=new Set()
    let result=[]
    
    for (let i = 0; i < nodes.length; i++) {
        let [cx,cy,cname]=nodes[i]
        // for (let j = 0; j < nodes.length; j++) {
        //     if (i===j||dominatedElements.has(i))continue;
        //     let [tx,ty,tname]=nodes[j]


        //     // dominion relationship
        //     // i is dominated by j when 
        //     if(tx<=cx&&ty<=cy){
        //         dominatedElements.add(i)
        //         break
        //     }

        //     //reached the end without being dominated=> add it to the skyline
        //     if(j===nodes.length-1)result.push(cname)
        // }            
        //alternatively
        
        if(
            nodes.every(([tx,ty,tname],j)=>i!==j?(tx>cx||ty>cy):true)
        )result.push(cname)
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




let skycsv=nodes=>{

    let dominatedElements=new Set()
    let result=[]
    
    for (let i = 0; i < nodes.length; i++) {
        let [cname,cprice,cyear,codometer]=nodes[i]
        for (let j = 0; j < nodes.length; j++) {
            if (i===j||dominatedElements.has(i))continue;
            let [tname,tprice,tyear,todometer]=nodes[j]


            // dominion relationship
            // i is dominated by j when 
            if(tprice<=cprice&&tyear<=cyear&&todometer<=codometer){
                dominatedElements.add(i)
                break
            }

            //reached the end without being dominated=> add it to the skyline
            if(j===nodes.length-1)result.push(cname)
        }            

        //alternatively

    }

    return result

}
let csv=[
    [1,	5200,	2007,   0]	,
    [2,	5000,	1978,   0]	,
    [3,	11300,	2011,   0]	,
    [4,5000,2008,51000],
    [5,	13500,2006,93000],
    [6,	12500,	2008,	125234],
    [7,	6200,	2006,	0],
    [8,	1,	    1999,	0],
    [9,	37900,	2016,	70500],
    [10,4999,	2007,	160000],
    [11,7900,	2000,   0]	,
    [12,1200,   1992,   194000],
    [13,5000,	1964,   0]	,
    [14,5000,	2003,   0]	
]
console.log(skycsv(csv))




