const charToBlocks = (separatedArray) => {

    const fillables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Spread Operator: actually checks inside the array with the numbers.
    separatedArray.push(... fillables.slice(0, (10 - (separatedArray.length % 10))))
    
    let firstBlock = separatedArray.splice(0, 10)
    return firstBlock
}

module.exports = charToBlocks