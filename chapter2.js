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

var deleteMiddleNode = function (curr) {
    while (curr.next != null) {
        curr.data = curr.next.data
        curr = curr.next
    }
}

/*var head = new node(0)
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
}*/

/* 2.4 Partition 
Write code to partition a linked list around 
a value x, such that all nodes less than x come 
before all nodes greater than or equal to x. 
If x is contained within the list the values of x
only need to be after the elements less than x 
(see below). The partition element x can appear 
anywhere in the "right partition"; it does not 
need to appear between the left and right partitions.

EXAMPLE
Input: 3 -> 5 -> 8 5 -> 10 2 1[partition=5] 
Output: 3 -> 1 2 -> 10 -> 5 5 -> 8
*/

//Aproach 1: Make 2 linked lists, and join them
//O(n) time + space

var partition = function (head, x) {
    var smaller = new node(0)
    var larger = new node(0)
    var i = smaller
    var j = larger
    while (head != null) {
        if (head.data < x) {
            i.next = new node(head.data)
            i = i.next
        } else {
            j.next = new node(head.data)
            j = j.next
        }
        head = head.next
    }
    i.next = larger.next
    return smaller.next
}

//Aproach 2: Use 1 linked list to join items
//Have 2 pointers, and move node before head if smaller
//Move node behind tail if larger
//O(n) time, O(1) space

var partition = function (head, x) {
    var smaller = head
    var larger = head
    var curr = head
    while (curr != null) {
        var next = curr.next
        if (curr.data < x) {
            curr.next = smaller
            smaller = curr
        } else {
            larger.next = curr
            larger = curr
        }
        curr = next
    }
    //smaller.next = larger
    larger.next = null
    return smaller
}

/*var head = new node(3)
addNodeToTail(head, 5)
addNodeToTail(head, 8)
addNodeToTail(head, 5)
addNodeToTail(head, 10)
addNodeToTail(head, 2)
addNodeToTail(head, 1)

var res = partition(head, 5)
while (res != null) {
    console.log(res)
    res = res.next
}*/

/* 2.5 Sum List
You have two numbers represented by a linked list,
where each node contains a single digit. The digits
are stored in reverse order,such that the 1's digit
is at the head of the list. Write a function that 
adds the two numbers and returns the sum as a 
linked list.

EXAMPLE
Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295. 
Output:2 -> 1 -> 9.Thatis,912.

FOLLOW UP
Suppose the digits are stored in forward order. 
Repeat the above problem. 
Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).Thatis,617 + 295. 
Output:9 ->1 ->2.Thatis,912.
*/

//Approach 1: Use a new linked list, carry over the 1
//if value above 10, and save, if remainder left over,
//then create a new node to satifsy the result

var sumList = function (list1, list2) {
    var res = new node(0)
    var curr = res
    var remainder = 0
    while (list1 != null && list2 != null) {
        var sum = list1.data + list2.data + remainder
        if (sum > 9) {
            sum = sum % 10
            remainder = 1
        } else {
            remainder = 0
        }
        curr.next = new node(sum)
        curr = curr.next
        list1 = list1.next
        list2 = list2.next
    }

    while (list1 != null) {
        var x = list1.data + remainder
        if (x > 9) {
            x = x % 10
            remainder = 1
        } else {
            remainder = 0
        }
        curr.next = new node(x)
        curr = curr.next
        list1 = list1.next
    }
    while (list2 != null) {
        var x = list2.data + remainder
        if (x > 9) {
            x = x % 10
            remainder = 1
        } else {
            remainder = 0
        }
        curr.next = new node(x)
        curr = curr.next
        list2 = list2.next
    }
    if (remainder !== 0) {
        curr.next = new node(remainder)
    }
    return res.next
}

/*var head1 = new node(9)
addNodeToTail(head1, 9)
addNodeToTail(head1, 9)
var head2 = new node(1)
var res = sumList(head1, head2)
while (res != null) {
    console.log(res)
    res = res.next
}*/

/* 2.6 Palindrome  
Implement a function to check if a 
linked list is a palindrome.
*/

//Aproach 1: Use a stack and compare the list
//with the stack
//O(n) time + space
var isPalindrome = function (head) {
    var stack = []
    var curr = head
    while (curr != null) {
        stack.push(curr)
        curr = curr.next
    }
    while (head != null) {
        if (stack.pop().data !== head.data) {
            return false
        }
        head = head.next
    }
    return true
}

/*var head = new node(0)
addNodeToTail(head,1)
addNodeToTail(head,2)
addNodeToTail(head,1)
addNodeToTail(head,0)
var res = isPalindrome(head)
console.log(res)*/

/* 2.7 Intersection
Given two (singly) linked lists, determine if the 
two lists intersect. Return the intersecting node. 
Note that the intersection is defined based on 
reference, not value. That is, if the kth node of the
first linked list is the exact same node (by 
reference) as the jth node of the second linked list,
then they are intersecting.
*/

//Approach 1: Iterate both lists and get sizes, then
//increment larger one to start at same node length,
//if they equal the same, then intersection or else
//return false
//O(A + B) time, O(1) space where A and B are lenghts
//of both linked lists
var intersection = function (list1, list2) {
    var curr1 = list1
    var curr2 = list2
    var count1 = 0
    var count2 = 0
    while (curr1 != null) {
        count1 += 1
        curr1 = curr1.next
    }
    while (curr2 != null) {
        count2 += 1
        curr2 = curr2.next
    }
    curr1 = list1
    curr2 = list2
    if (count1 > count2) {
        for (var i = 0; i < count1 - count2; i++) {
            curr1 = curr1.next
        }
    } else {
        for (var i = 0; i < count2 - count1; i++) {
            curr2 = curr2.next
        }
    }

    while (curr1 != null && curr2 != null) {
        if (curr1 === curr2) return curr1
        curr1 = curr1.next
        curr2 = curr2.next
    }
    return null
}

/*var head = new node(3)
addNodeToTail(head,1)
addNodeToTail(head,5)
addNodeToTail(head,9)
addNodeToTail(head,7)
addNodeToTail(head,2)
addNodeToTail(head,1)
var head2 = new node(4)
addNodeToTail(head2, 6)
var temp = head
for(var i = 0; i < 4; i++) {
    temp = temp.next
}
head2.next.next = temp
//console.log(head2.next.next)
//console.log(head)
console.log(intersection(head, head2)) */

/* 2.8 Loop Detection
Given a circular linked list, implement an 
algorithm that returns the node at the beginning 
of the loop.
DEFINITION
Circular linked list: A (corrupt) linked list in 
which a node's next pointer points to an earlier 
node, so as to make a loop in the linked list.
EXAMPLE
Input: A -> B -> C -> D -> E -> C [same C as earlier] 
Output: C
*/

//Approach 1: Use 2 pointers (fast + slow)
//if pointers are equal to each other, then
//list is circular
var loopDetection = function (head) {
    var fast = head
    var slow = head
    while (slow != null && fast != null && fast.next != null) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) return true
    }
    return false
}

/*var head = new node('A')
addNodeToTail(head,'B')
addNodeToTail(head,'C')
addNodeToTail(head,'D')
addNodeToTail(head,'E')
var temp = head
for(var i = 0; i < 2; i++) {
    temp = temp.next
}
temp.next.next.next = temp
temp = head
console.log(loopDetection(head))*/
