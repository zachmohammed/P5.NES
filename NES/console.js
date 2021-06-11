class nesconsole{

	constructor(romfile){
            this.romfile = romfile
            this.ram = []
            this.mapper = new mapperobject1(romfile);
            this.ppu = ppu
            this.cpu = cpu
            this.cpumemory = this.cpumemory(this.ram, this.mapper, this.ppu)
            this.

        }

    }