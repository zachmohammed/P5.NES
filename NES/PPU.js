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

    }

    readPalette(address){
        if(this.address >= 16 && this.address%4 == 0){
            address -= 16
        }
        return this.paletteData[address]
    }
    
    writePalette(address){
        if(address == 0x2002){
            //read status
        }
        else if (address == 0x2004){
            //read oamdata
        }
        else if(address == 0x2007){
            //read data
        }
        else{
            return 0
        }
    }

    //add write register

    writeControl(value){
        this.flagNameTable = (value >> 0) & 3
        this.flagIncrement = (value >> 2) & 1
        this.flagSpriteTable = (value >> 3) & 1
        this.flagBackgroundTable = (value >> 4) & 1
        this.flagSpriteSize = (value >> 5) & 1
        this.flagMasterSlave = (value >> 6) & 1
        this.nmiOutput = (value>>7)&1 ==1
        //this.PPU.nmichange()

        this.t = (this.t & 0xF3FF) | (((value) & 0x03) << 10)
    }

    writeMask(value){
        //todo
    }

    readStatus(){
        result = this.register & 0x1F
        result |= this.flagSpriteSize << 5
        result |= this.flagSpriteZeroHit << 6
        if(this.nmiOccurred){
            result |= 1 << 7
        }

        this.nmiOccurred = false
        //this.PPU.nmiChange()
        this.w = 0
        return result
    }

    readOAMData(){
        return this.oamData[this.oamAddress]
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
        value = this.read
    }

    writeData(){


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
        address = 0x2000 | (this.v & 0x0FFF)
        this.nameTableByte = this.mapper.Read(address)
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
        this.x = this.Cycle - 1
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
        this.back.push([this.x, this.y, this.cs])

    }

    fetchSpritePattern(i, row){
        
    }

}