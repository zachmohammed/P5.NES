let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("Donkey Kong.nes");
    
}
function setup() {
    createCanvas(400, 400);

    romfile = LoadNESFile(rom)
    ram = []
    
    mappertest = new mapperobject1(romfile);
    palette = new paletteTable()
    memory = new cpumemory(ram, mappertest)

    cpu = new NESCPU(memory)
    ppu = new NESPPU(mappertest, cpu, palette)
    cpu.reset()
}
  
function draw() {
    //cpu.step()
    background(220);
    noStroke()
    
    
}