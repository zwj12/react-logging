import LogMessage from './LogMessage';

class LogData {
	constructor(robName) {
		this.robName = robName;
		this.logMessageArray = [];
	}

	toString() {
		let strLogData = "";
		for (let i = 0; i < this.logMessageArray.length; i++) {
			strLogData += this.logMessageArray[i].toString(); 
		}
		return strLogData;
	}

	parse(strData) {
		let patt = new RegExp("^.*(\r)?\n", "gm");
		let result = strData.match(patt);
		this.logMessageArray = [];
		for (let i = 0; i < result.length; i++) {
			let logMessage = new LogMessage(this.robName);
			logMessage.parse(result[i].trim());
			this.logMessageArray[i] = logMessage;
		}
	}

	parseFromFile() {
		let logData = this;

		function transferComplete() {
			logData.parse(this.responseText);
			for (let i = 0; i < logData.logMessageArray.length; i++) {
				console.log(logData.logMessageArray[i].toString());
			}
		}

		//let url = "/fileservice/$home/Logging/" + strYear + "-" + strMonth + "-" + strDate + "_" + robName + ".log"
		let url = "/fileservice/$home/Logging/2020-01-04_T_ROB1.log"
		let request = new XMLHttpRequest();
		request.onload = transferComplete;
		request.open("GET", url);
		request.send();
	}

	static getFileList() {
		function transferComplete() {
			let obj = JSON.parse(this.responseText);
			let fileList = obj._embedded._state;
			for (let i = 0; i < fileList.length; i++) {
				console.log(fileList[i]["_title"]);
			}
		}

		let url = "/fileservice/$home/Logging?json=1"
		let request = new XMLHttpRequest();
		request.onload = transferComplete;
		request.open("GET", url);
		request.send();
	}
}

export default LogData;