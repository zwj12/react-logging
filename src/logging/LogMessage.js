// JavaScript source code

class LogMessage {
	constructor(robName) {
		this.robName = robName;
		this.createTime = null;
		this.level = null;
		this.loggingName = null;
		this.message = null;
	}

	toString() {
		let strMessage = this.robName
			+ ":" + this.createTime.toISOString().substring(0, 19).replace("T", " ")
			+ ":" + this.getLevelName()
			+ ":" + this.loggingName
			+ ":" + this.message;
		return strMessage;
	}

	getLevelName() {
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

	parse(strLogMessage) {
		let numStartIndex = 0;
		let numStopIndex = 0;

		this.createTime = new Date(strLogMessage.substring(0, 19));

		numStartIndex = 20;
		numStopIndex = strLogMessage.indexOf(":", numStartIndex);
		let strLevelName = strLogMessage.substring(numStartIndex, numStopIndex);
		switch (strLevelName) {
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
		numStopIndex = strLogMessage.indexOf(":", numStartIndex);
		this.loggingName = strLogMessage.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		this.message = strLogMessage.substring(numStartIndex);
	}

}

export default LogMessage;
