let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("Donkey Kong.nes");
    
}
function setup() {
    createCanvas(400, 400);

    romfile = LoadNESFile(rom)

    
    mappertest = new mapperobject1(romfile);
    palette = new paletteTable()
    cpu = new NESCPU(mappertest)
    ppu = new NESPPU(mappertest, cpu, palette)
}
  
function draw() {
    cpu.step()
    background(220);
    noStroke()
    
    
}