// It contains all the information about all the substrings of the string. Take any path from the “Initial State (to)”   and write down the label of the edges and terminate that path at any state ( not necessarily a terminal state ) , what we obtain is a substring of the given string and if we write down all such paths we get all distinct substrings. Conversely any substring of the string “S” corresponds to a path in suffix automaton starting from “Initial State (to)” . 




//t is a substring of S, endpos(t)=set of alll the positions where t ends in S 

// if s='aba', endpos('aba')={3}, endpos('ba')={3} , endpos('a')={1,3} endpos('')={-1,3}
// 'aba' and 'ba' , are endpos equivalent, and part of the same class 
// {1,3} is a seperate class than {3} 
// the total number of classes equals to the different nodes/states in the automaton.



class SuffixAutomaton{
    constructor(){
        this.maxlen=10000
        this.st=[...Array(maxlen*2)].map(d=>new State())
        this.st[0].len=0
        this.st[0].link=-1
        this.sz=1
        this.last=0
    }
    
    State=(len=null,link=null)=>{
        this.len=len
        this.link=link
        //list of transitions
        this.next={}
    }
    // The suffix automaton itself will be stored in an array of these structures state. We store the current size sz and also the variable last, the state corresponding to the entire string at the moment.
    //adds the next character to the end of the current line, rebuilding the machine accordingly.
    automatonExtend=char=>{
        let cur=this.sz++
        this.st[cur].len=this.st[last].len+1
        let p=last
        while (p != -1 && !this.st[p].next[char.length]) {
            this.st[p].next[c] = cur;
            p = this.st[p].link;
        }
        if (p == -1) {
            this.st[cur].link = 0;
        }
        else {
            let q = this.st[p].next[c];
            if (this.st[p].len + 1 == this.st[q].len) {
                this.st[cur].link = q;
            } else {
                let clone = sz++;
                this.st[clone].len = st[p].len + 1;
                this.st[clone].next = st[q].next;
                this.st[clone].link = st[q].link;
                while (p != -1 && this.st[p].next[c] == q) {
                    this.st[p].next[c] = clone;
                    p = this.st[p].link;
                }
                this.st[q].link = this.st[cur].link = clone;
            }
        }
        last = cur;
    }

}






//5)  POSITION OF FIRST OCCURRENCE 
//Given a text T and we receive request of the form : given a pattern P  we need to know the position of first occurrence of P in T .
// To complete
let firstOccurence=(p,T)=>{




}


console.log(firstOccurence(
    'popa','asdepopalicious'
))
