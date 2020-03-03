const crypto = require("crypto")

const mod10 = (separatedArray, sum) => {
    if(separatedArray.length === 0){
        sum = sum.toString().replace(/,/g,'')
        return crypto.createHash('sha256').update(sum).digest('hex')
    }
    let nextBlock = separatedArray.splice(0, 10)
    return mod10(separatedArray, calculate(sum, nextBlock))
}

function calculate(x, y){
    let newArray = []
    for(i=0 ;i<10; i++){
        newArray.push((x[i] + y[i]) % 10)
    }
    return newArray
}

module.exports = mod10