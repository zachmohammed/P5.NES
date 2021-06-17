let graphics;
function preload(){
    var reader = new FileReader();
    rom = loadBytes("sprites.nes");
    
}
function setup() {
    createCanvas(256, 240);

 
}
function get_rom(){
    var fileList = document.getElementById("rom").files;
    var fileReader = new FileReader();
    if (fileReader && fileList && fileList.length) {
        url = URL.createObjectURL(fileList[0])
        return loadBytes(url)
    }
}
function loadarom(){
    
    object = get_rom()
    
    print((object.bytes[1]))
    romfile = LoadNESFile(object)
    print(romfile)
    ram = []
    mapper = new mapperobject1(rom);

    
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
    background(240);
    if(romfile == null){
        
    }
    else{
        step(ppu,cpu)
        
    
        for(i = 0; i < ppu.back.length; i++){
            noStroke()
            fill("#" + ppu.back[i][2])
            rect(ppu.back[i][0],ppu.back[i][1],1,1)
            
        }
    }  
}