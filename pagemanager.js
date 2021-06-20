function display_cpu_flags(){
    cpuflags = cpu.CPU
    document.getElementById("cpuflags").innerHTML = "Cycles: " + cpuflags.Cycles + " <br> PC: " + cpuflags.PC + " <br> A: " + cpuflags.A + " <br> X: " + cpuflags.X + " <br> Y:" + cpuflags.Y + " <br> C: " + cpuflags.C + " <br> Z:" + cpuflags.Z + " <br> I: " + cpuflags.I + " <br> D: " + cpuflags.D + " <br> B:" + cpuflags.B + " <br> U:" + cpuflags.U + " <br> V:" + cpuflags.V + " <br> N: " + cpuflags.N 

}

function change_pop_up(in_name){
    header = in_name;
    body = "";
    
    switch(in_name){
        case "STA":
            body = "This is used to store whatever is currently stored in the accumulator (A) into the desired memory location"
            break
        case "STX":
            body = "This is used to store whatever is currently stored in the X index register into the desired memory location"
            break
        case "STY":
            body = "This is used to store whatever is currently stored in the Y index register into the desired memory location"
            break
        case "LDA":
            body = "This is used to load a any value (can be a exisiting value stored or a new value) into the accumulator (A)"
            break
        case "LDX":
            body = "This is used to load a any value (can be a exisiting value stored or a new value) into the X index register"
            break
        case "LDY":
            body = "This is used to load a any value (can be a exisiting value stored or a new value) into the Y index register"
            break
        case "INX":
            body = "This is used to increment the X index register by 1"
            break
        case "INY":
            body = "This is used to increment the Y index register by 1"
            break
        case "TAX":
            body = "This is used to transfer the accumulator (A) into the X index register"
            break
        case "TAY":
            body = "This is used to transfer the accumulator (A) into the Y index register"
            break
        case "DEX":
            body = "This is used to decrement the X index register by 1"
            break
        case "DEY":
            body = "This is used to decrement the Y index register by 1"
            break
        case "CMP":
            body = "This is used to compare the accumulator (A) to a desired value"
            break
        case "CPX":
            body = "This is used to compare the X index register to a desired value"
            break
        case "CPY":
            body = "This is used to compare the Y index register to a desired value"
            break
        case "JMP":
            body = "This is used to jump to a specified memory location"
            break
        case "BEQ":
            body = "This is used to branch to a memory location if a previous CMP instruction is true"
            break
        case "BNE":
            body = "This is used to branch to a memory location if a previous CMP instruction is false"
            break
    }
    document.getElementById("popup-body").innerHTML = body
    document.getElementById("popup-header").innerHTML = header
    
}