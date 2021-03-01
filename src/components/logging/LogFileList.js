// JavaScript source code
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { connect } from "react-redux";
import { getLogFileList, getLogData } from "../../redux/actions";

import LogData from './LogData';
import LogMessage from './LogMessage';

class LogFileList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getFileListFromRWS();
    }

    getFileListFromRWS() {
        let url = "/fileservice/$home/Logging?json=1"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let obj = JSON.parse(request.responseText);
            let fileNameList = obj._embedded._state.map(file => file._title);
            fileNameList.reverse();
            this.props.getLogFileList(fileNameList);
            if (fileNameList.length > 0) {
                let file = LogFileList.parseFileName(fileNameList[0]);
                this.parseFromRWS(file.robName, file.year, file.month, file.date);
            }
        };
        request.open("GET", url);
        request.send();
    }

    parseFromRWS(robName, year, month, date) {
        let fileDate = new Date(year, month, date);
        let url = "/fileservice/$home/Logging/" + LogMessage.dateFormat("YYYY-mm-dd", fileDate) + "_" + robName + ".log"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let messages = LogData.parse(request.responseText);
            this.props.getLogData(robName, year, month, date, messages);
        };
        request.open("GET", url);
        request.send();
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

    handleClick(fileName) {
        let file = LogFileList.parseFileName(fileName);
        this.parseFromRWS(file.robName, file.year, file.month, file.date);
    }

    render() {

        const fileNameList = this.props.fileNameList.map((fileName) => {
            return (
                <ListItem button onClick={() => this.handleClick(fileName)}>
                    {
                        /*
                        <ListItemIcon>
                            <Description />
                        </ListItemIcon>
                        */
                    }

                    <ListItemText primary={fileName.substring(0, fileName.length - 4)} />
                </ListItem>
            );
        });

        return (
            <div>
                <ListSubheader inset>Log Files</ListSubheader>
                {fileNameList}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return state.logFileList;
};


export default connect(
    mapStateToProps,
    { getLogFileList, getLogData }
)(LogFileList);
