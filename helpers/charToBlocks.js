const charToBlocks = (separatedArray) => {
    var s = separatedArray.length % 10
    var restNumber = 10 - s
    for (i=0; i < restNumber; i++){
        separatedArray.push(i)
    }
    var firstBlock = separatedArray.splice(0, 10)
    return firstBlock
}

module.exports = charToBlocks