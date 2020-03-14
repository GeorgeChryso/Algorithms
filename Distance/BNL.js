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

        if(nodes.every(([tx,ty,tname],j)=>i!==j?(tx>cx||ty>cy):true))
            result.push(cname)
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

//console.log(
//     skyline(
//         edges
//     )
// )



// First Query
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
// id price year odometer 
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
//console.log(skycsv(csv))

//Second Query
// Inputs:[ distance in km , from [lag,long] ]

let skycsv2=(nodes,distance)=>{

    let [dist,[dx,dy]]=distance

    let dominatedElements=new Set()
    let result=[]
    
    let withinDistance=(x,y)=>{
        let R=6371e3// Earth's Radius in m
        let toRadians=x=>Math.PI*x/180
        x=x.toRadians()
        y=y.toRadians()
        dx=dx.toRadians()
        dy=dy.toRadians()

        let DeltaLat=(dx-x).toRadians()
        let DeltaLong=(dy-y)
        let a = Math.sin(DeltaLat/2)**2 + Math.cos(x)*Math.cos(dx)*(
            Math.sin(DeltaLong)**2
        )
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let distBetween=R*c //in m

        return distBetween
        return distBetween*(10**-4)<=dist
    }

    console.log(withinDistance( 36.513501,-82.530221   ))

    //distance pre-filtering
    nodes=nodes.filter( ([cname,cprice,cyear,codometer,clat,clong])=>withinDistance(clat,clong))
    console.log(nodes)

    for (let i = 0; i < nodes.length; i++) {
        let [cname,cprice,cyear,codometer,clat,clong]=nodes[i]
        for (let j = 0; j < nodes.length; j++) {
            if (i===j||dominatedElements.has(i))continue;
            let [tname,tprice,tyear,todometer,tlat,tlong]=nodes[j]


            // dominion relationship
            // i is dominated by j when 
            if(tprice<=cprice&&tyear<=cyear&&todometer<=codometer){
                dominatedElements.add(i)
                break
            }

            //reached the end without being dominated=> add it to the skyline
            if(j===nodes.length-1)result.push(cname)
        }            


    }

    return result

}

// id price year odometer ,lag, long
let csv2=[
    [1,	5200,	2007,   0,  35.8762 ,-84.1746          ]	,
    [2,5000,1978,0,         37.13284,-95.78558              ]   , 
    [3,11300,2011,0,        36.513501,-82.530221            ]	,
    [4,5000,2008,51000,     35.777999,-83.612533            ],
    [5,13500,2006,93000,    36.3339,-82.3408          ],
    [6,12500,2008,125234,   36.3339,-82.3408         ],
    [7,6200,2006,0,         36.000092,-84.018302      ],
    [8,1,1999,0,            36.2954,-82.4902          ],
    [9,37900,2016,70500,    36.272932,-82.537537     ],
    [10,4999,2007,160000,   36.3107,-82.381          ],
    [11,7900,2000,0,        36.3996,-82.4523        ],
    [12,1200,1992,194000,   36.4162,-83.0108        ],
    [13,5000,1964,0,        36.2832,-83.0374        ]	,
    [14,5000,2003,0,        36.3445,-82.2015        ]	
]

console.log(
    skycsv2(
        csv2,[40,[ 36.318985, -82.241189   ]]
    )
)