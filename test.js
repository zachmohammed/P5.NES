let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("pong1.nes");
    
}
function setup() {
    createCanvas(400, 400);

    romfile = LoadNESFile(rom)
    
    ram = []
    mapper = new mapperobject1(romfile);

    
    ppu = new NESPPU(null, null, new paletteTable())
    cpumem = new cpumemory(ram, mapper, ppu)
    cpu = new NESCPU(cpumem)
    ppu.localcpu = this.cpu
    ppu.mapper = new ppumemory(mapper, romfile, ppu)
    cpu.reset()
    ppu.reset()

}

function step(ppu, cpu){
    cpuCycles = this.cpu.step()
    ppuCycles = cpuCycles * 3
    for(i = 0; i< ppuCycles; i++){
       this.ppu.step()

    }

    return cpuCycles
}
  
function draw() {
    //step(ppu,cpu)
    background(220);
    noStroke()
    
    
}