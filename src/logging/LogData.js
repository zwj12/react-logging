import React, { Component } from 'react';
import LogMessage from './LogMessage';

class LogData extends React.Component {
	constructor(props) {
		super(props);
	}

	toString() {
		let strLogData = "";
		for (let i = 0; i < this.props.messages.length; i++) {
			strLogData += this.props.messages[i].toString()
		}
		return strLogData;
	}

	static parse(strData) {
		let patt = new RegExp("^.*(\r)?\n", "gm");
		let result = strData.match(patt);
		let messages = [];
		for (let i = 0; i < result.length; i++) {
			messages[i] = LogMessage.parse(result[i].trim());
		}
		return messages;
	}

	static parseFileName(fileName) {
		let file = {}
		let numStartIndex = 0;
		let numStopIndex = 0;

		file.year = fileName.substring(0, 4);
		file.month = fileName.substring(5, 7) - 1;
		file.date = fileName.substring(8, 10);

		numStartIndex = 11;
		numStopIndex = fileName.indexOf(".", numStartIndex);
		file.robName = fileName.substring(numStartIndex, numStopIndex);

		return file;
	}

	render() {
		const messages = this.props.messages.map((message, index) => {
			return (
				<li key={index}>
					<LogMessage
						robName={this.props.robName}
						createTime={message.createTime}
						level={message.level}
						loggingName={message.loggingName}
						message={message.message}
					/>
				</li>
			);
		});

		return (
			<div className="LogData">
				<ol>{messages}</ol>
			</div>
		);
	}

}

export default LogData;