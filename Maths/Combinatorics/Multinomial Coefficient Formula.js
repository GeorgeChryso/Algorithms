

// The multinomial coefficients have a direct combinatorial interpretation, as the number of ways of depositing n distinct objects into m distinct bins, with k1 objects in the first bin, k2 objects in the second bin, and so on.[1]


// We have m1 items of one kind, m2 of another ...mk of another
// and we want to put them in  n baskets, ( a basked can have more than one elements)

   n! / m1! m2! m3! ...mk!



// S O  S

// the best interpretation is  when n =m1+m2+..+mk 

// then (   m1+..mk ) ! / m1! ...mk!  is the number of PERMUTATIONS when i have m1 count of a thing, m2 count of another etc

// for example  A BB C
//              1 2  1

// then the number of unique permutations with these letters available is 

//    (1+2+1)! / 1!2!1! = 4!/2!= 3*4=12
// ABBC
// ABCB
// ACBB
// BACB
// BABC
// BCBA
// BCAB
// BBCA
// BBAC
// CABB
// CBAB
// CBBA

