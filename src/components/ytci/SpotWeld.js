class SpotWeld { 

	constructor() {
		this.index = -1;
		this.processType = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	toString() {
		return this.processType
			+ ":" + this.x
			+ ":" + this.y
			+ ":" + this.z;
	}

	parse(strData) {
		let numStartIndex = 0;
		let numStopIndex = 0;

		numStartIndex = strTarget.indexOf("[") + 1;
		numStopIndex = strTarget.indexOf(",");
		this.processType = strData.substring(numStartIndex, numStopIndex);


		numStartIndex = numStopIndex + 1;
		numStopIndex = strTarget.indexOf(",");
		this.x = strData.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		numStopIndex = strTarget.indexOf(",", numStartIndex);
		this.y = strData.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		numStopIndex = strTarget.indexOf("]", numStartIndex);	
		this.z = strData.substring(numStartIndex, numStopIndex);

		console.log(this.toString());
	}


}

export default SpotWeld;