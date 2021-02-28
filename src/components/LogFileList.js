// JavaScript source code
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { connect } from "react-redux";
import { getLogData } from "../redux/actions";

class LogFileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNameList: [],
        };
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
            this.setState({
                fileNameList: fileNameList
            });
        };
        request.open("GET", url);
        request.send();
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

    parseFromRWS(robName, year, month, date) {
        let fileDate = new Date(year, month, date);
        let url = "/fileservice/$home/Logging/" + LogFileList.dateFormat("YYYY-mm-dd", fileDate) + "_" + robName + ".log"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let messages = LogFileList.parseData(request.responseText);
            //console.log(messages);
            this.props.getLogData(messages);
        };
        request.open("GET", url);
        request.send();
    }

    static parseData(strData) {
        let patt = new RegExp("^.*(\r)?\n", "gm");
        let result = strData.match(patt);
        let messages = [];
        for (let i = 0; i < result.length; i++) {
            messages[i] = LogFileList.parseMessage(result[i].trim());
        }
        return messages;
    }

    static parseMessage(strLogMessage) {
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

        const fileNameList = this.state.fileNameList.map((fileName) => {
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

export default connect(
    null,
    { getLogData }
)(LogFileList);