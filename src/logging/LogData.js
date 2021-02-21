class LogData {
	constructor(robName) {
		this.robName = robName;
		this.createTime = null;
		this.level = null;
		this.loggingName = null;
		this.message = null;
	}

	toString() {
		let strLogData = this.robName
			+ ":" + this.createTime.toISOString().substring(0, 19).replace("T", " ")
			+ ":" + this.getLevelString()
			+ ":" + this.loggingName
			+ ":" + this.message;
		return strLogData;
	}

	getLevelString() {
		let strLevel = null;
		switch (this.level) {
			case 10:
				strLevel = "DEBUG";
				break;
			case 20:
				strLevel = "INFO";
				break;
			case 40:
				strLevel = "ERRORING";
				break;
			case 50:
				strLevel = "CRITICAL";
				break;
			default:
				strLevel = "WARNING";
		}
		return strLevel;
	}

	parse(strLogData) {
		let numStartIndex = 0;
		let numStopIndex = 0;

		this.createTime = new Date(strLogData.substring(0, 19));

		numStartIndex = 20;
		numStopIndex = strLogData.indexOf(":", numStartIndex);
		let strlevel = strLogData.substring(numStartIndex, numStopIndex);
		switch (strlevel) {
			case "DEBUG":
				this.level = 10;
				break;
			case "INFO":
				this.level = 20;
				break;
			case "ERRORING":
				this.level = 40;
				break;
			case "CRITICAL":
				this.level = 50;
				break;
			default:
				this.level = 30;
		}

		numStartIndex = numStopIndex + 1;
		numStopIndex = strLogData.indexOf(":", numStartIndex);
		this.loggingName = strLogData.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		this.message = strLogData.substring(numStartIndex);
	}

	static parseFile(strData) {
		let patt = new RegExp("^.*(\r)?\n", "gm");
		let result = strData.match(patt);
		let logDataArray = new Array();
		for (let i = 0; i < result.length; i++) {
			let logData = new LogData("T_ROB1");
			logData.parse(result[i].trim());
			logDataArray[i] = logData;
		}
		return logDataArray;
	}
}

export default LogData;