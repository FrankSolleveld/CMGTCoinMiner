const convertToSeparation = (ascii) => {
    let separatedArray = []
    for(let char of ascii){
        // .spit actually transforms the characters as separate numbers --> 123 becomes 1 2 3
        let splittedChar = char.toString().split("")
        for (let arrayNumber of splittedChar){
            // This pushes the numbers in splittedChar into the separate Array as follows: 1, 2, 3
            separatedArray.push(parseInt(arrayNumber))
        }
    }
    return separatedArray
}

module.exports = convertToSeparation