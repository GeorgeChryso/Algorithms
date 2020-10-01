// Given a set of points in the plane. the convex hull of the set is the smallest convex polygon that contains all the points of it.






// let AB and CD 2 line segments
// check LINE SEGMENT INTERSECTION for when they intersect





//Jarvis’s Algorithm or Wrapping O(n*2)

// let the current point be P (start with the leftmost point( smaller X coordinate))
// the NEXT in the convex Hull is Q if:
// for any OTHER point R, Orientation(P,Q,R)= COUNTERCLOCKWISE
// then to continue set P=R and repeat the process


let JarvisConvexHull=points=>{
    let n=points.length //has to be at least 3
        ,result=[]

    //find the leftmost point(has to be a CH point)
    let leftmost=1
    for (let i = 0; i < n; i++) 
        if(points[i][0]<points[leftmost][0])
            leftmost=i

    let currentPoint=leftmost,nextPoint
    //start from the leftmost, keep moving counterclockwise
    do{
        result.push(currentPoint)
        nextPoint=(currentPoint+1)%n //naively assume its the next in line

//====================== HERE'S THE REAL DEAL===============//
// How to calculate the MOST counterclockwise point in O(n)
// well it's similar to finding the min, if a<b&&m<a => m<b
// so if (current, potential, nextPoint) are counterclockwise => potential is more counterclockwise than next, and more counterclockwise than EVERYTHING that next overshadows
        for (let i = 0; i < n; i++) {
            if(Orient(points[currentPoint],
                      points[i],
                      points[nextPoint]
                      )==2//counterclockwise
                )    
            nextPoint=i     
        }
        currentPoint=nextPoint
    }while(currentPoint!=leftmost) //the loop ends here, cos if currentpoint came back to leftmost,
    // that means that we made the whole route, and we re back at the beginning vertex.(the leftmost one)

    return result
}
// orientation of 3 points: 0: colinear, 1: clockwise, 2: counterclockwise
let Orient=(A,B,C)=>{
    let lAB=(B[1]-A[1])/(B[0]-A[0]),
        lBC=(C[1]-B[1])/(C[0]-B[0])
    if(lAB>lBC)
        return 1
    else if( lAB<lBC)
        return 2
    return 0
}
