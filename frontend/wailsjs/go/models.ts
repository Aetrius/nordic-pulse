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
	export class UpdateStats {
	    updateAvailable: boolean;
	    localVersion: string;
	    serverVersion: string;
	    remoteUpdateURL: string;
	    errorResult: any;
	
	    static createFrom(source: any = {}) {
	        return new UpdateStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.updateAvailable = source["updateAvailable"];
	        this.localVersion = source["localVersion"];
	        this.serverVersion = source["serverVersion"];
	        this.remoteUpdateURL = source["remoteUpdateURL"];
	        this.errorResult = source["errorResult"];
	    }
	}

}

