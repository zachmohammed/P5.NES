class nesconsole{

	constructor(mapper){
            //this.romfile = romfile
            //this.ram = []
            //this.mapper = mapper
            //this.ppu = new NESPPU(null, null, new paletteTable())
            //this.cpumem = new cpumemory(this.ram, this.mapper, this.ppu)
            this.cpu = new NESCPU(mapper)
            //this.ppu.localcpu = this.cpu
            //this.ppu.mapper = null
            //this.cpu.reset()

        }

    }