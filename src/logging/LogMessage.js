// JavaScript source code
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class LogMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	toString() {
		let strMessage = this.props.robName
			+ ":" + LogMessage.dateFormat("YYYY-mm-dd HH:MM:SS", this.props.createTime)
			+ ":" + LogMessage.getLevelName(this.props.level)
			+ ":" + this.props.loggingName
			+ ":" + this.props.message;
		return strMessage;
	}

	static dateFormat(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(),
			"m+": (date.getMonth() + 1).toString(),
			"d+": date.getDate().toString(),
			"H+": date.getHours().toString(),
			"M+": date.getMinutes().toString(),
			"S+": date.getSeconds().toString()
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	}

	static getLevelName(level) {
		let strLevel;
		switch (level) {
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

	static parse(strLogMessage) {
		let message = {};
		let numStartIndex = 0;
		let numStopIndex = 0;

		message.createTime = new Date(strLogMessage.substring(0, 19));

		numStartIndex = 20;
		numStopIndex = strLogMessage.indexOf(":", numStartIndex);
		let strLevelName = strLogMessage.substring(numStartIndex, numStopIndex);
		switch (strLevelName) {
			case "DEBUG":
				message.level = 10;
				break;
			case "INFO":
				message.level = 20;
				break;
			case "ERRORING":
				message.level = 40;
				break;
			case "CRITICAL":
				message.level = 50;
				break;
			default:
				message.level = 30;
		}

		numStartIndex = numStopIndex + 1;
		numStopIndex = strLogMessage.indexOf(":", numStartIndex);
		message.loggingName = strLogMessage.substring(numStartIndex, numStopIndex);

		numStartIndex = numStopIndex + 1;
		message.message = strLogMessage.substring(numStartIndex);

		return message;
	}

	render() {
		return (
			<React.Fragment>
				<TableRow key={this.props.id}>
					<TableCell>{this.props.robName}</TableCell>
					<TableCell>{LogMessage.dateFormat("YYYY-mm-dd HH:MM:SS", this.props.createTime)}</TableCell>
					<TableCell>{LogMessage.getLevelName(this.props.level)}</TableCell>
					<TableCell>{this.props.loggingName}</TableCell>
					<TableCell>{this.props.message}</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}

}

export default LogMessage;
