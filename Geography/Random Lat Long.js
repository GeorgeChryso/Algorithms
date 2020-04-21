let withinDistance=(dx,dy,x,y)=>{
    let R=6371003// Earth's Radius in m
    let deg2grad=deg=>deg*(Math.PI)/180

    var φ1 = deg2grad(x)
    var φ2 = deg2grad(dx)
    var Δφ = deg2grad(dx-x)
    var Δλ = deg2grad(dy-y)
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let distBetween=R*c*(10**-3) //in km

    return distBetween<=dist
}



let coors=[]
for (let i = 0; i < 100; i++) {

    let lat=(Math.random()*(180)-90).toPrecision(11)
    let long=(Math.random()*(360)-180).toPrecision(11)
    coors.push([lat,long])
}
console.log(coors)