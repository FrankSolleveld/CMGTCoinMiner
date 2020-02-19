const convertToSeparation = (ascii) => {
    let separatedArray = []
    for(let char of ascii){
        let splittedChar = char.toString().split("")
        for (let arrayNumber of splittedChar){
            separatedArray.push(parseInt(arrayNumber))
        }
    }
    return separatedArray
}

module.exports = convertToSeparation