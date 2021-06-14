

class cpumemory{
    constructor(ram, mapper, ppu){
        this.ram = ram
        this.mapper = mapper
        this.ppu = ppu
    }

    Read(address){
        if(address < 0x2000){
            //print("Reading RAM")
            return this.ram[address%0x0800]
        }
        else if(address < 0x4000){
            return this.ppu.readRegister(0x2000 + address%8)
        }
        else if(address == 0x4014){
            return this.ppu.readRegister(address)
        }
        else if(address < 0x4015){
            //print("APU")
        }
        else if(address < 0x4016){
            //print("Cpntroler 1")
        }
        else if(address < 0x4017){
            //print("Controler 2")
        }
        else if(address >= 0x6000){
            return this.mapper.Read(address)
        }
        
    }
    
    Write(address, value){
        if(address < 0x2000){
           // print("Storing in RAM")
            this.ram[address%0x0800] = value
        }
        else if(address < 0x4000){
            //print("Writing to PPU")
            this.ppu.writeRegister(0x2000+address%8, value)
        }
        else if(address < 0x4014){
            //print("APU ")
        }
        else if(address == 0x4014){
            this.ppu.writeRegister(address, value)
        }
        else if(address < 0x4015){
            //print("APU")
        }
        else if(address < 0x4016){
            //print("Controler")
        }
        else if(address == 0x4017){
           // print("APU")
        }
        else if(address < 0x6000){
            
        }
        else if(address >= 0x6000){
            this.mapper.Write(address,value)
        }
    }
    
    

}

class ppumemory{
    constructor(mapper, romfile, ppu){
        this.mapper = mapper
        this.romfile = romfile
        this.ppu = ppu
        this.MirrorHoriziontal = 0
        this.MirrorVertical = 1
        this.MirrorSingle0 = 2
        this.MirrorSingle1 = 3
        this.MirrorFour = 4

        this.MirrorLookup = [[0,0,1,1],[0,1,0,1],[0,0,0,0],[0,1,2,3]]

    }

    Read(address){
        if(address < 0x2000){
            return this.mapper.Read(address)
        }
        else if(address < 0x3F00){
            this.mode = this.romfile.mirror
            return this.ppu.nameTableData[this.MirrorAddress(this.mode, address)%0x2048]
        }
        else if(address < 0x4000){
            //print("pallete: " +this.ppu.readPalette(address % 32))
            return this.ppu.readPalette(address % 32)
        }
    }
    
    Write(address, value){
        address = address % 0x4000
        if(address < 0x2000){
            this.mapper.Write(address, value)
        }
        else if(address <0x3F00){
            this.mode = this.romfile.mirror
            this.ppu.nameTableData[this.MirrorAddress(this.mode, address)%2048] = value
        }
        else if(address < 0x4000){
            this.ppu.writePalette(address%32, value)
        }
        else{
            print("Failed writing at: " + address, value)
        }
    }

    MirrorAddress(mode, address){
        this.address = (address - 0x2000) % 0x1000
        this.table = this.address / 0x0400
        this.offset = this.address % 0x0400

        return 0x2000 + this.MirrorLookup[mode][this.table]*0x4000 + this.offset
    }
    
    

}
