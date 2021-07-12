// The cardinality of the Maximum Matching ( maximum set of edges with no 2 edges having the same vertex)
// EQUALS==============
// The minimum Vertex Cover which is:
// The minimum number of vertices such that every other vertex touches at least one of those vertices.




/// But the really hot take here is that we can produce a minimum Vertex Cover FROM a maximum Matching
// Konig was really a genius bastard

// Let's say we already have a maximum matching, aka a set of edges such that no 2 share a vertex. 
// No vertex inside our future minimum vertex cover can COVER more than ONE EDGE inside our MAXIMUM MATCHING,
// So we need a cover with as much vertices as the edges I already have in my maximum matching.

// let U be the UNMATCHED vertices in the LEFT SIDE
// obviously U(=L  , same goes for Z(=R, for the right side of my bipartite graph

