

// xorshift formula for pseudo  random number generation
let state0 = 1, state1 = 2
function xorshift() {  //generates a pseudo-random number between 
    let s1 = state0,s0 = state1;
    state0 = s0;

    /* SHIFTS - Just as with the seed values, the shift values (23, 17, and 26 here) must be 
    carefully chosen to lengthen the algorithm's period (the number of iterations before you 
    encounter repetition). Try changing these to see how the outcome is affected. */

    s1 ^= s1 << 23;  // SHIFT
    s1 ^= s1 >> 17;  // SHIFT
    s1 ^= s0;
    s1 ^= s0 >> 26;  // SHIFT
    state1 = s1;

    return state0 + state1;
}




let arr=[...Array(10)].map(d=>0)
for (let i = 0; i < 1000; i++) {
    arr[xorshift()%10]++
}
console.log(arr)

var seed = 1; //used to calculate a new random number
for (var i = 0; i < 15; i++) {
    // The intermediate result fits in 52 bits, so no overflow
    seed = (seed * 1664525 + 1013904223) | 0;
   // console.log(seed >>> 0);
}

