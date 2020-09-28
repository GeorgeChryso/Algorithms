// calculate the area of the polygon created by
// some points,given their x and y coordinates

// x=[...], y=[...]

//Shoelace Formula
let PolygonArea=(x,y)=>{
    let n=x.length,result=0
    for (let i = 0; i < n-1; i++) 
        result+=x[i]*y[i+1]-x[i+1]*y[i]
    return Math.abs(result+x[n-1]*y[0]-x[0]*y[n-1])/2
}

let tests=[
    [
        [3,5,12,9,5],
        [4,11,8,5,6]
    ]
    ,
    [
        [2,3,1,2],
        [4,-8,2,4]
    ]
]
let results=[
    30,
    7
]

tests.forEach(
    (d,i)=>console.log(PolygonArea(d[0],d[1]),results[i])
)