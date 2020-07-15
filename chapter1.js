//Chapter 1 - Arrays and Strings

//1.1 IsUnique
//Implement an algorithm to determine if a string has all unique characters.
//What if you cannot use additional data structures?

//Approach 1: Using map(), O(n) time + space, using for loop as String
//would need to be converted to array using split() to use array methods
var isUnique = function (string) {
    let map = new Map()
    for (let i in string) {
        //i gives index
        if (map.has(string.charAt(i))) {
            return false
        } else {
            map.set(string.charAt(i), 1)
        }
    }
    return true
}

//Approach 2: Using lastIndexOf(), O(n^2) time, O(1) space
//Can use other string methods to solve this, but approach
//would require O(n^2) time
isUnique = function (string) {
    for (let i in string) {
        if (string.lastIndexOf(string.charAt(i)) != i) {
            return false
        }
    }
    return true
}

//Approach 3: Convert to Set() and compare length 
//O(n) time, O(n) space
isUnique = function (string) {
    var arr = string.split('')
    var set = new Set(arr)

    return set.size === arr.length ? true : false
}

/*console.log(isUnique('aba')) //false
console.log(isUnique('abc')) //true
console.log(isUnique('dbcd')) //false*/

//1.2 Check Permutation
//Given two strings, write a method to decide if one is a
//permutation of the other.

//Approach 1: Using Map() O(n) time, O(n) space

var isPermutation = function (s1, s2) {
    if (s1.length !== s2.length) return false
    map = new Map()
    for (let i in s1) {
        if (map.has(s1.charAt(i))) {
            map.set(s1.charAt(i), map.get(s1.charAt(i)) + 1)
        } else {
            map.set(s1.charAt(i), 1)
        }
    }
    for (let i in s2) {
        if (map.has(s2.charAt(i))) {
            map.set(s2.charAt(i), map.get(s2.charAt(i)) - 1)
            if (map.get(s2.charAt(i)) < 0) return false
        } else {
            return false
        }
    }
    return true
}

//Approach 2: Using string.sort and compare each
//character O(1) space, O(nlog(n)) time

isPermutation = function (s1, s2) {
    if (s1.length != s2.length) return false
    s1 = s1.split("").sort().toString()
    s2 = s2.split("").sort().toString()
    return s1 === s2 ? true : false
}

/*console.log(isPermutation('aba', 'bac')) //false
console.log(isPermutation('aab', 'aaa')) //false
console.log(isPermutation('cars', 'racs')) //true*/

/*1.4 Palindrome Permutation
Given a string, write a function to check if it is a 
permutation of a palin­ drome. A palindrome is a word
or phrase that is the same forwards and backwards. 
A permutation is a rearrangement of letters. The 
palindrome does not need to be limited to just dictionary 
words.
EXAMPLE
Input: Tact Coa
Output: True (permutations: "taco cat", "atco eta", etc.)
*/

//Approach 1: Use Map() to store count of characters
//and check if palindrome O(n) space + time

var palindromePermutation = function (string) {
    var map = new Map()
    for (let i in string) {
        if (map.has(string.charAt(i))) {
            map.set(string.charAt(i), map.get(string.charAt(i)) + 1)
        } else {
            map.set(string.charAt(i), 1)
        }
    }
    var odd = true
    if (string.length % 2 === 0) {
        odd = false //string length is even
    }
    console.log(map)
    for (let key of map.keys()) {
        //must use 'for' 'of' with map iterables
        if (map.get(key) % 2 != 0) {
            //not even
            if (!odd) {
                return false
            } else {
                odd = false
            }
        }
    }
    return true
}

/*console.log(palindromePermutation('tacocat'))
console.log(palindromePermutation('ca'))*/

/* 1.5 One Away
There are three types of edits that can be performed
on strings: insert a character, remove a character,
or replace a character. Given two strings, write a 
function to check if they are one edit (or zero edits)
away.
EXAMPLE
pale, ple -> true 
pales, pale -> true 
pale, bale -> true 
pale, bake -> false
*/

var oneAway = function (s1, s2) {
    if (Math.abs(s1.length - s2.length) > 1) return false
    var found = false
    //Case 1: Replacing character
    if (s1.length === s2.length) {
        for (let i in s1) {
            if (s1.charAt(i) !== s2.charAt(i)) {
                if (found) return false
                found = true
            }
        }
    } else {
        //Case 2: Insert/Removing
        var larger = s1.length > s2.length ? s1 : s2
        var smaller = larger === s1 ? s2 : s1
        var j = 0
        for (let i in smaller) {
            if (smaller.charAt(i) !== larger.charAt(j)) {
                if (found) return false
                found = true
                j = j + 1
            }
            j = j + 1
        }
    }
    return true
}

/*console.log(oneAway('pale', 'ple'))
console.log(oneAway('pales', 'pale'))
console.log(oneAway('pale', 'bale'))
console.log(oneAway('pale', 'bake'))*/

/* 1.6 String Compression
Implement a method to perform basic string 
compression using the counts of repeated characters. 
For example, the string aabcccccaaa would become 
a2blc5a3. If the "compressed" string would not 
become smaller than the original string, your method 
should return the original string. You can assume 
the string has only uppercase and lowercase letters 
(a - z).
*/

//Approach 1: Use another string to capture
//result string and compare until char changes
var stringCompression = function (string) {
    if (string.length <= 2) return string
    var res = ""
    let count = 0
    var i = 0,
        j = 0
    while (i < string.length) {
        if (string.charAt(i) === string.charAt(j)) {
            i++
            count++
        } else {
            //switch
            res += string.charAt(j) + count
            count = 0
            j = i
        }
    }
    res += string.charAt(j) + count
    return string.length > res.length ? res : string
}

/*console.log(stringCompression('aabccccaaa'))
console.log(stringCompression('aAbccCCaaa'))*/

/* 1.8 Zero Matrix
Write an algorithm such that if an element in 
an MxN matrix is 0, its entire row and column 
are set to 0.
*/

//Approach 1: Using boolean matrix to mark 0s
//and then zero out in original matrix
var zeroMatrix = function (matrix) {
    let matrix2 = []
    matrix.forEach((element, i) => {
        matrix2[i] = []
        element.forEach((item, j) => {
            matrix2[i][j] = true
        })
    })
    matrix.forEach((element, i) => {
        element.forEach((item, j) => {
            if (matrix[i][j] === 0) {
                helper(matrix2, i, j)
            }
        })
    })
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix2[i][j] === false) {
                matrix[i][j] = 0
            }
        }
    }
    return matrix
}
var helper = function (matrix, i, j) {
    for (let a = 0; a <= i; a++) {
        matrix[a][j] = false
    }
    for (let b = 0; b <= j; b++) {
        matrix[i][b] = false
    }
}

var matrix1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 0, 11, 12],
]
//console.log(zeroMatrix(matrix1))
