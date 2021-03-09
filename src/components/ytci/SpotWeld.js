class SpotWeld { 

	constructor() {
		this.index = -1;
		this.processType = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	toString() {
		return this.index
			+ ":" + this.processType
			+ ":" + this.x
			+ ":" + this.y
			+ ":" + this.z;
	}

	getProcessTypeName() {
		let processTypeName;
		switch (parseInt(this.processType)) {
			case 1:
				processTypeName = "ArcLStart";
				break;
			case 2:
				processTypeName = "ArcL";
				break;
			case 3:
				processTypeName = "ArcLEnd";
				break;
			case 4:
				processTypeName = "ArcCStart";
				break;
			case 5:
				processTypeName = "ArcC";
				break;
			case 6:
				processTypeName = "ArcCEnd";
				break;
			case 7:
				processTypeName = "MoveL";
				break;
			case 8:
				processTypeName = "MoveC";
				break;
			case 9:
				processTypeName = "MoveJ";
				break;
			case 11:
				processTypeName = "ArcCalcLStart";
				break;
			case 12:
				processTypeName = "ArcCalcL";
				break;
			case 13:
				processTypeName = "ArcCalcLEnd";
				break;
			case 15:
				processTypeName = "ArcCalcC";
				break;
			case 16:
				processTypeName = "ArcCalcCEnd";
				break;
			case 21:
				processTypeName = "SpotL";
				break;
			case 22:
				processTypeName = "SpotJ";
				break;
			case 23:
				processTypeName = "SpotML";
				break;
			case 24:
				processTypeName = "SpotMJ";
				break;
			default:
				processTypeName = "";
		}
		return processTypeName;
	}

	parse(strData) {
		let numStartIndex = 0;
		let numStopIndex = 0;

		numStartIndex = strData.indexOf("[") + 1;
		numStopIndex = strData.indexOf(",", numStartIndex);
		this.processType = strData.substring(numStartIndex, numStopIndex);


		numStartIndex = numStopIndex + 1;
		numStopIndex = strData.indexOf(",", numStartIndex);
		this.x = strData.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		numStopIndex = strData.indexOf(",", numStartIndex);
		this.y = strData.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		numStopIndex = strData.indexOf("]", numStartIndex);	
		this.z = strData.substring(numStartIndex, numStopIndex);

	}


}

export default SpotWeld;