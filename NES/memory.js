

class cpumemory{
    constructor(ram, mapper){
        this.ram = ram
        this.mapper = mapper
    }

    Read(address){
        if(address < 0x2000){
            return this.ram[address%0x0800]
        }
        else if(address < 0x4000){

        }
        else if(address < 0x4015){

        }
        else if(address < 0x4016){

        }
        else if(address < 0x4017){

        }
        else if(address >= 0x6000){
            return this.mapper.Read(address)
        }
        
    }
    
    Write(address, value){
        if(address < 0x2000){
            this.ram[address%0x0800] = value
        }
        else if(address < 0x4000){

        }
        else if(address < 0x4015){

        }
        else if(address < 0x4016){

        }
        else if(address < 0x4017){

        }
        else if(address < 0x6000){
            this.mapper.Write(address,value)
        }
    }
    
    

}
