// "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?











//--NP HARD--
// N=number of cities
// edges=[from,to,cost]


// dp[subset][Node]=K
// K is the shortest (cost) path from city 0 to city Node which goes through all the vertices
// from "subset", EXACTLY ONCE

//transition : 
// dp[subset+{v},v]= dp[subset][Node]+ Distance[v,Node]=K + Distance[v,Node]
// essentially extending my path by a new node V

// Hamiltonian Cycle: A path which goes through each Node exactly once
// So essentially we re looking for the hamiltonian cycle of minimum cost for all the N nodes. 

// so the answer becomes 
// min(dp[{0,1,2,3,...N-1},a]+Distance[0,a]), for each node a


//first, let me assume that here the total number of nodes is less than 32
// I can actually describe each possible subset with the binary representation of a 32 bit number
// for example, the subset that contains nodes 0,2 and 5 is    ...000100101  etc
let TSPf=(N,edges)=>{
    let distance=[...Array(N)].map(d=>[...Array(N)].map(d=>Infinity))
    for (const [from,to,cost] of edges) {
        distance[from][to]=cost
        distance[to][from]=cost
    }

    //all my possible subsets are 2**N 
    let dp=[...Array(2**N)].map(d=>[...Array(N)].map(d=>Infinity))
    //basecase
    dp[1][0]=0// the path consisting only of the first node (00..01), and ending at node 0 costs 0

    //FORWARD DP STYLE
    for (let subset = 0; subset < 1<<N; subset++)  //this is done lexicographically btw. 0101 can only consider 0001,0010,00100
        for (let a = 0; a < N; a++) //the old end
            for (let e = 0; e < N; e++) { // a new extension
                if(subset&(1<<e)) //if s already has the extension already, continue
                    continue
                let newSubset=subset|(1<<e) //added the extension
                let newCost=dp[subset][a]+distance[a][e] //the old subset
                dp[newSubset][e]=Math.min(dp[newSubset][e],newCost)
            }            
  

    // My final answer is the minimum cost i could achieve for the subset subset where every number is used
    // so that would be 2**N-1  => 1111..111, can also be represented as (1<<N)-1
    let result=Infinity
    for (let i = 0; i < N; i++) //consider every node as the possible end node
        result=Math.min(result,dp[2**N-1][i]+distance[0][i])
    return result
}
//O((2**N )* N*N )

//lets try to do it backwards instead
let TSPb=(N,edges)=>{
    console.log(edges)
    let distance=[...Array(N)].map(d=>[...Array(N)].map(d=>Infinity))
    for (const [from,to,cost] of edges) {
        distance[from][to]=cost
        distance[to][from]=cost
    }

    //all my possible subsets are 2**N 
    let dp=[...Array(2**N)].map(d=>[...Array(N)].map(d=>Infinity))
    //basecase
    dp[1][0]=0// the path consisting only of the first node (00..01), and ending at node 0 costs 0

    //backwards DP STYLE
    for (let a = 0; a < N; a++) //the new end
        for (let subset = 0; subset < 1<<N; subset++)  //this is done lexicographically btw. 0101 can only consider 0001,0010,00100
            for (let e = 0; e < N; e++) { // the old end
                if(subset&(1<<a)==0||subset&(1<<e)==0) //must have both old a and new ends 
                    continue
                let withoutNew=subset&(~(1<<a)) //removed the new end 
                let newCost=dp[withoutNew][e]+distance[a][e] 
                dp[subset][a]=Math.min(dp[subset][a],newCost)
            }            
  

    // My final answer is the minimum cost i could achieve for the subset subset where every number is used
    // so that would be 2**N-1  => 1111..111, can also be represented as (1<<N)-1
    let result=Infinity
    for (let i = 0; i < N; i++) //consider every node as the possible end node
        result=Math.min(result,dp[2**N-1][i]+distance[0][i]) //dont forget to actually add the distance between the start and the last node, which is not normally added ( to complete the cycle)
    return result
}


let tests=[
    
    [4
        ,
        [
            [0,1,1],[0,3,3],[1,2,1],[1,3,1],[2,3,2]
        ]
    ],

]
tests.forEach(d=>console.log(TSPf(d[0],d[1]),TSPb(d[0],d[1])))