




// returns an array of all PERMUTATIONS WITH REPETITION out of the set of length k
let printCombRep=(set,k)=>{
    let result=[],n=set.length
    let rec=(prefix)=>{
        if(prefix.length==k)
            return result.push([...prefix])//at this point prefix coitains the created array
        for(let i=0;i<n;i++){
            prefix.push(set[i])
            rec(prefix)
            prefix.pop()
        }
    }
    rec([])
    return result
}

console.log(
    printCombRep(['A','B','A'],2)
)