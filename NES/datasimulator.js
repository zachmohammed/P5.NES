function bytearray(toconvert){
    returnarray = [];
    for(var i = 0, charsLength = toconvert.length; i < charsLength; i+=2){
        returnarray.push("0x" + toconvert.substring(i, i+2));
    }

    return returnarray;
}

function convertbyte(toconvert){
    return "0x" + (toconvert)
}
function stepInfo(address,pc, mode){
    this.address = address;
    this.pc = pc;
    this.mode = mode;
}