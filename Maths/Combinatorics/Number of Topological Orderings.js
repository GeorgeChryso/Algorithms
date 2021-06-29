
// We have two arrays of elements. 
// We want to merge them, but keep the relative ordering of each array
// What is the count of different orderings i can come up with

// Let's assume A=[...] of length N and B=[...] of length M

// Then the problem is equivalent to having N+M blank spaces, and I have to place A or B inside them
// That means nCr(N+M,M)=nCr(N+M,N)= N+M CHOOSE N = N+M CHOOSE M