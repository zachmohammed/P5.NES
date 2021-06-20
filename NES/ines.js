

const iNESFileMagic = 0x4E45531a


function iNESFileHeader(Magic, NumPRG, NumCHR, Control1, Control2, NumRAM){
    this.Magic = Magic;
    this.NumPRG = NumPRG;
    this.NumCHR = NumCHR;
    this.Control1 = Control1;
    this.Control2 = Control2;
    this.NumRAM = NumRAM;
}

function NewCartridge(prg, chr, mapper,mirror,battery){
    this.prg = prg;
    this.chr = chr;
    this.sram = [];
    this.mapper = mapper;
    this.mirror = mirror;
    this.battery = battery;
}

function LoadNESFile(romdata){
    header = new iNESFileHeader();
    header.Magic = GetHex(0, 3, romdata);
    header.NumPRG = GetHex(4, 4, romdata);
    header.NumCHR = GetHex(5, 5, romdata);
    header.Control1 = GetHex(6, 6, romdata);
    header.Control2 = GetHex(7, 7, romdata);
    header.NumRAM = GetHex(8, 8, romdata);

    mapper1 = header.Control1 >> 4;
    mapper2 = header.Control2 >> 4;
    mapper = (mapper1 | mapper2<<4)

    mirror1 = header.Control1 & 1
    mirror2 = (header.Control1 >> 3) & 1
    mirror = mirror1 | mirror2<<1

    battery =(header.Control1 >> 1) & 1
    currentlocation = 16

    prg_length = header.NumPRG * 16384
    chr_length = header.NumCHR * 8192
    
    prg = bytearray(GetHex(currentlocation,currentlocation + prg_length,romdata))

    currentlocation += prg_length

    chr = bytearray(GetHex(currentlocation,currentlocation + chr_length - 1,romdata))
    
    return new NewCartridge(prg,chr,mapper,mirror,battery)
}

function GetHex(start, stop, rom){
    result = '';
    for(let i = start; i < stop + 1; i++){
        temprom = rom.bytes[i].toString(16)
        result += "00".substr(temprom.length) + temprom
    }
    return result
}