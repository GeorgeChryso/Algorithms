



//n= number of nodes
let FloydWarshall=(source,target,edges,n)=>{

    //create the adjacency matrix 
    //but to be doing that we need to assign numbers to my nodes names
    // so let's say if they re Uppercase Letters
    // A=>0, B=>1 .... LETTER=>Letter.charCodeAt(0)-65
    let numberify=letter=>letter.charCodeAt(0)-65
    //create my 3d Matrix
    let dp=[...Array(n)].map(d=>[...Array(n)].map(q=>Array(n).fill(Infinity)))
    
    //previousPaths representation (OPTIONAL)
    let next=[...Array(n)].map(d=>Array(n).fill([]))

    //basecase
    for (const [start,end,cost] of edges) {
        dp[0][numberify(start)][numberify(end)]=cost
    }

    for (let k = 1; k <dp.length; k++) {
        for (let i = 0; i < dp[k].length; i++) {
            for (let j = 0; j < dp[k][i].length; j++) {
               
              //  dp[k][i][j]=Math.min(dp[k-1][i][j],dp[k-1][i][k]+dp[k-1][k][j])   
                dp[k][i][j]=dp[k-1][i][j]
                if(dp[k-1][i][j]>dp[k-1][i][k]+dp[k-1][k][j]){
                    dp[k][i][j]=dp[k-1][i][k]+dp[k-1][k][j]

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

    return dp[n-1][numberify(source)][numberify(target)]
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