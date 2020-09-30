

// given the vertices of a (convex) polygon, determine if a given point (X,Y) lies INSIDE the polygon


// how to reconstruct a polygon given just its vertices? //aka find the convex hull


//Intuition: 
// Draw infinite lines to the right from each point
// if a line intersects with a polygon's edge an ODD number of times, it's inside the polygon. 
// There is an edge case where the line to the right intersects with a vertex of the polygon, and we handle that by checkin whether p is colinear with vertices of the current line 






// MAIN: 
// so the polygon is given in a circular manner
// polygon ABCD=> [A,B,C,D], so the edges are AB, BC, CD, DA
let isItInside=(polygon,Point)=>{
    let n=polygon.length
    if(n<3) // a polygon must have >=3 vertices
        return false
    
    //count the total number of intersections 
    let count=0

    // so i check if my point intersects with each edge 
    for (let i = 0; i < n; i++) {
        // this is the next point of the polygon
        let next=(i+1)%n //so that DA can be considered

        //Infinity Point[1] means the "point" that lies on the rightmost position (the infinite vector to the right) of Point
        if(DoTheyIntersect(polygon[i],polygon[next], Point, [Infinity,Point[1]] )){

            //checking for colinearity ( aka the point is ON the same line as the EDGE AB )
            if(Orient(polygon[i],Point,polygon[next])==0){
                // then check if it's actually INSIDE the EDGE
                return onSegment(polygon[i],Point,polygon[next])
            }
            count++
        }
    }

    return count&1!==0//odd count=>inside
}





//boilerplate from LINE SEGMENT INTERSECTION
let DoTheyIntersect=(A,B,C,D)=>{

    //Find the four orientations ABC , ABD, CDA, CDB
    let o1=Orient(A,B,C),o2=Orient(A,B,D),o3=Orient(C,D,A),o4=Orient(C,D,B)
    if(o1!=o2 && o3!=o4) //case 1
        return true

    //now checking colinearity
    if(o1==0 && onSegment(A,B,C))
        return true
    if(o2==0 && onSegment(A,B,D))
        return true
    if(o3==0 && onSegment(C,D,A))
        return true
    if(o4==0 && onSegment(C,D,B))
        return true
    return false
}

//  O:COLINEAR, 1: CLOCKWISE, 2: COUNTERCLOCKWISE

// Using, Slope aka λ , slope of AB  λΑΒ= (y2-y1)/(x2-x1)
// if(λAB > λΒC)
//      clockwise
// else if (< ) 
//      counterclockwise
// else collinear (===)

let Orient=(A,B,C)=>{
    let lAB=(B[1]-A[1])/(B[0]-A[0]),
        lBC=(C[1]-B[1])/(C[0]-B[0])
    if(lAB>lBC)
        return 1
    else if( lAB<lBC)
        return 2
    return 0
}

// this checks if they intersect while being colinear
// which can only happen if B is between A and C
let onSegment=(A,B,C)=>{
    return B[0]<=Math.max(A[0],C[0])&&
           B[0]>=Math.min(A[0],C[0])&& 
           B[1]<=Math.max(A[1],C[1])&&
           B[1]>=Math.min(A[1],C[1])
}

