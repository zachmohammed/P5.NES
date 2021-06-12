let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("Donkey Kong.nes");
    
}
function setup() {
    createCanvas(400, 400);

    romfile = LoadNESFile(rom)
    
    ram = []
    mapper = new mapperobject1(romfile);

    
    ppu = new NESPPU(null, null, new paletteTable())
    cpumem = new cpumemory(ram, mapper, ppu)
    cpu = new NESCPU(cpumem)
    ppumem = new ppumemory(mapper, romfile, ppu)
    ppu.localcpu = this.cpu
    ppu.mapper = ppumem
    cpu.reset()
}
  
function draw() {
    //cpu.step()
    background(220);
    noStroke()
    
    
}