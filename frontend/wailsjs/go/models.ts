export namespace main {
	
	export class Result {
	    packetSuccess: number;
	    packetLoss: number;
	    rtt: number;
	    timestamp: string;
	
	    static createFrom(source: any = {}) {
	        return new Result(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.packetSuccess = source["packetSuccess"];
	        this.packetLoss = source["packetLoss"];
	        this.rtt = source["rtt"];
	        this.timestamp = source["timestamp"];
	    }
	}

}

