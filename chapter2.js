//Chapter 2 Linked Lists

//Declaration for Linked List using JS.
//Each node, must have a pointer and value
var node = function (x) {
  this.data = x;
  this.next = null;
};

//Add node to end of linked list
//Only usable when setting up test cases
function addNodeToTail(head, x) {
  var n = new node(x);
  var curr = head;
  if (curr === null || curr === undefined) {
    head = n;
  } else {
    while (curr.next != null) {
      curr = curr.next;
    }
  }
  curr.next = n;
}

//Add node to head of linked list
//Only usable when setting up test cases
function addNodeToHead(head, x) {
  var n = new node(x);
  n.next = head;
  head = n;
}



/* 2.1 Remove Dups
Write code to remove duplicates from an unsorted 
linked list.
FOLLOW UP
How would you solve this problem if a temporary 
buffer is not allowed?
*/

//Approach 1: