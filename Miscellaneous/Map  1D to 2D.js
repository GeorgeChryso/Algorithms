


//So if i want to map a number into the cell of a n*m matrix
// Essentially [i,j] is the x-th cell of the matrix, starting from 0
// so [0,0]=>0-th cell etc, up to [n-1,m-1] being the n*m-1th cell
let Numberto2D=(x,n,m)=>[(x/m)>>0,x-m*i]//[i,j]


//So if i want to map a cell of a nXm matrix to a number
let pairtoNumber=(i,j,n,m)=>{
    return (i-1)*m+(j-1)+1
}


console.log(pairtoNumber(
    3,2,3,5
))