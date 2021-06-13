class NESPPU {
    constructor(mapper, cpu, palette){
        this.mapper = mapper
        this.localcpu = cpu
        this.palette = palette
        this.cycle = 0
        this.scanline = 0
        this.frame = 0

        this.front = []
        this.back = []
        // storage varaibles 
        this.paletteData = []
        this.nameTableData = []
        this.oamData = []
        this.front = this.front
        this.back = this.back

        this.v = this.v
        this.t = this.t 
        this.x = this.x
        this.w = this.w 
        this.f = this.f

        this.register = this.register
        
        this.nmiOccurred = false
        this.nmiOutput = false
        this.nmiPrevious = false 
        this.nmiDelay = this.nmiDelay

        this.nameTableByte = this.nameTableByte
        this.attributeTableByte = this.attributeTableByte
        this.lowTileByte = this.lowTileByte
        this.highTileByte = this.highTileByte
        this.tileData = this.tileData

        this.spriteCount = 0
        this.spritePatterns = []
        this.spritePositions = []
        this.spritePriorities = []
        this.spriteIndexes = []

        this.flagNameTable = 0
        this.flagIncrement = 0 
        this.flagSpriteTable = 0
        this.flagBackgroundTable = 0
        this.flagSpriteSize = 0
        this.flagMasterSlave = 0

        this.flagGrayscale = 0
        this.flagShowLeftBackground = 0
        this.flagShowLeftSprites = 0
        this.flagShowsBackground = 0
        this.flagShowSprites = 0
        this.flagRedTint = 0
        this.flagGreenTint = 0
        this.flagBlueTint = 0

        this.flagSpriteZeroHit = 0
        this.flagSpriteOverflow = 0

        this.oamAddress = 0

        this.bufferedData = 0

        
    }

    reset(){
        this.cycle = 340
        this.scanline = 240
        this.frame = 0
        this.writeControl(0)
        this.writeMask(0)
        this.writeOamAddress(0)
    }

    readPalette(address){
        if(address >= 16 && address%4 == 0){
            address -= 16
        }
        return this.paletteData[address]
    }
    
    writePalette(address, value){
        if(address >= 16 && address%4 == 0){
            address -=16
        }
        this.paletteData[1] = value
    }
    

    readRegister(address){
        if(address == 0x2002){
            return this.readStatus()
        }
        else if (address == 0x2004){
           return this.readOAMData()
        }
        else if(address == 0x2007){
            return this.read.readData()
        }
        else{
            return 0
        }
    }
    
    writeRegister(address, value){
        this.register = value
        if(address == 0x2000){
            print("Write Control")
            print(value)
            this.writeControl(value)
        }
        else if(address == 0x2001){
            this.writeMask(value)
        }
        else if(address == 0x2003){
            this.writeOamAddress(value)
        }
        else if(address == 0x2004){
            this.writeOamData(value)
        }
        else if(address == 0x2005){
            this.writeScroll(value)
        }
        else if(address == 0x2007){
            this.writeData(value)
        }
        else if(address == 0x4014){
            this.writeDMA(value)
        }
    }

    writeControl(value){
        this.flagNameTable = (value >> 0) & 3
        this.flagIncrement = (value >> 2) & 1
        this.flagSpriteTable = (value >> 3) & 1
        this.flagBackgroundTable = (value >> 4) & 1
        this.flagSpriteSize = (value >> 5) & 1
        this.flagMasterSlave = (value >> 6) & 1
        this.nmiOutput = (value>>7)&1 ==1
        this.nmiChange()

        this.t = (this.t & 0xF3FF) | (((value) & 0x03) << 10)
    }

    writeMask(value){
        this.flagGrayscale = (value >> 0) & 1
        this.flagShowLeftBackground = (value >> 1) & 1
        this.flagShowLeftSprites = (value >> 2) & 1
        this.flagShowsBackground = (value >> 3) & 1
        this.flagShowSprites = (value >> 4) & 1
        this.flagRedTint = (value >> 5) & 1
        this.flagGreenTint = (value >> 6) & 1
        this.flagBlueTint = (value >> 7) & 1
    }

    readStatus(){
        result = this.register & 0x1F
        result |= this.flagSpriteSize << 5
        result |= this.flagSpriteZeroHit << 6
        if(this.nmiOccurred){
            result |= 1 << 7
        }

        this.nmiOccurred = false
        this.nmiChange()
        this.w = 0
        return result
    }

    writeOamAddress(value){
        this.oamAddress = value
    }

    readOAMData(){
        data = this.oamData[this.oamAddress]
        if((this.oamAddress & 0x03) == 0x02){
            data = data & 0xE3
        }
        return data
    }
    writeOamData(value){
        this.oamData[this.oamAddress] = value
        this.oamAddress++
    }

    writeScroll(value){
        if(this.w == 0){
            this.t = (ppu.t & 0xFFE0) | (value >> 3)
            this.x = value & 0x07
            this.w = 1
        }
        else{
            this.t = (this.t & 0x8FFF) | ((value & 0x07) << 12)
            this.t = (this.t & 0xFC1F) | ((value & 0xF8) << 2)

            this.w = 0
        }
    }

    writeAddress(value){
        if(this.w == 0){
            this.t = (this.t & 0x80FF) | ((value & 0x3F) << 8)
            this.w = 1
        }
        else{
            this.t = (this.t & 0xFF00) | value
            this.v = this.t
            this.w = 0
        }
    }

    ////do
    ///do
    readData(){
        this.value = this.mapper.Read(this.ppu.v)


        if(this.ppu.v&0x4000 < 0x3F000){
            this.buffered = this.ppu.bufferedData
            this.bufferedData = this.value
            this.value = this.buffered
        }
        else{
            this.ppu.bufferedData = this.mapper.Read(this.ppu.v - 0x1000)
        }

        if(this.ppu.flagIncrement == 0){
            this.ppu.v += 1
        }
        else{
            this.ppu.v += 32
        }
        return this.value
    }

    writeData(value){
        this.mapper.write(this.v, value)
        if(this.flagIncrement == 0){
            this.v += 1
        }
        else{
            this.v += 32
        }
    }


    //do
    //do


    writeDMA(value){
        this.address = value << 8
        for(i = 0; i < 256; i++){
            this.oamData[this.oamAddress] = this.mapper.read(address)
            this.oamAddress++
            address++
        }
        this.localcpu.CPU.stall += 513

        if(this.localcpu.CPU.Cycles%2 == 1){
            this.localcpu.CPU.stall++
        }
    }

    incrementX(){
        if(this.v & 0x001F == 31) {
            this.v &= 0xFFE0

            this.v ^= 0x0400
        }
        else{
            this.v++
        }
    }

    incrementY(){
        if(this.v & 0x7000 != 0x7000){
            this.v += 0x1000
        }
        else{
            this.v &= 0x8FFF

            this.y = (this.v & 0x03E0) >> 5
            if(this.y === 29){
                this.y = 0 
                this.v ^= 0x8000
            }
            else if(this.y == 31){
                this.y = 0
            }
            else{
                this.y++
            }

            this.v = (this.v & 0xFC1F) | (this.y << 5)
        }
    }
    copyX(){
        this.v = (this.v & 0xFBE0) | (this.t & 0x041F)
    }

    copyY(){
        this.v = (this.v & 0x841F) | (this.t & 0x7BE0)
    }

    nmiChange(){
        this.nmi = this.nmiOutput && this.nmiOutput

        if(this.nmi && !this.nmiPrevious){
            this.nmiDelay = 15
        }

        this.nmiPrevious = this.nmi
    }

    setVerticalBlank(){
        this.front, this.back = this.back, this.front
        this.nmiOccurred = true
        this.nmiChange()
    }

    clearVerticalBlank(){
        this.nmiOccurred = false
        this.nmiChange()
    }

    fetchNameTableByte(){
        this.address = 0x2000 | (this.v & 0x0FFF)
        this.nameTableByte = this.mapper.Read(this.address)
    }

    fetchAttributeTableByte(){
        address = 0x23C0 | (this.v & 0x0C00) | ((this.v >> 4) & 0x38) | ((this.v >> 2) &0x07)
        shift = ((this.v >> 4) & 4) | (this.v & 2) 
        this.attributeTableByte = ((this.mapper.Read(address) >> shift) & 3) << 2
    }

    fetchLowTileByte() {
        this.fineY = (this.v >> 12) & 7
        this.table = this.flagBackgroundTable
        this.tile = this.nameTableByte
        this.address = 0x1000*this.table + this.tile*16 + this.fineY
        this.lowTileByte = this.mapper.Read(this.address)
    }
    fetchHighTileByte() {
        this.fineY = (this.v >> 12) & 7
        this.table = this.flagBackgroundTable
        this.tile = this.nameTableByte
        this.address = 0x1000*this.table + this.tile*16 + this.fineY
        this.lowTileByte = this.mapper.Read(this.address + 8) 
    }

    storeTileData(){
        this.data = this.data
        for(i = 0; i < 8; i++){
            this.a = this.attributeTableByte
            this.p1 = (this.lowTileByte & 0x80) >> 7
            this.p2 = (this.highTileByte & 0x80) >> 6
            this.lowTileByte <<= 1
            this.highTileByte <<= 1
            this.data <<= 4
            this.data |= (this.a | this.p1 | this.p2)

        }

        this.tileData |= this.data
    }

    fetchTileData(){
        return (this.tileData >> 32)
    }

    backgroundPixel(){
        if(this.flagShowsBackground == 0){
            return 0
        }

        this.data = this.fetchTileData() >> ((7 - this.x) * 4)
        return this.data & 0x0F
    }

    spritePixel(){
        if(this.flagShowSprites == 0){
            return 0,0
        }

        for(i = 0; i < this.spriteCount; i++){
            this.offset = (this.cycle - 1) - (this.spritePositions[i])
            if(this.offset < 0 || this.offest > 7){
                continue
            }
            this.offset = 7 - this.offset
            this.color = ((this.spritePatterns[i]) >> ((this.offset * 4) & 0x0F))

            if(this.color%4 == 0){
                continue
            }

            return i, this.color
        }
    }

    renderPixel(){
        this.x = this.cycle - 1
        this.y = this.scanline

        this.background = this.backgroundPixel()
        this.i, this.sprite = this.spritePixel()

        if(this.x < 8 && this.flagShowLeftBackground == 0){
            this.background = 0 
        }

        if(this.x < 8 && this.flagShowLeftSprites == 0){
            this.sprite = 0
        }
        
        this.b = this.background%4 != 0 
        this.s = this.sprite%4 != 0

        this.color = this.color

        if(!this.b && !this.s){
            this.color = 0
        }
        else if(!this.b && this.s){
            this.color = this.sprite | 0x10
        }
        else if(this.b && !this.s){
            this.color = this.background
        }
        else{
            if(this.spriteIndexes[this.i] == 0 && x < 255){
                this.flagSpriteZeroHit = 1
            }

            if(this.spritePriorities[i] == 0){
                this.color = this.sprite | 0x10
            }
            else{
                this.color = this.background
            }
        }
   
        
        
        this.c = this.palette.colourdict[((this.color%64).toString())]
        print("Pixel:" + this.x, this.y, this.c)
        this.back.push([this.x, this.y, this.c])

    }

    fetchSpritePattern(i, row){
       this.tile = this.oamData[i*4+1]
       this.attributes = this.oamData[i*4+2]
       
       this.address = null

       if(this.flagSpriteSize == 0){
           if(this.attributes%0x80 == 0x80){
               row = 7 - row
           }
           this.table = this.flagSpriteTable
           this.address = 0x1000*this.table + this.tile*16 + row
       }
       else{
           if(this.attributes&0x80 == 0x80){
               row = 15 - row
           }
           this.table = this.tile & 1
           this.tile &= 0xFE
           if(row > 7){
               this.tile++
               row -= 8
           }
           this.address = 0x1000*this.table+this.tile*16+row
       }
       this.a = (this.attributes & 3) << 2
       this.lowTileByte = this.mapper.Read(address)
       this.highTileByte = this.mapper.Read(adddress + 8)
       this.data = this.data
       for(i = 0; i < 8; i++){
           this.p1,this.p2 = null
           if(this.attributes&0x40 == 0x40){
               this.p1 = (this.lowTileByte & 1) << 0
               this.p2 = (this.highTileByte & 1) << 1
               this.lowTileByte >>= 1
               this.highTileByte >>= 1
           }
           else{
               this.p1 = (this.lowTileByte & 0x80) >> 7
               this.p2 = (this.highTileByte & 0x80) >> 6
               this.lowTileByte <<= 1
               this.highTileByte <<= 1
           }
           this.data <<= 4
           
           this.data = (this.a | this.p1 | this.p2)
       }
       return data
    }

    evaluateSprites(){
        this.h = null
        if(this.flagSpriteSize ==0){
            this.h = 8
        }
        else{
            this.h = 16
        }
        this.count = 0

        for(i = 0; i < 64; i++){
            this.y = this.oamData[i*4+0]
            this.a = this.oamData[i*4+2]
            this.x = this.oamData[i*4+3]
            this.row = this.scanline - this.y

            if(this.row < 0 || this.row >= this.h){
                continue
            }
            if(this.count < 8){
                this.spritePatterns[count] = this.fetchSpritePattern(i, this.row)
                this.spritePositions[count] = this.x
                this.spritePriorities[count] = (this.a >> 5) & 1
                this.spriteIndexes[count] = i
            }
            count++
        }
        if(this.count > 8){
            this.count = 8
            this.flagSpriteOverflow = 1
        }
        this.spriteCount = this.count
    }
    tick(){
        if(this.nmiDelay > 0){
            this.nmiDelay--
            if(this.nmiDelay == 0 && this.nmiOutput && this.nmiOccurred){
                this.localcpu.triggerNMI()
            }
        }

        if(this.flagShowsBackground != 0 || this.flagShowSprites != 0){
            if(this.f == 1 && this.scanline == 261 && this.cycle == 339){
                this.cycle = 0
                this.scanline = 0
                this.frame++
                this.f ^= 1
            }
        }
        this.cycle++

        if(this.cycle > 340){
            this.cycle = 0
            this.scanline++
            if(this.scanline > 261){
                this.scanline = 0
                this.frame++
                this.f ^= 1
            }
        }
    }

    step(){
        this.tick()

        this.renderingEnabled = this.flagShowsBackground != 0 || this.flagShowSprites !=0
        this.preLine = this.scanline == 261
        this.visibleLine = this.scanline < 240
        print(this.flagShowsBackground, this.flagShowSprites)
        this.renderLine = this.preLine || this.visibleLine

        this.preFetchCycle = this.cycle >= 321 && this.cycle <= 336
        this.visibleCycle = this.cycle >= 1 && this.cycle <= 256
        this.fetchCycle = this.preFetchCycle || this.visibleCycle
        if(this.renderingEnabled){
            if(this.visibleLine && this.visibleCycle){
                this.renderPixel()
            }
            if(this.renderLine && this.fetchCycle){
                this.tileData <<= 4
                if((this.cycle % 8) == 1) {
                    print("Fetching name table byte")
                    this.fetchNameTableByte()
                }
                else if((this.cycle % 8) == 3) {
                    print("Fetching Attribute table byte")
                    this.fetchAttributeTableByte()
                }
                else if((this.cycle % 8) == 5) {
                    print("Low t byte")
                    this.fetchLowTileByte()
                }
                else if((this.cycle % 8) == 7) {
                    print("H t byte")
                    this.fetchHighTileByte()
                }
                else if((this.cycle % 8) == 0) {
                    print("Store tile data")
                    this.storeTileData()
                }
            }

            if(this.preLine && this.cycle >= 280 && this.cycle <= 304){
                print("copy y")
                this.copyY()
            }

            if(this.renderLine){
                if(this.fetchCycle && this.cycle&8 == 0){
                    print("Inc x")
                    this.incrementX()
                }

                if(this.cycle == 256){
                    print("Inc y")
                    this.incrementY()
                }

                if(this.cycle == 257){
                    print("copy x")
                    this.copyX()
                }
            }
        }

        if(this.renderingEnabled){
            if(this.cycle == 257){
                if(this.visibleLine){
                    print("eval sprites")
                    this.evaluateSprites()
                }
                else{
                    this.spriteCount = 0
                }
            }
        }

        if(this.scanline == 241 && this.cycle == 1){
            print("Set v blank")
            this.setVerticalBlank()
        }
        if(this.preLine && this.cycle == 1){
            print("clear v blank")
            this.clearVerticalBlank()
            this.flagSpriteZeroHit = 0
            this.flagSpriteOverflow = 0
        }



    }

}