//Chapter 4 Trees and Graphs

//Declaration for List Node
var node = function (x) {
    this.data = x
    this.next = null
}

//Add node to end of linked list
//Only usable when setting up test cases
function addNodeToTail(head, x) {
    var n = new node(x)
    var curr = head
    if (curr === null || curr === undefined) {
        head = n
    } else {
        while (curr.next != null) {
            curr = curr.next
        }
    }
    curr.next = n
}

//Declaration for Tree Node
var treeNode = function (x) {
    this.data = x
    this.left = null
    this.right = null
    this.parent = null
}

//Declaration for Graph Node
var graphNode = function (x) {
    this.children = []
    this.data = x
    this.isVisited = false
}

//Declaration for Graph
var graph = function () {
    this.nodes = []
}

/* 4.1 Route Between Nodes
Given a directed graph, design an algorithm to find 
out whether there is a route between two nodes.
*/

//Approach 1: Use BFS (a queue) to determine if
//a route exists between 2 nodes
//O(n) time, O(1) space
var route = function (node1, node2) {
    var queue = [] //push(), shift()
    queue.push(node1)
    while (queue.length > 0) {
        var node = queue.shift()
        node.isVisited = true
        if (node === node2) return true
        for (ind in node.children) {
            if (!node.children[ind].isVisited) {
                queue.push(node.children[ind])
            }
        }
    }
    return false
}

/*var a = new graphNode('a')
var b = new graphNode('b')
var c = new graphNode('c')
var d = new graphNode('d')
var e = new graphNode('e')
var f = new graphNode('f')
a.children.push(b)
a.children.push(d)
b.children.push(a)
b.children.push(c)
c.children.push(b)
c.children.push(e)
d.children.push(a)
e.children.push(c)
console.log(route(a,e))
console.log(route(a,f))*/

/* 4.2 Minimal Tree
Given a sorted (increasing order) array with 
unique integer elements, write an algorithm to 
create a binary search tree with minimal height.
*/

//Approach 1: Use helper function to take in
//min and max values and create a node at mid
//point, then recurse
//O(n) time + space
var minimalTree = function (arr) {
    var helper = function (arr, min, max) {
        if (min > max) return null
        var mid = Math.floor((min + max) / 2)
        var head = new treeNode(arr[mid])
        head.left = helper(arr, min, mid - 1)
        head.right = helper(arr, mid + 1, max)
        return head
    }
    return helper(arr, 0, arr.length - 1)
}

/*var arr = [1, 2, 3, 4, 5, 6]
console.log(minimalTree(arr))*/

/* 4.3 List of Depths
Given a binary tree, design an algorithm which 
creates a linked list of all the nodes at each depth
(e.g., if you have a tree with depth D, you'll have 
D linked lists).
*/

//Approach 1: Create a list and keep track of depth
//O(n) space + time

var listOfDepths = function (head) {
    var arr = []
    var helper = function (head, depth) {
        if (head === null) return
        if (depth >= arr.length) {
            arr[depth] = new node(head.data)
        } else {
            var curr = arr[depth]
            addNodeToTail(curr, head.data)
        }
        helper(head.left, depth + 1)
        helper(head.right, depth + 1)
        return
    }
    helper(head, 0)
    return arr
}

/*var n1 = new treeNode(1)
n1.left = new treeNode(2)
n1.right = new treeNode(3)
var iter = n1.left
iter.left = new treeNode(4)
iter.right = new treeNode(5)
iter = n1.right
iter.left = new treeNode(6)
iter.right = new treeNode(7)
arr = listOfDepths(n1)
console.log(arr[2])*/

/* 4.4 Check Balanced 
Implement a function to check if a binary tree
is balanced. For the purposes of this question, 
a balanced tree is defined to be a tree such that 
the heights of the two subtrees of any node never 
differ by more than one.
*/

//Approach 1: Get left and right depth of each node,
//if they differ by more than one, return false
//O(n) time, O(1) space
var checkBalanced = function (head) {
    let helper = function (head) {
        if (head === null) return 0
        let left = helper(head.left) + 1
        let right = helper(head.right) + 1
        if (Math.abs(left - right) > 1) return Infinity
        return Math.max(left, right)
    }
    return helper(head) === Infinity ? false : true
}

