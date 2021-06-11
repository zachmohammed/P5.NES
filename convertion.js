function tobinary(hex){
    result = ""
    for(let i = 0; i < hex.length; i++){
        tempbin = parseInt(hex[i], 16).toString(2)
        result += "0000".substr(tempbin.length) + tempbin
    }
    return result
}

function tohex(hex){
    hex = hex(hex).slice(6)
    return hex
}