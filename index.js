const axios = require("axios")

// Helpers
const convertToAscii = require("./helpers/convertToAscii")
const convertToSeparation = require("./helpers/convertToSeparation")
const charToBlocks = require("./helpers/charToBlocks")
const mod10 = require("./helpers/mod10")

function hash(string){
    // convert text to ASCII, text must be converted by letter
    let ascii = convertToAscii(string)

    // Splice numbers into empty array, numbers must be separated
    let separatedArray = convertToSeparation(ascii)
    
    // From this array, add up so that there will be blocks with 10 characters
    let firstBlock = charToBlocks(separatedArray)

    // perform the mod10 algorithm
    let sum = mod10(separatedArray, firstBlock)
    return sum
}

function doHash(sum){
    console.log("Started noncing...")
    let nonce = 0
    let hashedSum = hash(sum + nonce)

    checkHash(hashedSum, nonce, sum)
}

function checkHash(hashedSum, nonce, sum) {
    if (hashedSum.substr(0, 4) == '0000'){
        console.log("juiste nonce gevonden: " + nonce)

    axios.post('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
        nonce: nonce,
        user: 'Frank Solleveld'
    }).then(res => {
        if (res.data.message === 'blockchain accepted, user awarded') {
            console.log('Acccepted hash: ', hashedSum)
            console.log('Status: ', res.data.message)
            console.log('Accepted nonce', nonce)
        } else if (res.data.message === 'nonce not correct') {
            console.log('Nonce was: ', nonce)
            console.log("Hashed sum: " + hashedSum)
            console.log(res.data.message)
        } else {
            console.log(res.data.message)

        }
    })
    } else {
        nonce++
        hashedSum = hash(sum + nonce)

        // If you;d just call the function, you would probably get out of memory since there are too much calls going on. Node provides an easy function to limit this.
        return process.nextTick(() => checkHash(hashedSum, nonce, sum), 0)
    }
}

function getPreviousBlock() {
    axios.get('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then(res => {
            let oldBlock = hash(createLastBoxString(res.data))
            let transaction = createTransactionString(oldBlock, res.data)
            doHash(transaction)
        })
        .catch(err => console.log(err))
}

function createLastBoxString(block){
    let s = block.blockchain.hash + 
            block.blockchain.data[0].from + 
            block.blockchain.data[0].to + 
            block.blockchain.data[0].amount + 
            block.blockchain.data[0].timestamp + 
            block.blockchain.timestamp + 
            block.blockchain.nonce
    console.log("Last Box String: " + s)
    return s
}

function createTransactionString(string, block){
    let s = string + 
            block.transactions[0].from + 
            block.transactions[0].to + 
            block.transactions[0].amount + 
            block.transactions[0].timestamp + 
            block.timestamp
    console.log("New Box String: " + s)
    return s
}

(getPreviousBlock())

module.exports = hash