import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
				<LogMessage
					id={index}
					robName={this.props.robName}
					createTime={message.createTime}
					level={message.level}
					loggingName={message.loggingName}
					message={message.message}
				/>
			);
		});

		return (
			<div className="LogData">
				<Typography component="h2" variant="h6" color="primary" gutterBottom>
					Log Data
				</Typography>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Task</TableCell>
							<TableCell>Create Time</TableCell>
							<TableCell>Level</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Message</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{messages}
					</TableBody>
				</Table>
			</div>
		);
	}

}

export default LogData;