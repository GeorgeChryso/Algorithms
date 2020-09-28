
// Given 2 line segments AB,CD, determine if they intersect
// A[x1,y1] ---------> B[x2,y2]  
// C[x3,y3] ---------> D[x4,y4]   

// Orientations of three ORDERED points A,B,C:
// Clockwise
//           A
//         - |\
//         /  _\|
//        B<--- C
// Counterclockwise
//           A
//          /  |-
//        |_    \
//        B ---> C          
// Collinear if A--->B-->C

//          I N T U I T I O N : 
//  AB,CD intersect only if EITHER:
//      1) 
//  A,B,C and A,B,D have DIFFERENT orientations
//                  AND
//  C,D,A and C,D,B have DIFFERENT orientations
//                  
//   
//               OR
//      2)
//  A,B,C,D  are collinear and intersect (think of interval intersection)

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