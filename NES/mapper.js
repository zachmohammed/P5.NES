

class mapperobject1{
    constructor(romfile){
        this.prgBanks = round(((romfile.prg).length) / 0x4000)
        this.prgBank1 = 0
        this.prgBank2 = this.prgBanks - 1
        this.romfile = romfile
    }
    
    
    
    Read(readaddress){
        if(readaddress < 0x2000){
            return parseInt(this.romfile.chr[readaddress])
        }
        else if(readaddress >= 0xC000){
            this.index = this.prgBank2*0x4000 + (readaddress-0xC000)
            return parseInt(this.romfile.prg[this.index])
        }
    
        else if(readaddress >= 0x8000){
            this.index = this.prgBank1*0x4000 + (readaddress-0x8000)
            return parseInt(this.romfile.prg[this.index])
        }
        else if(readaddress >= 0x6000){
            this.index = readaddress - 0x6000
            return parseInt(this.romfile.sram[this.index])
        }
        else{
            alert("Fail reading at " + readaddress)
        }
    }
    
    Write(address, value){
        this.hexvalue = convertbyte(value)

        if(address < 0x2000){
            this.romfile.chr[address] = this.hexvalue
        }
        else if(address >= 0x8000){
            this.prgBank1 = value % mapper.prgBanks
        }
        else if(address >= 0x6000){
            this.index = address - 0x6000
            this.romfile.sram[index] = this.hexvalue
        }
        else{
            print("Fail writing at: " + this.address)
        }
    }
}
