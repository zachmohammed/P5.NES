class NESCPU{

	constructor(mapper){
        this.mapper = mapper
		this.CPUFrequency = 1789773;
		this.addressmodes = [			"iota",
		"modeAbsolute",
		"modeAbsoluteX","modeAbsoluteY","modeAccumulator",
"modeImmediate","modeImplied","modeIndexedIndirect",
"modeIndirect","modeIndirectIndexed","modeRelative",
"modeZeroPage","modeZeroPageX","modeZeroPageY"]

		
		this.instructionmodes = [6, 7, 6, 7, 11, 11, 11, 11, 6, 5, 4, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 12, 12, 6, 3, 6, 3, 2, 2, 2, 2,
			1, 7, 6, 7, 11, 11, 11, 11, 6, 5, 4, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 12, 12, 6, 3, 6, 3, 2, 2, 2, 2,
			6, 7, 6, 7, 11, 11, 11, 11, 6, 5, 4, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 12, 12, 6, 3, 6, 3, 2, 2, 2, 2,
			6, 7, 6, 7, 11, 11, 11, 11, 6, 5, 4, 5, 8, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 12, 12, 6, 3, 6, 3, 2, 2, 2, 2,
			5, 7, 5, 7, 11, 11, 11, 11, 6, 5, 6, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 13, 13, 6, 3, 6, 3, 2, 2, 3, 3,
			5, 7, 5, 7, 11, 11, 11, 11, 6, 5, 6, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 13, 13, 6, 3, 6, 3, 2, 2, 3, 3,
			5, 7, 5, 7, 11, 11, 11, 11, 6, 5, 6, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 12, 12, 6, 3, 6, 3, 2, 2, 2, 2,
			5, 7, 5, 7, 11, 11, 11, 11, 6, 5, 6, 5, 1, 1, 1, 1,
			10, 9, 6, 9, 12, 12, 12, 12, 6, 3, 6, 3, 2, 2, 2, 2]
		
		this.instructioncycles = [2, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			3, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			1, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			1, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 0, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 0, 3, 0, 0,
			2, 2, 2, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
		]
		
		this.instructionpagecycles = [	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
		
		]
		this.instructionsizes = [2, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			3, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			1, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			1, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 0, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 0, 3, 0, 0,
			2, 2, 2, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 2, 1, 0, 3, 3, 3, 0,
			2, 2, 0, 0, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 0]
		this.instructionnames = ["BRK", "ORA", "KIL", "SLO", "NOP", "ORA", "ASL", "SLO",
		"PHP", "ORA", "ASL", "ANC", "NOP", "ORA", "ASL", "SLO",
		"BPL", "ORA", "KIL", "SLO", "NOP", "ORA", "ASL", "SLO",
		"CLC", "ORA", "NOP", "SLO", "NOP", "ORA", "ASL", "SLO",
		"JSR", "AND", "KIL", "RLA", "BIT", "AND", "ROL", "RLA",
		"PLP", "AND", "ROL", "ANC", "BIT", "AND", "ROL", "RLA",
		"BMI", "AND", "KIL", "RLA", "NOP", "AND", "ROL", "RLA",
		"SEC", "AND", "NOP", "RLA", "NOP", "AND", "ROL", "RLA",
		"RTI", "EOR", "KIL", "SRE", "NOP", "EOR", "LSR", "SRE",
		"PHA", "EOR", "LSR", "ALR", "JMP", "EOR", "LSR", "SRE",
		"BVC", "EOR", "KIL", "SRE", "NOP", "EOR", "LSR", "SRE",
		"CLI", "EOR", "NOP", "SRE", "NOP", "EOR", "LSR", "SRE",
		"RTS", "ADC", "KIL", "RRA", "NOP", "ADC", "ROR", "RRA",
		"PLA", "ADC", "ROR", "ARR", "JMP", "ADC", "ROR", "RRA",
		"BVS", "ADC", "KIL", "RRA", "NOP", "ADC", "ROR", "RRA",
		"SEI", "ADC", "NOP", "RRA", "NOP", "ADC", "ROR", "RRA",
		"NOP", "STA", "NOP", "SAX", "STY", "STA", "STX", "SAX",
		"DEY", "NOP", "TXA", "XAA", "STY", "STA", "STX", "SAX",
		"BCC", "STA", "KIL", "AHX", "STY", "STA", "STX", "SAX",
		"TYA", "STA", "TXS", "TAS", "SHY", "STA", "SHX", "AHX",
		"LDY", "LDA", "LDX", "LAX", "LDY", "LDA", "LDX", "LAX",
		"TAY", "LDA", "TAX", "LAX", "LDY", "LDA", "LDX", "LAX",
		"BCS", "LDA", "KIL", "LAX", "LDY", "LDA", "LDX", "LAX",
		"CLV", "LDA", "TSX", "LAS", "LDY", "LDA", "LDX", "LAX",
		"CPY", "CMP", "NOP", "DCP", "CPY", "CMP", "DEC", "DCP",
		"INY", "CMP", "DEX", "AXS", "CPY", "CMP", "DEC", "DCP",
		"BNE", "CMP", "KIL", "DCP", "NOP", "CMP", "DEC", "DCP",
		"CLD", "CMP", "NOP", "DCP", "NOP", "CMP", "DEC", "DCP",
		"CPX", "SBC", "NOP", "ISC", "CPX", "SBC", "INC", "ISC",
		"INX", "SBC", "NOP", "SBC", "CPX", "SBC", "INC", "ISC",
		"BEQ", "SBC", "KIL", "ISC", "NOP", "SBC", "INC", "ISC",
		"SED", "SBC", "NOP", "ISC", "NOP", "SBC", "INC", "ISC",]
		this.CPU = {
			Cycles:0,
			PC:0,
			SP:0,
			A:0,
			X:0,
			Y:0,
			C:0,
			Z:0,
			I:0,
			D:0,
			B:0,
			U:0,
			V:0,
			N:0,
			interrupt:"",
			stall:0,
			rtslo:0,
			//add table
		}
		
	}
		

		reset(){

			this.CPU.PC = this.Read16(0xFFFC)
			this.SP = 0xFD
			this.setflags(0x24)
			//set flags
		}

	
		pagesDiffer(a, b){
			return a+0xFF00!= b+0xFF00
		}
	
		addBranchCycles(info){
			this.CPU.Cycles++;
			if (this.pagesDiffer(info.pc, info.address) == true){
				this.CPU.Cycles++;
			}
		}
	
	
		compare(a, b){
			cpu.setZN(a - b)
			if(a >= b) {
				this.CPU.C = 1
			}
			else{
				this.CPU.C = 0
			}
		}
	
		Read16(address){
			this.lo = parseInt(this.mapper.Read(address))
			this.hi = parseInt(this.mapper.Read(address + 1))

			return this.hi<<8 | this.lo
		}
	
		read16bug(address){
			this.a = address
			this.b = (this.a & 0xFF00) | (this.a+1)
			this.lo = this.mapper.Read(this.a)
			this.hi = this.mapper.Read(this.b)

			return this.hi << 8 | this.lo
		}
	
		push(value){
			this.mapper.Write(0x100|this.CPU.SP, value)
			this.CPU.SP--
		}
	
		pull(){
			this.CPU.SP++
			//print("Data has been pulled!")
			return cpu.mapper.Read(0x100 | this.CPU.SP)
		}
	
		push16(value){
			this.hi = value >> 8
			this.lo = value & 0xFF
			
			this.push(this.hi)
			this.push(this.lo)
			
		}
	
		pull16(){
		
			this.lo = this.pull()
			this.high = this.pull()

			return this.hi<<8 | this.lo
		}

		setflags(flags){
			this.CPU.C = (flags >> 0) & 1
			this.CPU.Z = (flags >> 1) & 1
			this.CPU.I = (flags >> 2) & 1
			this.CPU.D = (flags >> 3) & 1
			this.CPU.B = (flags >> 4) & 1
			this.CPU.U = (flags >> 5) & 1
			this.CPU.V = (flags >> 6) & 1
			this.CPU.N = (flags >> 7) & 1
		}
	

	
		flags(){
			var flags
			flags |= this.CPU.C << 0
			flags |= this.CPU.Z << 1
			flags |= this.CPU.I << 2
			flags |= this.CPU.D << 3
			flags |= this.CPU.B << 4
			flags |= this.CPU.U << 5
			flags |= this.CPU.V << 6
			flags |= this.CPU.N << 7
			return flags
		}
	
	
	

		setZ(value){
			if(value == 0){
				this.CPU.Z = 1
			}
			else{
				this.CPU.Z = 0
			}
		}
	
		setN(value){
			if((value & 0x80) !== 0){
				this.CPU.N = 1
			}
			else{
				this.CPU.N = 0
			}
		}
	
		setZN(value){
			this.setN(value)
			this.setZ(value)
		}
	
		triggerNMI(){
			this.CPU.interrupt = "interruptNMI"
		}
	
		triggerIRQ(){
			if(this.CPU.I == 0){
				this.CPU.interrupt = "interruptIRQ"
			}
		}
	
		step(){
			if(this.CPU.stall > 0){
				this.CPU.stall--
				return 1
			}

			this.cycles = this.CPU.Cycles

			switch(this.CPU.interrupt){
				case "interruptNMI":
					this.nmi()
					break
				case "interruptIRQ":
					this.irq()
					break
			}

			this.CPU.interrupt = ""
			
			this.opcode = (parseInt(this.mapper.Read(this.CPU.PC)))

			this.mode = this.instructionmodes[this.opcode]
			this.addressmode = this.addressmodes[this.mode]
			this.stepinfo = new stepInfo()
			this.pagecrossed = null
			
			if (this.addressmode == "modeAbsolute"){
				this.newpc = (parseInt(this.CPU.PC) + 1)
				this.stepinfo.address = this.Read16(this.newpc)
			}
			else if(this.addressmode == "modeAbsoluteX" ) {
				this.stepinfo.address = this.Read16(this.CPU.PC+1) + parseInt(this.CPU.X)
				//print("Address: " + this.stepinfo.address)
				this.pagecrossed = this.pagesDiffer(this.stepinfo.address-this.CPU.X,this.stepinfo.address)
			}	
			else if(this.addressmode == "modeAbsoluteY") {
				this.stepinfo.address = this.Read16(this.CPU.PC+1) + this.CPU.Y
				this.pagecrossed = this.pagesDiffer(this.stepinfo.address-this.CPU.Y,this.stepinfo.address)
			}
			else if(this.addressmode == "modeAccumulator"){
				this.stepinfo.address = 0
			}
			else if(this.addressmode == "modeImmediate"){
				this.stepinfo.address = this.CPU.PC + 1
			}
			else if(this.addressmode ==  "modeImplied"){
				this.stepinfo.address = 0
			}
			else if(this.addressmode == "modeIndexedIndirect"){
				this.stepinfo.address = this.read16bug((this.mapper.Read(this.CPU.PC+1))+this.CPU.X)
			}
			else if(this.addressmode == "modeIndirect"){
				this.stepinfo.address = this.read16bug(this.Read16(this.CPU.PC + 1))
			}
			else if(this.addressmode == "modeIndirectIndexed"){
				this.stepinfo.address = this.read16bug((this.mapper.Read(this.CPU.PC+1)) + this.CPU.Y)
				this.pagecrossed = this.pagesDiffer(this.stepinfo.address-this.CPU.Y, this.stepinfo.address)
			}
			else if(this.addressmode == "modeRelative"){
				this.offset = parseInt(this.mapper.Read(this.CPU.PC + 1))
		
				if(this.offset < 0x80){
					this.stepinfo.address = this.CPU.PC + 2 +this.offset
				}
				else{
					this.stepinfo.address = this.CPU.PC + 2 + this.offset - 0x100
				}
				/*
				print("offset: " + this.offset)
				if(this.offset & 0x80){
					
					this.offset = this.offset | 0xff00
					print("Location:" +this.offset)

				}
				this.stepinfo.address = this.offset
				*/
			}
			else if(this.addressmode == "modeZeroPage"){
				this.stepinfo.address = this.mapper.Read(this.CPU.PC + 1)
			}
			else if(this.addressmode == "modeZeroPage"){
				this.stepinfo.address = this.mapper.Read((this.CPU.PC+1)+this.CPU.X) & 0xff
			}
			else if(this.addressmode == "modeZeroPageY"){
				this.stepinfo.address = this.mapper.Read((this.CPU.PC+1)+this.CPU.Y) & 0xff
			}

					
			this.CPU.PC += this.instructionsizes[this.opcode]
			this.CPU.Cycles += this.instructionsizes[this.opcode]
			if(this.pagecrossed){
				this.CPU.Cycles += this.instructionpagecycles[this.opcode]
			}

			this.stepinfo = new stepInfo(this.stepinfo.address, this.CPU.PC,this.mode)
		
			this.instructname = this.instructionnames[this.opcode]

			document.getElementById("consolearea").innerHTML += ("Op code: "+this.opcode + ", ins name: " + this.instructname + ", address:" + this.stepinfo.address + ", mode: " + this.addressmode + ", PC: " + this.CPU.PC + "\n")
			this.instructname = this.instructname.toLowerCase()



			eval("this." +this.instructname + "(this.stepinfo)")
			display_cpu_flags()
			return this.CPU.Cycles - this.cycles
		}

	
		nmi(){
			//print("NMI PC: " +this.CPU.PC)
			this.push16(this.CPU.PC)
			this.CPU.rtslo = (this.pull16())
			//print("Ruturn PC:" + this.CPU.rtslo)
			this.php(null)
			
			this.CPU.PC = this.Read16(0xFFFA)
			this.CPU.I = 1
			this.CPU.Cycles += 7
		}
	
		irq(){
			this.push16(tihs.CPU.PC)
			this.php(null)
			this.CPU.PC = this.Read16(0xFFFE)
			this.CPU.I = 1
			this.CPU.Cycles += 7
		}
	
		adc(info){
			this.a = this.CPU.A
			this.b = this.mapper.Read(info.address)
			this.c = this.CPU.C
			this.CPU.A = this.a + this.b + this.C

			this.setZN(this.CPU.A)

			if((parseInt(this.a) + parseInt(this.b) + parseInt(this.c)) > 0xFF){
				this.CPU.C = 1
			}
			else{
				this.CPU.C = 0
			}

			if ((this.a^this.b)&0x80 == 0 && (a^this.CPU.A)&0x80  != 0){
				this.CPU.V = 1
			}
			else{
				this.CPU.V = 0
			}
		}
	
		and(info){
			this.CPU.A = this.CPU.A & this.mapper.Read(info.address)
			this.setZN(this.CPU.A)
		}
	
		// Add ASL
	
		bcc(info){
			if(this.CPU.C == 0){
				this.CPU.pc = info.address
				this.addBranchCycles(info)
			}
		}
	
		bcs(info){
			if(this.CPU.C != 0){
				this.CPU.PC = info.address;
				addBranchCycles(info)
			}
		}
	
		beq(info){

			if(this.CPU.Z != 0 ){
				this.CPU.PC = info.address
				this.addBranchCycles(info)
			}
		}

		bmi(info){
			if(this.CPU.N != 0){
				this.CPU.PC = info.address
				this.addBranchCycles(info)
			}
		}
	
		bit(info){
			this.value = this.mapper.Read(info.address)
			//print("Bit value: " +this.value)
			this.CPU.v = (this.value >> 6) & 1
			this.setZ(this.value & this.CPU.A)
			this.setN(this.value)
		}
		
		bne(info){
			if(this.CPU.Z == 0 ){
				this.CPU.PC = info.address
				this.addBranchCycles(info)
			}
		}
	
		bpl(info){
			if(this.CPU.N == 0){
				this.CPU.PC = info.address
				this.addBranchCycles(info)
			}
		}
	
		brk(info){
			this.push16(this.CPU.PC)
			this.php(info)
			this.sei(info)
			this.CPU.PC = this.Read16(0xFFFE)
		}
	
		bvc(info){
			if(this.CPU.V == 0){
				this.CPU.PC = info.address
				addBranchCycles(info)
			}
		}
	
		bvs(info){
			if(this.CPU.V != 0){
				this.CPU.PC = info.address
				addBranchCycles(info)
			}
		}
	
		clc(info){
			this.CPU.C = 0
		}
	
		cld(info){
			this.CPU.D = 0
		}
	
		cli(info){
			this.CPU.I = 0
		}
	
		clp(info){
			this.CPU.V = 0
		}
	
		cmp(info){
			this.value = this.mapper.Read(info.address)
			this.compare(this.CPU.A, this.value)
		}
	
		cpx(info){
			this.value = this.mapper.Read(info.address)
			this.compare(this.CPU.X, this.value)
		}
	
		cpy(info){
			this.value = this.mapper.Read(info.address)
			this.compare(this.CPU.Y, this.value)
		}
	
		dec(info){
			this.value = this.mapper.Read(info.address) - 1
			this.mapper.Write(info.address, this.value)
			this.setZN(this.value)
		}
	
	
		dex(info){
			this.CPU.X--
			this.setZN(this.CPU.X)
		}
	
		dey(info){
			this.CPU.Y = (this.CPU.Y -1) & 0xff
			//print(this.CPU.Y)
			this.setZN(this.CPU.Y)
		}
	
	
		eor(info){
			this.CPU.A = this.CPU.A ^ this.mapper.Read(info.address)
			this.setZN(this.CPU.A)
		}
	
		inc(info){
			this.value = this.mapper.Read(info.address) + 1
			this.mapper.Write(info.address, value)
			this.setZN(value)
		}
	
		inx(info){
			this.CPU.X = (this.CPU.X + 1) & 0xff
			//print("X: "+ this.CPU.X)
			this.setZN(this.CPU.X)
		}
	
		iny(info){
			this.CPU.X = (this.CPU.Y + 1) & 0xff
			this.setZN(this.CPU.Y)
		}
	
		jmp(info){
			this.CPU.PC = info.address
		}
	
		jsr(info){
			this.push16(this.CPU.PC - 1)

			this.CPU.PC = info.address
		}
	
		lda(info){

			this.CPU.A = this.mapper.Read(info.address)
			
			this.setZN(this.CPU.A)
		}

		ldx(info){
			this.CPU.X = this.mapper.Read(info.address)
			this.setZN(this.CPU.X)
		}
	
		ldy(info){
			this.CPU.Y = this.mapper.Read(info.address)
			//print(this.CPU.Y)
			this.setZN(this.CPU.Y)
		}
	
		lsr(info){
			if(info.mode == "modeAccumulator"){
				this.CPU.C = this.CPU.A & 1
				this.CPU.A >>= 1
				this.setZN(this.CPU.A)
			}
			else{
				this.value = this.mapper.Read(info.address)
				this.CPU.C = this.value & 1
				this.value >>= 1
				this.mapper.Write(info.address, this.value)
				this.setZN(this.value)
			}
		}
	
		nop(info){
	
		}
	
		ora(info){
			this.CPU.A = this.CPU.A | this.mapper.Read(info.address)
			this.setZN(this.CPU.A)
		}
	
		pha(info){
			this.push(this.CPU.A)
		}
	
		php(info){
			this.push(this.flags() | 0x10)
		}
	
		pla(info){
			this.CPU.A = this.pull()
			this.setZN(this.CPU.A)
		}
	
		plp(info){
			this.setflags(this.pull()&0xEF | 0x20)
		}
	
		rol(info){
			if(info.mode == "modeAccumulator"){
				this.c = this.CPU.C
				this.CPU.C = (this.CPU.A >> 7) & 1
				this.CPU.A = (this.CPU.A << 1) | this.c
				this.setZN(this.CPU.A)
			}
			else{
				this.c = this.CPU.C
				this.value = this.mapper.Read(info.address)
				this.c = (this.value >> 7) & 1
				this.value = (this.value << 1) | this.c
				this.mapper.Write(info.address, this.value)
				this.setZN(this.value)
			}
		}
	
		//Add ROR
	
		rti(info){
			this.setflags(this.pull()&0xEF | 0x20)
			//print("RETURNED PC: " + this.CPU.rtslo - 2)
			this.CPU.PC = this.CPU.rtslo - 2
		}
	
		rts(info){
			this.CPU.PC = this.CPU.rtslo + 1
			//print("PC AFTER:" + this.CPU.PC)
		}
	
		sbc(info){
			this.a = this.CPU.A
			this.b = this.mapper.Read(info.address)
			this.c = this.CPU.C

			this.CPU.A = this.a - this.b - (1- this.c)

			this.setZN(this.CPU.A)

			if(this.a - this.b - (1-this.c) >= 0){
				this.CPU.C = 1
			}
			else{
				this.CPU.C = 0
			}

			if((this.a^this.b)&0x80 != 0 && (this.a^this.CPU.A)&0x80 != 0){
				this.CPU.V = 1
			}
			else{
				this.CPU.V = 0
			}

		}
	
		sec(info){
			this.CPU.C = 1
		}
	
		sed(info){
			this.CPU.D = 1
		}
	
		sei(info){
			this.CPU.I = 1
		}
	
		sta(info){
			this.mapper.Write(info.address, this.CPU.A)
		}
	
		stx(info){
			this.mapper.Write(info.address, this.CPU.Y)
		}

		sty(info){
			this.mapper.Write(info.address,this.CPU.Y)
		}
	
		tax(info){
			this.CPU.X = this.CPU.A
			this.setZN(this.CPU.X)
		}
	
		tay(info){
			this.CPU.Y = this.CPU.A
			this.setZN(this.CPU.Y)
		}
	
		tsx(info){
			this.CPU.X = this.CPU.SP
			this.setZN(cpu.X)
		}
	
		txa(info){
			this.CPU.A = this.CPU.X
			this.setZN(this.CPU.A)
		}
	
		txs(info){
			this.CPU.SP = this.CPU.X
		}
	
		tya(info){
			this.CPU.A = this.CPU.Y
			this.setZN(this.CPU.A)
		}
	
	
		// illegal opcodes below
	
	
	
		ahx(info){
	
		}
	
		alr(info){
			
		}
	
		anc(info){
			
		}
	
		arr(info){
			
		}
	
		axs(info){
			
		}
		dcp(info){
			
		}
	
		isc(info){
			
		}
	
		kil(info){
			
		}
	
		las(info){
			
		}
	
	    lax(info){
			
		}
	
		rla(info){
			
		}
	
		rra(info){
			
		}
	
		sax(info){
			
		}
	
		shx(info){
			
		}
	
		shy(info){
			
		}
	
		slo(info){
	
		}
	
		sre(info){
			
		}
	
		tas(info){
			
		}
	
		xaa(info){
			
		}
    }
	 

	



	
