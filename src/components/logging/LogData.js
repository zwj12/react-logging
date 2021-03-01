import React from "react";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";

import LogMessage from './LogMessage';

class LogData extends React.Component {

	static parse(strData) {
		let patt = new RegExp("^.*(\r)?\n", "gm");
		let result = strData.match(patt);
		let messages = [];
		for (let i = 0; i < result.length; i++) {
			messages[i] = LogMessage.parse(result[i].trim());
		}
		return messages;
	}

	render() {
		return (
			<div>
				<Typography component="h2" variant="h6" color="primary" gutterBottom>
					{"Log Data - " + this.props.robName }
				</Typography>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Create Time</TableCell>
							<TableCell>Level</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Message</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							this.props.logMessages.map((logMessage, index) => {
								return (
									<LogMessage
										id={index}
										robName={this.props.robName}
										createTime={logMessage.createTime}
										level={logMessage.level}
										loggingName={logMessage.loggingName}
										message={logMessage.message}
									/>
								);
							})
						}
					</TableBody>
				</Table>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return state.logData;
};

export default connect(mapStateToProps)(LogData);
