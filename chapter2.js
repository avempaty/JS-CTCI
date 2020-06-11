//Chapter 2 Linked Lists

//Declaration for Linked List using JS.
//Each node, must have a pointer and value
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

//Add node to head of linked list
//Only usable when setting up test cases
function addNodeToHead(head, x) {
    var n = new node(x)
    n.next = head
    head = n
    return head
}

/* 2.1 Remove Dups
Write code to remove duplicates from an unsorted 
linked list.
FOLLOW UP
How would you solve this problem if a temporary 
buffer is not allowed?
*/

//Approach 1: Using Map(), store values and then
//delete duplicate nodes found
//O(n) time + space
var removeDup = function (head) {
    var map = new Map()
    var curr = head
    var prev = null
    if (head.next === null) {
        return head
    }
    while (curr != null) {
        if (!map.has(curr.data)) {
            map.set(curr.data, 1)
            prev = curr
        } else {
            //found duplication, remove
            prev.next = curr.next
        }
        curr = curr.next
    }
    return head
}

//Approach 2: Use 2 pointers to iterate through linked list
//O(n^2) time, O(1) space
removeDup = function (head) {
    var curr = head
    var pt1 = head
    var prev = head
    if (head.next === null) {
        return head
    }
    while (curr.next != null) {
        //first loop
        pt1 = curr.next
        prev = curr
        while (pt1 != null) {
            if (pt1.data === curr.data) {
                prev.next = pt1.next
            } else {
                prev = pt1
            }
            pt1 = pt1.next
        }
        curr = curr.next
    }
    return head
}

//Test Cases
/*var head = new node(1)
addNodeToTail(head, 2)
addNodeToTail(head, 2)
addNodeToTail(head, 3)
addNodeToTail(head, 4)
addNodeToTail(head, 5)
head = addNodeToHead(head, 1)
head = addNodeToHead(head, 1)
head = addNodeToHead(head, 1)

var curr = head
while (curr != null) {
  console.log(curr)
  curr = curr.next
}
var res = removeDup(head)
curr = res
while (curr != null) {
  console.log(curr)
  curr = curr.next
}*/

/* 2.2 Return Kth to Last
Implement an algorithm to find the kth to last 
element of a singly linked list.
*/

//Approach 1: Use a stack and pop k times
//to get kth to last element
//O(n) time + space
kthToLast = function (head, k) {
    var stack = [] //using array as stack
    while (head != null) {
        stack.push(head)
        head = head.next
    }
    for (let i = 0; i < k; i++) {
        var res = stack.pop()
    }
    return res
}

//Approach 2: Use recursion to push and pop
//k times
//This approach uses index for recursing
//O(n) time, O(1) space
function kthToLastRecursion(head, k) {
    if (head === null) return 0
    var ind = kthToLastRecursion(head.next, k) + 1
    if (ind === k) console.log(head)
    return ind
}

//Aproach 3: Iterate with 2 pointers,
//distance them by k nodes and go till end of list
//O(n) time, O(1) space
kthToLastIterative = function (head, k) {
    var pt1 = head
    var pt2 = head
    for (let i = 0; i < k; i++) {
        pt2 = pt2.next
    }
    while (pt2 != null) {
        pt1 = pt1.next
        pt2 = pt2.next
    }
    return pt1
}

/*var head = new node(1)
addNodeToTail(head, 2)
addNodeToTail(head, 3)
addNodeToTail(head, 4)
addNodeToTail(head, 5)
addNodeToTail(head, 6)

var res = kthToLastRecursion(head, 5)
res = kthToLast(head, 5)
console.log(res)
res = kthToLastIterative(head, 5)
console.log(res)*/


/* 2.3 Delete Middle Node
Implement an algorithm to delete a node in the 
middle (i.e., any node but the first and last node, 
not necessarily the exact middle) of a singly linked 
list, given only access to that node.

EXAMPLE
lnput:the node c from the l
inked list a->b->c->d->e->f

Result: nothing is returned, but the new l
inked list looks like a->b->d->e->f
*/

//Approach 1
//Change data of curr and keep going till final node,
//then set it to null
//O(n) time, O(1) space

var deleteMiddleNode = function(curr) {
    while(curr.next != null) {
        curr.data = curr.next.data
        curr = curr.next
    }
}

var head = new node(0)
addNodeToTail(head, 1)
addNodeToTail(head, 2)
addNodeToTail(head, 3)
addNodeToTail(head, 4)
addNodeToTail(head, 5)

var curr = head
for(let i = 0; i < 3; i++) {
    curr = curr.next
}
deleteMiddleNode(curr)
while(head != null) {
    console.log(head)
    head = head.next
}