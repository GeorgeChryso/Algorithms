


// Exchange the smallest number among the ones on the right side of what u re examining, with the position u re currently at.


let selectionSort=A=>{

    for (let i = 0; i < A.length-2; i++) {

        let min=Infinity
        let minidx=-1
        for (let j = i; j < A.length; j++) {
                if(min>A[j]){
                    min=A[j]
                    minidx=j
                }
        }

        //swap the elements
        let temp=min
        A[minidx]=A[i]
        A[i]=temp
    }

    return A

}

console.log(selectionSort(
    [2,1,6,12,7123,723,123,5,1]
))