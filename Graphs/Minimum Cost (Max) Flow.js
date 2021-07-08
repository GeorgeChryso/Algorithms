/*
    (Minimum COST MAXIMUM FLOW Problem)
    So the goal here is still to maximize flow but 
    along with the capacity for each edge I am also given
    a number, a cost per unit of flow for that specific edge
    The goal is to maximize flow while minimizing the cost I'm gonna have to pay in the end

    (Minimum COST FLOW PROBLEM)
    This problem can be also given as:
    For a given flow K, find such a flow so that the total cost we have to pay is minimized.
*/



/*
    Case 1 :
    ------
    * oriented graph
    * there is at most 1 edge between (i,j) and there is no reverse edge (j,i)
    * Let Uij be the capacity, Fij the final flow, and Cij the COST per unit of flow for the edge (i,j)
    
    Solution :
    ---------
    1) Modify the graph:
        For each edge, add the reverse to the network with Uji=0 and cost Cji=-Cij
        We still have a graph. We will try to keep Fji=-Fij during the process
    2) Define the residual flow, just like Ford Fulkerson as Rij=Uij-Fij
    3) At each iteration of the algorithm we find the shortest path in the residual graph from 
    start to finish. But now the shortest path is in terms of the cost, and not the number (count) of edges
    along the way
        *If we find such a path, we increase the flow along it as much as possible (by the min) 
        edge along the way and reduce  the edges of the path by that amount (just like in FF)
        *If there does not exist such a path anymore, the algorithm terminates.


    Case 2: (HARD)
    * Multigraph/ Undirected graph
    
    Solution
    --------
    A unidirected edge (i,j) is the same as 2 directed ones, with the same capacity and values. 
    So in our case above, we will have to create 4 directed edges, 2 for each new one. Thus,
    instead of the "parent" arraym we must store the edge number from which we came from along the ancestor,
    that would be 1 2 3 or 4. As the flow increases alonmg an edge, it is necessary to reduce the flow along
    its DESIGNATED back edge. 

*/


//Simplest Case for the Min COST FLOW PROBLEM
class Edge{
    constructor(f,t,c,d){
        this.from=f,this.to=t,
        this.capacity=c,this.cost=d
    }
}
//O(EEVV) 
// Note:we can turn this into a minCost max FLow problem by replacing K for Infinity
// Number of Nodes, Array of Edges objects, WANTED Flow, source and target nodes 
let MinCostFlow=(N,Edges,K=Infinity,source,target)=>{
    let adj=[...Array(N)].map(d=>[]),
        cost=[...Array(N)].map(d=>[...Array(N)].map(d=>0)),
        capacity=[...Array(N)].map(d=>[...Array(N)].map(d=>0))
    //fill the adj,cost,capacity matrices
    for(let E of Edges){
        adj[E.from].push(E.to)
        adj[E.to].push(E.from) //we create the back edge
        cost[E.from][E.to]=E.cost
        cost[E.to][E.from]=-E.cost
        capacity[E.from][E.to]=E.capacity
    }

    let totalFlow=totalCost=0
    while(totalFlow<K || K===Infinity){
        //perform shortest paths from Source with SPFA(bellman ford) to find the min cost flow
        let minCostFromSource=[...Array(n)].map(d=>Infinity),//Should be the min cost from source to node
            parent=[...Array(n)].map(d=>-1),q=[source],
            inq=[...Array(n)].map(d=>false)
        minCostFromSource[source]=0
        while(q.length){
            let node=q.pop()
            inq[node]=false
            if(adj[node].length)
                for(let nei of adj[node])
                    //relax
                    if(capacity[node][nei]>0 && minCostFromSource[nei]>minCostFromSource[node]+cost[node][nei]){
                        minCostFromSource[nei]=minCostFromSource[node]+cost[node][nei]
                        parent[nei]=node
                        if(!inq[nei])
                            inq[nei]=true,
                            q.push(nei)
                    }
        }
        if (minCostFromSource[target] == Infinity)// No path found
            break;
        //find the min flow of the current path
        let minPossibleFlow=K-totalFlow,cur=target //set the minflow as the max remaining first
        while(cur!==source)
            minPossibleFlow=Math.min(minPossibleFlow,capacity[parent[cur]][cur]),
            cur=parent[cur]

        //same as FF, reduce the cost along the way, and increase the back edges
        totalFlow+=minPossibleFlow
        totalCost+=minPossibleFlow*minCostFromSource[target]
        cur=target
        while(cur!==source)
            capacity[parent[cur]][cur] -= minPossibleFlow,
            capacity[cur][parent[cur]] += minPossibleFlow,
            cur = parent[cur]
    }

    if(totalFlow<K && K!==Infinity) 
        return -1
    return [totalFlow,totalCost]
}



// We can solve assignment problems with this one. For example, given a bipartite graph of n workers and m machines, we know
// the cost for each workera nd each machine, only one machine can be chosen and we have to assign 
// n workers to n machines, such that the total cost is minimized

// Solution:
// We create 1 source and 1 target node. We connect all of the workers with the source, with edges of flow 1 and cost 0
// and we connect the machines with the target, with flow 1 ancd cost 0. Then we run the above algorith on that graph.
// the FLow will obviously be N