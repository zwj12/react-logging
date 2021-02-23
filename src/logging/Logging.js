// JavaScript source code
// xcopy /Y /S build "C:\Users\CNMIZHU7\Documents\RobotStudio\Virtual Controllers\Controller_Aprol\HOME\docs"

import React, { Component } from 'react';
import LogData from './LogData';
import LogMessage from './LogMessage';

class Logging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNameList: [],
            robName: "T_ROB1",
            year: 2020,
            month: 0,
            date: 4,
            messages: [],
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

    parseFromRWS(robName, year, month, date) {
        let fileDate = new Date(year, month, date);
        let url = "/fileservice/$home/Logging/" + LogMessage.dateFormat("YYYY-mm-dd", fileDate) + "_" + robName + ".log"
        let request = new XMLHttpRequest();
        request.onload = () => {
            let messages = LogData.parse(request.responseText);
            this.setState({
                robName: robName,
                year: year,
                month: month,
                date: date,
                messages: messages,
            });
        };
        request.open("GET", url);
        request.send();
    }

    handleClick(fileName) {
        let file = LogData.parseFileName(fileName);
        this.parseFromRWS(file.robName, file.year, file.month, file.date);
    }

    render() {
        const fileNameList = this.state.fileNameList.map((fileName) => {
            return (
                <li key={fileName}>                    
                    <button onClick={() => this.handleClick(fileName)}>
                        {fileName}
                    </button>
                </li>
            );
        });

        return (
            <div className="Logging">
                <ol>{fileNameList}</ol>
                <LogData
                    robName={this.state.robName}
                    year={this.state.year}
                    month={this.state.month}
                    date={this.state.date}
                    messages={this.state.messages}
                />
            </div>
        );
    }
}

export default Logging;
