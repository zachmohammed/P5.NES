function loadbin(databytes){
    graphics = databytes;
    let hexdata = [];
    let tempstring = "";
    for (let i = 0; i < 8192; i++) {
        loadedbyte = graphics.bytes[i].toString(16)

        if(loadedbyte.length == 1){
            tempstring += "0" + loadedbyte;
        }
        else{
            tempstring += loadedbyte
        }
        if(tempstring.length == 32){
            append(hexdata,tempstring)
            tempstring = "";
        } 
    }
    return hexdata
}

function grabimagedata(string1, string2){
    imageresult = []
    for(let i = 0; i < 8; i++){
        colorline = []
        for(let j = 0; j < 8; j++){
            colorresult = 0;
            if(string1[(i * 8) + j] == 0 && string2[(i * 8) + j] == 0){
                colorresult = 0
            }
            else if(string1[(i * 8) + j] == 1 && string2[(i * 8) + j] == 0){
                colorresult = 1
            }
            else if(string1[(i * 8) + j] == 0 && string2[(i * 8) + j] ==1){
                colorresult = 2
            }
            else{
                colorresult = 3
            }
            append(colorline, colorresult)
        }
        append(imageresult, colorline)
    }
    return correcttile(imageresult)
}

function correcttile(array){
    return rotateit(3,array).reverse()
}

function rotateit(amount, array){
    rotatedarray = array
    for(let i = 0; i < amount; i++){
        rotatedarray = rotaterarray(rotatedarray)

    }
    return rotatedarray;
}

function rotaterarray(matrix) {
    let result = [];
    for(let i = 0; i < matrix[0].length; i++) {
        let row = matrix.map(e => e[i]).reverse();
        result.push(row);
    }
    return result;
};

function splitstring(string){
    splitstringresult = []
    append(splitstringresult, string.slice(0,string.length/2))
    append(splitstringresult,string.slice(string.length/2, string.length))
    return splitstringresult
}

function creategraphic(graphicsdata, location){
    imagedata = loadbin(graphicsdata)

    datastring = tobinary(imagedata[location])

    splittedstring = splitstring(datastring)

    dataarray = (grabimagedata(splittedstring[0],splittedstring[1]))
}

function drawspritedata(dataarray){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(dataarray[i][j] != 0){
                if(dataarray[i][j] == 1){
                    fill(204,69,50)
                    
                    rect(i*4,j* 4,4,4)
                }
                else if(dataarray[i][j] == 2){
                    fill(245,176,73)
                    rect(i* 4,j * 4,4,4)
                }
                if(dataarray[i][j] == 3){
                    
                    fill(100,100,38)
                    rect(i * 4,j * 4,4,4)
                }
            }
            
        }
    }
}
