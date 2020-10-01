// Given a set of points in the plane. the convex hull of the set is the smallest convex polygon that contains all the points of it.






// let AB and CD 2 line segments
// check LINE SEGMENT INTERSECTION for when they intersect





//Jarvis’ Algorithm or Wrapping O(n*2)

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
        console.log(result)
        result.push(currentPoint)
        nextPoint=(currentPoint+1)%n //naively assume its the next in line

//====================== HERE'S THE REAL DEAL===============//
// How to calculate the MOST counterclockwise point in O(n)
// well it's similar to finding the min, if a<b&&m<a => m<b
// so if (current, potential, nextPoint) are counterclockwise => potential is more counterclockwise than next, and more counterclockwise than EVERYTHING that next overshadows
        for (let i = 0; i < n; i++) {
            if(orientattion(points[currentPoint],
                      points[i],
                      points[nextPoint]
                      )==2//counterclockwise
                )    
            nextPoint=i     
        }
        currentPoint=nextPoint
    }while(currentPoint!=leftmost) //the loop ends here, cos if currentpoint came back to leftmost,
    // that means that we made the whole route, and we re back at the beginning vertex.(the leftmost one)

    return result.map(d=>points[d]) //returnrs the result counterclockwise
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



//the orientation of three points can also be calculated using the determinant of the 2 vectors
// AB,AC
let orientattion=(A,B,C)=>{
    let xAB=B[0]-A[0],
        yAB=B[1]-A[1],
        xBC=C[0]-B[0],
        yBC=C[1]-B[1]
    let det=xAB*yBC-xBC*yAB
    
    if(det>0)
        return 2// counterclockwise
    if(det<0)
        return 1// clockwise
    return 0 //collinear
}

// Approach 2: Graham's Scan // Playing with the big boys now
// Intuition: find the rightmost and leftmost elements, they both belong the CH
// the line between them separates the polygon into two parts, upper and lower. 
// maintain two stacks for each part.
// check every element P : if orientation (L,P,R) is clockwise then it belongs to the upper part ,
// if it's counterclockwise then it belongs to the lower part

// The idea is to create the top part clockwise, and the lower part counterclockwise
// You will do that with the upper and lower stacks

// the leftmost element belongs to both stack
// each consecutive element that belongs to the CH has to be:

// Both cases start with p1 and naively add more elements that are clockwise/ccw to the upper/lower stacks
// each time there's a problem with the last 2 elements, (different orientation), the element is popped as it cannot possible be on the convex hull and be counterclockwise on the upper /ccw on the lower
// runs in O(N logN)
let GrahamScan=points=>{
    let n=points.length //has to be at least 3

    //sort based on increasing x, if multiple take the smaller  y first
    points.sort((a,b)=>a[0]==b[0]?a[1]-b[1]:a[0]-b[0])
    // both points[0] and points[n-1] belong to the CH,
    // the line p1p2, separates the polygon into two areas, upper and lower
    let p1=points[0],p2=points[n-1],upper=[p1],lower=[p1]
    
    for (let i = 1; i < n; i++) {
        //clockwise
        if(i==n-1|| orientattion(p1,points[i],p2)==1){
            while(
                upper.length>=2&& 
                //if an element not clockwise with the previous 2, it doesnt belong on the CH as i just found a better one, points[i] (more clockwise than upper[upper.length-1]), making the better edge upper[upper.length-2]-----points[i]
                orientattion(upper[upper.length-2],upper[upper.length-1],points[i])!==1 
            )
                upper.pop()
            upper.push(points[i])
        }
        //counterclockwise
        if(i==n-1||orientattion(p1,points[i],p2)==2){
            while(
                lower.length>=2&& 
                orientattion(lower[lower.length-2],lower[lower.length-1],points[i])!==2
            )
                lower.pop()
            lower.push(points[i])
        }
    }
    
    // returns the result clockwise
    return upper.concat( lower.reverse().slice(1,lower.length-1) ) // doing this for the specific order of elements and slice 1 because i already have p2 from UPPER, so no need to add it again
}


console.log(
    JarvisConvexHull( [[0, 3], [1, 1], [2, 2], [4, 4], 
        [0, 0], [1, 2], [3, 1], [3, 3]])
    ,'\n',
    GrahamScan(
        [[0, 3], [1, 1], [2, 2], [4, 4], 
                      [0, 0], [1, 2], [3, 1], [3, 3]]
    )
)