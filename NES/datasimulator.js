function bytearray(toconvert){
    returnarray = [];
    for(i =0; i < toconvert.length/2;i++){
        returnarray.push("0x" +toconvert[i] + toconvert[i+1]);
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