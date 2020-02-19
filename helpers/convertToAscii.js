const convertToAscii = (string) => {
    let ascii = []
    string = string.replace(/\s/g, '')
    var splittedText = string.split("")
    for(let char of splittedText){
        if(!isNaN(parseInt(char))){
            ascii.push(char)
        } else {
            ascii.push(char.charCodeAt(0))  
        }    
    } 
    return ascii
}

module.exports = convertToAscii