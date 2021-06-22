let graphics;
function preload(){
    var reader = new FileReader();
    rom = null
    paused = false
}
function setup() {
    var canva = createCanvas(256, 240);
    canva.parent("emu")
    document.getElementById("cpuflags").innerHTML = "Cycles: " + "0" + " <br> PC: " + "0" + " <br> A: " + "0" + " <br> X: " + "0"+ " <br> Y:" + "0" + " <br> C: " + "0" + " <br> Z:" + "0" + " <br> I: " + "0"+ " <br> D: " + " <br> B:" + "0" + " <br> U:" + "0" + " <br> V:" + "0"+ " <br> N: " + "0"
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
    if(rom == null){
        
    }
    else{
        if(paused == false){
            step(ppu,cpu)
            for(i = 0; i < ppu.back.length; i++){
                noStroke()
                fill("#" + ppu.back[i][2])
                rect(ppu.back[i][0],ppu.back[i][1],1,1)
                
            }
        } 
    }  
}