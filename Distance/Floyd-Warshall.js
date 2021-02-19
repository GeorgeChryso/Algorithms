



//n= number of nodes
// RETURNS THE MINIMUMDISTANCE FROM ANY VERTEX TO ANY OTHER VERTEX
let FloydWarshall=(source,target,edges,n)=>{

    //create the adjacency matrix 
    //but to be doing that we need to assign numbers to my nodes names
    // so let's say if they re Uppercase Letters
    // A=>0, B=>1 .... LETTER=>Letter.charCodeAt(0)-65
    let numberify=letter=>letter.charCodeAt(0)-65
    //create my 3d Matrix
    let dp=[...Array(n)].map(q=>Array(n).fill(Infinity))
    
    //previousPaths representation (OPTIONAL)
    let next=[...Array(n)].map(d=>Array(n).fill([]))

    //basecase
    for (const [start,end,cost] of edges) {
        dp[numberify(start)][numberify(end)]=cost
    }

    for (let k = 0; k <n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <n; j++) {
               
              //  dp[i][j]=Math.min(dp[i][j],dp[i][k]+dp[k][j])   
                if(dp[i][j]>dp[i][k]+dp[k][j]){
                    dp[i][j]=dp[i][k]+dp[k][j]

                    //optional todo for representation
                    //   next[i][j].push(k)
                }
             
            }            
        }        
    }

    // optional find the path
    // let findPath=()=>{
    //     if(dp[n-1][numberify(source)][numberify(target)]==Infinity)return false
    //     let path=[]
        
    //     for (let currkey = numberify(source); currkey != numberify(target); ) {
    //         path.push(String.fromCharCode(currkey+65));
    //         console.log(currkey,numberify(target),path)
    //         currkey = next[currkey][numberify(target)]
    //     }
    //     return path
    // }
    // findPath()



    //  NEGATIVE CYCLE DETECTION
    //  if i want to detect a negative cycle, i run the 3 for loops a second time
    // if an optimization can be made, i set the dp[i][j]=-Infinity

    return dp[numberify(source)][numberify(target)]
}




console.log(FloydWarshall(
    'A','E',
        [   
            ['A','B',7],
            ['A','C',9],
            ['A','F',14],
            ['B','C',10],
            ['B','D',15],
            ['C','B',10],
            ['C','D',11],
            ['C','F',2],
            ['D','B',15],
            ['D','E',6],
            ['D','C',11],
            ['E','D',6],
            ['E','F',9],
            ['F','E',9],
            ['F','C',2],
            ['F','A',14]
        ],
        6
    
))


console.log((-10)%3)