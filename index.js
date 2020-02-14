const axios = require("axios")
const crypto = require("crypto")

let text = "text" 

function hash(string){

    // convert text to ASCII, text must be converted by letter
    let ascii = convertToAscii(string)

    // Splice numbers into empty array, numbers must be separated
    let separatedArray = convertToSeparation(ascii)

    // From this array, add up so that there will be blocks with 10 characters
    let firstBlock = charToBlocks(separatedArray)

    // perform the mod10 algorithm
    let sum = mod10(separatedArray, firstBlock)
    console.log("de sum: " + sum)
    return sum
}

function convertToAscii(string){
    let ascii = []
    string = string.replace(/\s/g, '')
    var splittedText = string.split("")
    for(let char of splittedText){
        ascii.push(char.charCodeAt(0))
    }
    return ascii
}

function convertToSeparation(ascii){
    let separatedArray = []
    for(let char of ascii){
        let splittedChar = char.toString().split("")
        for (let arrayNumber of splittedChar){
            separatedArray.push(parseInt(arrayNumber))
        }
    }
    return separatedArray
}

function charToBlocks(separatedArray){ 
    var s = separatedArray.length % 10
    var restNumber = 10 - s
    for (i=0; i < restNumber; i++){
        separatedArray.push(i)
    }  
    var firstBlock = separatedArray.splice(0, 10)

    return firstBlock
}

function mod10(separatedArray, sum){
    if(separatedArray.length == 0){
        sum = sum.toString().replace(/,/g,'')
        return crypto.createHash('sha256').update(sum).digest('hex')
    }
    
    let nextBlock = separatedArray.splice(0, 10)
    return mod10(separatedArray, calculate(sum, nextBlock))
}

function calculate(x, y){
    var newArray = []
    for(i=0 ;i<10; i++){
        newArray.push(x[i] + y[i] % 10)
    }
    console.log(newArray)
    return newArray
}

function doHash(sum){
    let nonce = 0
    let hashedSum = hash(sum + nonce)

    while (hashedSum.substr(0, 4) !== 0000) {
        nonce++
        hashedSum = hash(sum + nonce)
    }
    console.log("juiste nonce gevonden: " + nonce)
    return nonce
}

function getPreviousBlock() {
    axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then(res => {
            // let string = hash(createLastBoxString(res.data))
            // Check Discord, deze string moet gehashed uitkomen op een reeks in Discord.
            let newString = "text"
            // createNewBlockString(string, res.data)
            hash(newString)
        })
        .catch(err => console.log(err))
}

function createLastBoxString(block){
    let s = block.blockchain.hash + block.blockchain.data[0].from + block.blockchain.data[0].to + block.blockchain.data[0].amount + block.blockchain.data[0].timestamp + block.blockchain.timestamp + block.blockchain.nonce
    console.log("Last Box String: " + s)
    return s
}

function createNewBlockString(string, block){
    let s = string + block.transactions[0].from + block.transactions[0].to + block.transactions[0].timestamp + block.timestamp
    console.log("New Box String: " + s)
    return s
}

(getPreviousBlock())