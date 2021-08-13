




// Calculating d1[i] = count of distinct palindroms centered at i , (with odd length)

// d2[i]=count of distinct palindroms centered at i-1,i  (with even lengths)


let manacherLPS=s=>{
    let n=s.length,d1=[...Array(n)],d2=[...Array(n)]
    //d1
    for (let i = 0, l = 0, r = -1; i < n; i++) {
        let k = (i > r) ? 1 :Math.min(d1[l + r - i], r - i + 1); 
        // if within the borders try to utilize the big palindrome, as in:
        // if the big palidnrom is    l( AABAA ) (AABAA) r
        //                                          i
        // i exploit the fact that [l,r] being a palindrom almost always means that 
        // the two inner halves are palindromes aswell.
        while (0 <= i - k && i + k < n && s[i - k] == s[i + k]) 
            k++;
        d1[i] = k--;
        if (i + k > r) 
            [l,r] = [i - k, i + k] //always remember the borders of the last palindrome
    }
    //d2 (even lengths)
    for (let i = 0, l = 0, r = -1; i < n; i++) {
        let k = (i > r) ? 0 :Math.min(d2[l + r - i + 1], r - i + 1);
        while (0 <= i - k - 1 && i + k < n && s[i - k - 1] == s[i + k]) 
            k++;
        d2[i] = k--;
        if (i + k > r)
            [l,r] = [i - k-1, i + k]

    }
    // Remember: d1[i]= 1 means just s[i], but 2 means s[i-1],s[i],s[i+1]
    // whereas d2[i]=1 means s[i-1]+s[i], but 2 means  s[i-2]...s[i+1]
    return Math.max( Math.max(...d1)*2-1,Math.max(...d2)*2)
}   


// LPSend[i]= the length of the biggest lps ending at s[i]
var LPSend=s=>{
    let n=s.length,d1=[...Array(n)],d2=[...Array(n)],left=[...Array(n)].map(d=>1)
    // consider the odd lengthed palindromes
    for (let i = 0, l = 0, r = -1; i < n; i++) {
        let k = (i > r) ? 1 :Math.min(d1[l + r - i], r - i + 1); 
        while (0 <= i - k && i + k < n && s[i - k] == s[i + k]) 
            left[i+k]=Math.max(left[i+k],2*(k+1)-1),k++
        d1[i] = k--;
        if (i + k > r) 
            [l,r] = [i - k, i + k] 
    }
    // consider the even lengthed palindromes
    for (let i = 0, l = 0, r = -1; i < n; i++) {
        let k = (i > r) ? 0 :Math.min(d2[l + r - i + 1], r - i + 1);
        while (0 <= i - k - 1 && i + k < n && s[i - k - 1] == s[i + k]) 
            left[i+k]=Math.max(left[i+k],2*(k+1)),k++;
        d2[i] = k--;
        if (i + k > r)
            [l,r] = [i - k-1, i + k]
    }
    return left
}
//obviously LPSstart=LPSend(s.reverse()).reverse()
console.log(LPSend('abaa'))