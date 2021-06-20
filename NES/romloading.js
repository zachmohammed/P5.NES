function get_rom(onSuccess){
    var fileList = document.getElementById("rom").files;
    if (fileList && fileList.length) {
        return loadBytes(URL.createObjectURL(fileList[0]), onSuccess);
    }
}
function grab_rom_bytes(){
    get_rom(obj => {rom = (obj); loadarom()})
}
function loadarom(){
    
    var textarea = document.getElementById("consolearea");
    textarea.innerHTML = ""
    
    
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