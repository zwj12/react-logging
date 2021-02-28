import React from "react";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";
import LogMessage from '../logging/LogMessage';

class LogData extends React.Component {
	render() {
		return (
			<div className="LogData">
				<Typography component="h2" variant="h6" color="primary" gutterBottom>
					Log Data - TaskMichael
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
							this.props.messages.map((message, index) => {
								return (
									<LogMessage
										id={index}
										robName="TaskMichael"
										createTime={message.createTime}
										level={message.level}
										loggingName={message.loggingName}
										message={message.message}
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
