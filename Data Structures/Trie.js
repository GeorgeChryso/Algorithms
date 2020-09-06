var Trie = function() {
    
    this.TrieNode=function(val){
        this.value=val
        this.children={}
        this.hasFollowing=false
        this.completeword=false
    }

    this.root=new this.TrieNode('')
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let start=this.root
    let index=0
    while(index!=word.length){
        if( start.children[word[index]]===undefined){
            start.children[word[index]]=new this.TrieNode(start.value+word[index])
        }
        start= start.children[word[index]]
        index++
    }
    start.completeword=true

};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let start=this.root
    let index=0
    while(index!=word.length){
        if(!start.children[word[index]] ){
            return false
        }
        start= start.children[word[index]]
        index++
    }
    return start.completeword
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let start=this.root
    let index=0
    while(index!=prefix.length){
        if(!start.children[prefix[index]])return false
        start= start.children[prefix[index]]
        index++
    }
    return true
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */


//  let qt=new Trie()
//  qt.insert('apple')
//  console.log(qt.search('apple'))
//  console.log(qt.search('app') )
//  console.log(qt.startsWith('app'))
//  qt.insert('app')
//  console.log(qt.search('app') )