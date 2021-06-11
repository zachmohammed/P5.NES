let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("Donkey Kong.nes");
    
}
function setup() {
    createCanvas(400, 400);

    romfile = LoadNESFile(rom)
    
    
    //mappertest = new mapperobject1(romfile);
    palette = new paletteTable()
    console = new nesconsole(romfile)
    ppu = new NESPPU(mappertest, cpu, palette)
    memory = new cpumemory(ram, mappertest, ppu)

    cpu = new NESCPU(memory)
    
    cpu.reset()
}
  
function draw() {
    //cpu.step()
    background(220);
    noStroke()
    
    
}