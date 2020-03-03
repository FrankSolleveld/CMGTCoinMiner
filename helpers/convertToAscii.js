// Pure function: always returns the same result with given parameters

const convertToAscii = (string) => {
    let ascii = []
    string = string.replace(/\s/g, '')
    let splittedText = string.split("")
    ascii = splittedText.map((char) => {
        return !isNaN(parseInt(char)) ? char : char.charCodeAt(0) 
    })
    return ascii
}

module.exports = convertToAscii