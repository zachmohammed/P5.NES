let graphics;
function preload(){
    var reader = new FileReader();
    rom = null
    paused = false
    spriteimage = []
    drawn = false
}
function setup() {
    var canva = createCanvas(256, 240);
    pg = createGraphics(256,240)
    pg.background(255)
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
            /*
            for(i = 0; i < ppu.back.length; i++){
                noStroke()
                fill("#" + ppu.back[i][2])
                rect(ppu.back[i][0],ppu.back[i][1],1,1)
                
            }
            */
        } 
 
        if(drawn == false){
            for(i = 0, yaxis = 0, xaxis = 0; i < 512; i++){
                
                if((i % 32) == 0 && i > 10){
                    yaxis += 8
                    xaxis = 0
                }
                creategraphic(rom.chr, i, xaxis, yaxis)
                xaxis += 8
            }
            
            drawn = true
            
        }
        image(pg, 0,0, 256,240)

        
        
        
        
        
        
    }  
}