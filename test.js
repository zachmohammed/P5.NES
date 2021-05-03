let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("Super Mario Bros.nes");
    
}
function setup() {
    createCanvas(400, 400);

    romfile = LoadNESFile(rom)

    
    mappertest = new mapperobject1(romfile);
    cpu = new NESCPU(mappertest)
}
  
function draw() {
    
    background(220);
    noStroke()
    
    
}