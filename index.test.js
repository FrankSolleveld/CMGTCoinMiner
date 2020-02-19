//Import helpers
const hash = require('./index')
const convertToAscii = require('./helpers/convertToAscii')
const convertToSeparation = require('./helpers/convertToSeparation')
const charToBlocks = require('./helpers/charToBlocks')
const mod10 = require('./helpers/mod10')

// Strings with the input of the functions and expected answers
let hash_string = "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312"

let ascii_answer=
['0','0','0','0','7','8','4','5','4',99,'0','3','8','8','7','1',102,97,'4',100,'6','7',98,'0','0','2','2',97,'3','0',98,97,97,102,'2','5',101,97,97,'2','3','1',
102,'8','9','9','1',98,'1','0','8',101,'2','6','2','4',102,'0','5','2',102,'3',102,'8',67,77,71,84,77,105,110,105,110,103,67,111,114,112,111,114,97,
116,105,111,110,66,111,98,80,73,75,65,66,'1','1','5','4','8','6','8','9','5','1','3','8','5','8','1','5','4','8','7','4','7','7','8','8','7','1','6','1',
'0','3','1','2']

let separatedAnswer = [0,0,0,0,7,8,4,5,4,9,9,0,3,8,8,7,1,1,0,2,9,7,4,1,0,0,6,7,9,8,0,0,2,2,9,7,3,0,9,8,9,7,9,7,1,0,2,2,5,1,0,1,9,7,9,7,2,3,1,
1,0,2,8,9,9,1,9,8,1,0,8,1,0,1,2,6,2,4,1,0,2,0,5,2,1,0,2,3,1,0,2,8,6,7,7,7,7,1,8,4,7,7,1,0,5,1,1,0,1,0,5,1,1,0,1,0,3,6,7,1,1,1,1,1,4,1,1,2,1,1,1,1,1,4,9,7,
1,1,6,1,0,5,1,1,1,1,1,0,6,6,1,1,1,9,8,8,0,7,3,7,5,6,5,6,6,1,1,5,4,8,6,8,9,5,1,3,8,5,8,1,5,4,8,7,4,7,7,8,8,7,1,6,1,
0,3,1,2]

let charToBlocksAnswer = [0, 0, 0, 0, 7, 8, 4, 5, 4, 9]

let hash_answer = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf"

// Tests written below
test('converts given string to ASCII', () => {
    expect(convertToAscii(hash_string)).toEqual(ascii_answer)
})

test('separates the ASCII into separate numbers', () => {
    expect(convertToSeparation(ascii_answer)).toEqual(separatedAnswer)
})

test('grabs the first 10 numbers from the array and puts them in a separated array', () => {
    expect(charToBlocks(separatedAnswer)).toEqual(charToBlocksAnswer)
})

test('perform the mod10 algorithm itself', () => {
    expect(mod10(separatedAnswer, charToBlocksAnswer)).toEqual(hash_answer)
})

test('hashes text through hashing process excluding noncing', () => {
    expect(hash(hash_string)).toBe(hash_answer)
})