/*var n1 = new treeNode(1)
n1.left = new treeNode(2)
n1.right = new treeNode(3)
var iter = n1.left
iter.left = new treeNode(4)
iter.left.left = new treeNode(8)
iter.left.left.left = new treeNode(9)
iter.right = new treeNode(5)
iter = n1.right
iter.left = new treeNode(6)
iter.right = new treeNode(7)

console.log(checkBalanced(n1))*/

/* 4.5 Validate BST
Implement a function to check if a binary tree is 
a binary search tree.
*/

//Approach 1: Use Infinity and negative infinity
//to start with search and see if left and right
//are valid inputs
//O(n) time, O(1) space
var validateBST = function (head) {
    var helper = function (head, min, max) {
        if (head === null) return true
        if (head.data < min || head.data > max) return false
        return (
            helper(head.left, min, head.data) &&
            helper(head.right, head.data, max)
        )
    }
    return helper(head, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
}

/*var root = new treeNode(20)
root.left = new treeNode(10)
root.right = new treeNode(30)
root.left.left = new treeNode(5)
root.left.left.left = new treeNode(3)
root.left.right = new treeNode(15)
root.left.right.right = new treeNode(17)
root.left.left.right = new treeNode(11)
console.log(validateBST(root))*/

/* 4.6 Successor
Write an algorithm to find the "next" node 
(i.e., in-order successor) of a given node in a 
binary search tree. You may assume that each node 
has a link to its parent.
*/
//Approach 1
var successor = function(head) {
    var leftMostChild = function(head) {
        if(head === null) return null
        while(head.left != null) head = head.left
        return head
    }
    if(head === null) return null
    //Case 1: Node has a right child
    if(head.right != null) {
        return leftMostChild(head.right)
    }

    //Case 2: Traverse parent until parent node's
    //child is current node
    q = head.parent
    while(q != null && q.right === head) {
        head = q
        q = q.parent
    }
    return q
}

/*var root = new treeNode(20)
root.left = new treeNode(10)
root.left.parent = root
root.right = new treeNode(30)
root.right.parent = root
root.left.left = new treeNode(5)
root.left.left.parent = root.left
root.left.left.left = new treeNode(3)
root.left.left.left.parent = root.left.left
root.left.right = new treeNode(15)
root.left.right.parent = root.left
root.left.right.right = new treeNode(17)
root.left.right.right.parent = root.left.right

console.log(successor(root))*/

/* 4.8 First Common Ancestor
Find the first common ancestor of two nodes in a binary
tree. Avoid storing additional nodes in data structures
*/

//Approach 1: With no parent node, check the root
//and see if there is a path to both nodes, until we 
//reach a node that doesn't cover both
//O(n) time, O(1) space
var firstCommonAncestor = function(root, n1, n2) {

    var helper = function(root, node) {
        if(root === null) return false
        if(root === node) return true
        return helper(root.left, node) || helper(root.right, node)
    }

    if(n1 === root || n2 === root) return root
    if(n1 === n2) return n1
    if(helper(root, n1) === false || helper(root,n2) === false) return null

    var recurse = function(curr, n1, n2) {
        if(helper(curr.left, n1) && helper(curr.left, n2)) {
            return recurse(curr.left, n1, n2)
        } else if(helper(curr.right,n1) && helper(curr.right, n2)) {
            return recurse(curr.right, n1, n2)
        } else {
            return curr
        }
    }
    return recurse(root, n1, n2)
}

/*var root = new treeNode(20)
root.left = new treeNode(10)
root.right = new treeNode(30)
root.left.left = new treeNode(5)
root.left.left.left = new treeNode(3)
root.left.right = new treeNode(15)
root.left.right.right = new treeNode(17)
root.left.left.right = new treeNode(11)
console.log(firstCommonAncestor(root, root.left.left.left, root.left.right.right))*/

/* 4.10 Check Subtree
T1 & T2 are two very large binary trees, with T1 much
bigger than T2. Create an algorithm to determine if T2
is a subtree of T1.
*/




