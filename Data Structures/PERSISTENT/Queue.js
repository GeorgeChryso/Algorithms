

// Add some element to some version
// print Pop some element from a version


// Persistence
/*
- keep all versions of said Data structure
- take a version and make a new one
- never destroy old versions
- all DS operations are relative to the specified version
- an Update makes, and returns, a new version
-   for example Insert, at some version an element, returns the new modified version

/////////////=====4 L E V E L S=====\\\\\\\\\\\\\\\\\\\\\\\\\\
    Partial Persistence
-Only allowed to update the latest version (linearly ordered versions)
-can still ask question about old versions, but i cannot change them, I can only change the latet version

    Full Persistence
-I can update and query any version I want. 
-So the versions now form a tree, a new branch is a new modified (old) version

    Confluent Persistence (we can merge versions)
-We can "combine" 2 versions to create a new one. Still cant destroy old versions
-Now the versions form a Directed, Acyclic Graph

    Functional Persistence
-I can not do modifications. I can only create new nodes.

*/


/*
    -Any DS can be made Partially Persistent with 0(1) extra cost
        *store back pointers( previous pointers)
        *store O(1) mods(version when changed,field that got chagned, new value) to fields of DS
        *to read a node.field of a version v, i look at all the modifications with a version <=v
        *to change a node.field=x of a version v:
            If node is not full
                add the modification (now,field,x)
            else
                make a new node' that represents the latest version after the modification
                (with the same back pointers)
                recursively update pointers


*/