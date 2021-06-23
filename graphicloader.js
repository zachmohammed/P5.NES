function loadbin(databytes){
    graphics = databytes;
    tempstring = ""
    hexdata = []
    for(let i = 0; i < 8192; i++){
        tempstring += tobinary(hex(parseInt(romfile.chr[i])).slice(6))
        if(tempstring.length == 128){
            hexdata.push(tempstring)
            tempstring = ""
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

function creategraphic(graphicsdata, location, x, y){
    imagedata = loadbin(graphicsdata)
    datastring = splitstring(imagedata[location])
    drawspritedata(grabimagedata(datastring[0], datastring[1]), x, y)

}

function drawspritedata(dataarray, x, y){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(dataarray[i][j] != 0){
                pg.noStroke()
                if(dataarray[i][j] == 1){
                    pg.fill(204,69,50)
                    
                    pg.rect(i*1 + x,j* 1 + y,1,1)
                }
                else if(dataarray[i][j] == 2){
                    pg.fill(245,176,73)
                    pg.rect(i* 1 + x,j * 1+ y,1,1)
                }
                if(dataarray[i][j] == 3){
                    
                    pg.fill(100,100,38)
                    pg.rect(i * 1 + x,j * 1 + y,1,1)
                }
            }
            
        }
    }
}
